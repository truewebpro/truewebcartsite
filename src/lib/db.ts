// src/lib/db.ts
import { Pool } from "pg";
import { connection } from "next/server";
import { SERVICES_SEED, type Service } from "./services-seed";
import {
  CATALOG_SEED,
  type App,
  type AppStatus,
  type Catalog,
  type Plan,
  type PlanApp,
  type SiteKind,
} from "./catalog";

/**
 * Postgres access for the Railway database.
 * Connection string: POSTGRES_URL (Railway: ${{Postgres.DATABASE_URL}}), or
 * DATABASE_URL when that points at Postgres. Without one, pages fall back to
 * the seed content so local development still works.
 */

const globalForDb = globalThis as unknown as {
  __twcPool?: Pool;
  __twcSchema?: Promise<void>;
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
        CREATE TABLE IF NOT EXISTS plans (
          id SERIAL PRIMARY KEY,
          slug VARCHAR(60) NOT NULL UNIQUE,
          kind VARCHAR(20) NOT NULL CHECK (kind IN ('shop', 'website')),
          name VARCHAR(80) NOT NULL,
          tagline VARCHAR(255) NOT NULL DEFAULT '',
          monthly_price INT,
          yearly_price INT,
          highlights JSONB NOT NULL DEFAULT '[]',
          is_popular BOOLEAN NOT NULL DEFAULT FALSE,
          is_active BOOLEAN NOT NULL DEFAULT TRUE,
          sort_order INT NOT NULL DEFAULT 0
        );
        CREATE TABLE IF NOT EXISTS apps (
          id SERIAL PRIMARY KEY,
          key VARCHAR(60) NOT NULL UNIQUE,
          name VARCHAR(80) NOT NULL,
          category VARCHAR(60) NOT NULL,
          description VARCHAR(255) NOT NULL DEFAULT '',
          sold_alone BOOLEAN NOT NULL DEFAULT TRUE,
          addon_monthly INT,
          addon_yearly INT,
          trial_days INT NOT NULL DEFAULT 0,
          is_active BOOLEAN NOT NULL DEFAULT TRUE,
          sort_order INT NOT NULL DEFAULT 0
        );
        CREATE TABLE IF NOT EXISTS plan_apps (
          plan_slug VARCHAR(60) NOT NULL REFERENCES plans (slug) ON UPDATE CASCADE ON DELETE CASCADE,
          app_key VARCHAR(60) NOT NULL REFERENCES apps (key) ON UPDATE CASCADE ON DELETE CASCADE,
          status VARCHAR(20) NOT NULL CHECK (status IN ('included', 'addon')),
          PRIMARY KEY (plan_slug, app_key)
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
        const plans = await client.query("SELECT COUNT(*)::int AS n FROM plans");
        if (plans.rows[0].n === 0) {
          for (const [i, p] of CATALOG_SEED.plans.entries()) {
            await client.query(
              `INSERT INTO plans (slug, kind, name, tagline, monthly_price, yearly_price, highlights, is_popular, sort_order)
               VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
              [p.slug, p.kind, p.name, p.tagline, p.monthlyPrice, p.yearlyPrice, JSON.stringify(p.highlights), p.isPopular, i + 1]
            );
          }
        }
        const apps = await client.query("SELECT COUNT(*)::int AS n FROM apps");
        if (apps.rows[0].n === 0) {
          for (const [i, a] of CATALOG_SEED.apps.entries()) {
            await client.query(
              `INSERT INTO apps (key, name, category, description, sold_alone, addon_monthly, addon_yearly, trial_days, sort_order)
               VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
              [a.key, a.name, a.category, a.description, a.soldAlone, a.addonMonthly, a.addonYearly, a.trialDays, i + 1]
            );
          }
          for (const pa of CATALOG_SEED.planApps) {
            await client.query(
              "INSERT INTO plan_apps (plan_slug, app_key, status) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING",
              [pa.planSlug, pa.appKey, pa.status]
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

/** All published services, in display order. */
export async function getServices(): Promise<Service[]> {
  await connection(); // request-time only, never prerender DB reads
  try {
    const pool = await ready();
    if (!pool) return SERVICES_SEED;
    const { rows } = await pool.query<ServiceRow>(
      "SELECT * FROM services WHERE is_published ORDER BY sort_order, id"
    );
    return rows.map(toService);
  } catch (err) {
    console.error("[db] getServices failed, using seed content:", err);
    return SERVICES_SEED;
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  await connection();
  const fromSeed = () => SERVICES_SEED.find((s) => s.slug === slug) ?? null;
  try {
    const pool = await ready();
    if (!pool) return fromSeed();
    const { rows } = await pool.query<ServiceRow>(
      "SELECT * FROM services WHERE slug = $1 AND is_published LIMIT 1",
      [slug]
    );
    return rows[0] ? toService(rows[0]) : null;
  } catch (err) {
    console.error("[db] getServiceBySlug failed, using seed content:", err);
    return fromSeed();
  }
}

/** Active plans, apps and which plan includes which app. */
export async function getCatalog(): Promise<Catalog> {
  await connection();
  try {
    const pool = await ready();
    if (!pool) return CATALOG_SEED;
    const [plans, apps, planApps] = await Promise.all([
      pool.query(
        `SELECT slug, kind, name, tagline, monthly_price, yearly_price, highlights, is_popular
         FROM plans WHERE is_active ORDER BY sort_order, id`
      ),
      pool.query(
        `SELECT key, name, category, description, sold_alone, addon_monthly, addon_yearly, trial_days
         FROM apps WHERE is_active ORDER BY sort_order, id`
      ),
      pool.query("SELECT plan_slug, app_key, status FROM plan_apps"),
    ]);
    return {
      plans: plans.rows.map(
        (r): Plan => ({
          slug: r.slug,
          kind: r.kind as SiteKind,
          name: r.name,
          tagline: r.tagline,
          monthlyPrice: r.monthly_price,
          yearlyPrice: r.yearly_price,
          highlights: toStringArray(r.highlights),
          isPopular: r.is_popular,
        })
      ),
      apps: apps.rows.map(
        (r): App => ({
          key: r.key,
          name: r.name,
          category: r.category,
          description: r.description,
          soldAlone: r.sold_alone,
          addonMonthly: r.addon_monthly,
          addonYearly: r.addon_yearly,
          trialDays: r.trial_days,
        })
      ),
      planApps: planApps.rows.map(
        (r): PlanApp => ({ planSlug: r.plan_slug, appKey: r.app_key, status: r.status as AppStatus })
      ),
    };
  } catch (err) {
    console.error("[db] getCatalog failed, using seed content:", err);
    return CATALOG_SEED;
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
