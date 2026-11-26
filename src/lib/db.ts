// src/lib/db.ts
import { Pool } from "pg";
import { connection } from "next/server";
import { SERVICES_SEED, type Service } from "./services-seed";
import { CATALOG_SEED, type Catalog } from "./catalog";
import { fetchRawCatalog, toCatalog, type RawCatalog } from "./platform";

/**
 * Postgres access for the Railway database.
 * Connection string: POSTGRES_URL (Railway: ${{Postgres.DATABASE_URL}}), or
 * DATABASE_URL when that points at Postgres. Without one, pages fall back to
 * the seed content so local development still works.
 */

const globalForDb = globalThis as unknown as {
  __twcPool?: Pool;
  __twcSchema?: Promise<void>;
  __twcSnapshot?: string;
};

function databaseUrl(): string | null {
  const candidates = [process.env.POSTGRES_URL, process.env.DATABASE_URL];
  return candidates.find((u) => u && /^postgres(ql)?:\/\//.test(u)) ?? null;
}

function getPool(): Pool | null {
  const url = databaseUrl();
  if (!url) return null;
  if (!globalForDb.__twcPool) {
    // TLS follows the URL: add ?sslmode=require to use it (e.g. the public proxy).
    globalForDb.__twcPool = new Pool({
      connectionString: url,
      max: 5,
      connectionTimeoutMillis: 8000,
    });
  }
  return globalForDb.__twcPool;
}

async function ensureSchema(pool: Pool): Promise<void> {
  if (!globalForDb.__twcSchema) {
    globalForDb.__twcSchema = (async () => {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS services (
          id SERIAL PRIMARY KEY,
          slug VARCHAR(120) NOT NULL UNIQUE,
          title VARCHAR(160) NOT NULL,
          tagline VARCHAR(255) NOT NULL,
          summary TEXT NOT NULL,
          description TEXT NOT NULL,
          features JSONB NOT NULL DEFAULT '[]',
          icon VARCHAR(40) NOT NULL DEFAULT 'Code2',
          sort_order INT NOT NULL DEFAULT 0,
          is_published BOOLEAN NOT NULL DEFAULT TRUE,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
        CREATE TABLE IF NOT EXISTS contact_messages (
          id SERIAL PRIMARY KEY,
          name VARCHAR(160) NOT NULL,
          email VARCHAR(190) NOT NULL,
          business VARCHAR(190),
          service_slug VARCHAR(120),
          message TEXT NOT NULL,
          wants_call BOOLEAN NOT NULL DEFAULT FALSE,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
        CREATE INDEX IF NOT EXISTS contact_messages_created_idx ON contact_messages (created_at);
        CREATE TABLE IF NOT EXISTS catalog_snapshot (
          id SMALLINT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
          data JSONB NOT NULL,
          fetched_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `);

      // Seed only into empty tables, so edits and deletions in the DB stick.
      const client = await pool.connect();
      try {
        await client.query("BEGIN");
        const services = await client.query("SELECT COUNT(*)::int AS n FROM services");
        if (services.rows[0].n === 0) {
          for (const [i, s] of SERVICES_SEED.entries()) {
            await client.query(
              `INSERT INTO services (slug, title, tagline, summary, description, features, icon, sort_order)
               VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
              [s.slug, s.title, s.tagline, s.summary, s.description, JSON.stringify(s.features), s.icon, i + 1]
            );
          }
        }
        await client.query("COMMIT");
      } catch (err) {
        await client.query("ROLLBACK");
        throw err;
      } finally {
        client.release();
      }
    })().catch((err) => {
      globalForDb.__twcSchema = undefined; // retry on next request
      throw err;
    });
  }
  return globalForDb.__twcSchema;
}

async function ready(): Promise<Pool | null> {
  const pool = getPool();
  if (!pool) return null;
  await ensureSchema(pool);
  return pool;
}

function toStringArray(v: unknown): string[] {
  if (Array.isArray(v)) return v.map(String);
  if (typeof v === "string") {
    try {
      const parsed = JSON.parse(v);
      return Array.isArray(parsed) ? parsed.map(String) : [];
    } catch {
      return [];
    }
  }
  return [];
}

interface ServiceRow {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  description: string;
  features: unknown;
  icon: string;
}

function toService(r: ServiceRow): Service {
  return {
    slug: r.slug,
    title: r.title,
    tagline: r.tagline,
    summary: r.summary,
    description: r.description,
    features: toStringArray(r.features),
    icon: r.icon,
  };
}

/**
 * All services, in the order of SERVICES_SEED. A published database row with the same slug replaces the
 * seed text, so wording can be edited in the database; the seed decides which services exist and their order.
 */
export async function getServices(): Promise<Service[]> {
  await connection(); // request-time only, never prerender DB reads
  try {
    const pool = await ready();
    if (!pool) return SERVICES_SEED;
    const { rows } = await pool.query<ServiceRow>("SELECT * FROM services WHERE is_published");
    const bySlug = new Map(rows.map((r) => [r.slug, toService(r)]));
    return SERVICES_SEED.map((s) => bySlug.get(s.slug) ?? s);
  } catch (err) {
    console.error("[db] getServices failed, using seed content:", err);
    return SERVICES_SEED;
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  await connection();
  const fromSeed = SERVICES_SEED.find((s) => s.slug === slug) ?? null;
  if (!fromSeed) return null;
  try {
    const pool = await ready();
    if (!pool) return fromSeed;
    const { rows } = await pool.query<ServiceRow>(
      "SELECT * FROM services WHERE slug = $1 AND is_published LIMIT 1",
      [slug]
    );
    return rows[0] ? toService(rows[0]) : fromSeed;
  } catch (err) {
    console.error("[db] getServiceBySlug failed, using seed content:", err);
    return fromSeed;
  }
}

/**
 * Plans and apps from the platform (super.twcarts.com). The last good answer is kept in Postgres, so the
 * Pricing page still shows real plans if the platform is down; the seed is only for local development.
 */
export async function getCatalog(): Promise<Catalog> {
  await connection();
  const raw = await fetchRawCatalog();
  if (raw) {
    void saveSnapshot(raw);
    return toCatalog(raw, "platform");
  }
  try {
    const pool = await ready();
    if (pool) {
      const { rows } = await pool.query<{ data: RawCatalog }>("SELECT data FROM catalog_snapshot WHERE id = 1");
      if (rows[0]) return toCatalog(rows[0].data, "snapshot");
    }
  } catch (err) {
    console.error("[db] catalog snapshot not readable:", err);
  }
  return CATALOG_SEED;
}

async function saveSnapshot(raw: RawCatalog): Promise<void> {
  const json = JSON.stringify(raw);
  if (globalForDb.__twcSnapshot === json) return; // unchanged since the last save in this server
  try {
    const pool = await ready();
    if (!pool) return;
    await pool.query(
      `INSERT INTO catalog_snapshot (id, data, fetched_at) VALUES (1, $1, NOW())
       ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, fetched_at = NOW()`,
      [json]
    );
    globalForDb.__twcSnapshot = json;
  } catch (err) {
    console.error("[db] catalog snapshot not saved:", err);
  }
}

export interface ContactInput {
  name: string;
  email: string;
  business: string | null;
  serviceSlug: string | null;
  message: string;
  wantsCall: boolean;
}

/** Returns true if the message was stored. */
export async function saveContactMessage(input: ContactInput): Promise<boolean> {
  try {
    const pool = await ready();
    if (!pool) {
      console.error("[db] no Postgres URL set, contact message not saved");
      return false;
    }
    await pool.query(
      `INSERT INTO contact_messages (name, email, business, service_slug, message, wants_call)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [input.name, input.email, input.business, input.serviceSlug, input.message, input.wantsCall]
    );
    return true;
  } catch (err) {
    console.error("[db] saveContactMessage failed:", err);
    return false;
  }
}
