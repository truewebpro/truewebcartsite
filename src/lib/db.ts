import mysql from "mysql2/promise";
import type { Pool, RowDataPacket } from "mysql2/promise";
import { connection } from "next/server";
import { SERVICES_SEED, type Service } from "./services-seed";

/**
 * MySQL access for the Railway database.
 * Connection string comes from DATABASE_URL (set on the Railway service as
 * ${{MySQL.MYSQL_URL}}). Without it, pages fall back to the seed content so
 * local development still works.
 */

const globalForDb = globalThis as unknown as {
  __twcPool?: Pool;
  __twcSchema?: Promise<void>;
};

function getPool(): Pool | null {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  if (!globalForDb.__twcPool) {
    globalForDb.__twcPool = mysql.createPool({
      uri: url,
      waitForConnections: true,
      connectionLimit: 5,
      connectTimeout: 8000,
      charset: "utf8mb4",
    });
  }
  return globalForDb.__twcPool;
}

async function ensureSchema(pool: Pool): Promise<void> {
  if (!globalForDb.__twcSchema) {
    globalForDb.__twcSchema = (async () => {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS services (
          id INT AUTO_INCREMENT PRIMARY KEY,
          slug VARCHAR(120) NOT NULL UNIQUE,
          title VARCHAR(160) NOT NULL,
          tagline VARCHAR(255) NOT NULL,
          summary TEXT NOT NULL,
          description TEXT NOT NULL,
          features JSON NOT NULL,
          icon VARCHAR(40) NOT NULL DEFAULT 'Code2',
          sort_order INT NOT NULL DEFAULT 0,
          is_published TINYINT(1) NOT NULL DEFAULT 1,
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ) CHARACTER SET utf8mb4
      `);
      await pool.query(`
        CREATE TABLE IF NOT EXISTS contact_messages (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(160) NOT NULL,
          email VARCHAR(190) NOT NULL,
          business VARCHAR(190) NULL,
          service_slug VARCHAR(120) NULL,
          message TEXT NOT NULL,
          wants_call TINYINT(1) NOT NULL DEFAULT 0,
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          INDEX idx_created (created_at)
        ) CHARACTER SET utf8mb4
      `);

      // Seed only into an empty table, so edits/deletions in the DB stick.
      const [rows] = await pool.query<RowDataPacket[]>(
        "SELECT COUNT(*) AS n FROM services"
      );
      if (Number(rows[0].n) === 0) {
        for (const [i, s] of SERVICES_SEED.entries()) {
          await pool.query(
            `INSERT INTO services
              (slug, title, tagline, summary, description, features, icon, sort_order)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              s.slug,
              s.title,
              s.tagline,
              s.summary,
              s.description,
              JSON.stringify(s.features),
              s.icon,
              i + 1,
            ]
          );
        }
      }
    })().catch((err) => {
      globalForDb.__twcSchema = undefined; // retry on next request
      throw err;
    });
  }
  return globalForDb.__twcSchema;
}

type ServiceRow = RowDataPacket & Omit<Service, "features"> & { features: unknown };

function toService(r: ServiceRow): Service {
  let features: string[] = [];
  if (Array.isArray(r.features)) features = r.features as string[];
  else if (typeof r.features === "string") {
    try {
      features = JSON.parse(r.features);
    } catch {
      features = [];
    }
  }
  return {
    slug: r.slug,
    title: r.title,
    tagline: r.tagline,
    summary: r.summary,
    description: r.description,
    features,
    icon: r.icon,
  };
}

/** All published services, in display order. */
export async function getServices(): Promise<Service[]> {
  await connection(); // request-time only — never prerender DB reads
  const pool = getPool();
  if (!pool) return SERVICES_SEED;
  try {
    await ensureSchema(pool);
    const [rows] = await pool.query<ServiceRow[]>(
      "SELECT * FROM services WHERE is_published = 1 ORDER BY sort_order, id"
    );
    return rows.map(toService);
  } catch (err) {
    console.error("[db] getServices failed, using seed content:", err);
    return SERVICES_SEED;
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  await connection();
  const pool = getPool();
  if (!pool) return SERVICES_SEED.find((s) => s.slug === slug) ?? null;
  try {
    await ensureSchema(pool);
    const [rows] = await pool.query<ServiceRow[]>(
      "SELECT * FROM services WHERE slug = ? AND is_published = 1 LIMIT 1",
      [slug]
    );
    return rows[0] ? toService(rows[0]) : null;
  } catch (err) {
    console.error("[db] getServiceBySlug failed, using seed content:", err);
    return SERVICES_SEED.find((s) => s.slug === slug) ?? null;
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
  const pool = getPool();
  if (!pool) {
    console.error("[db] DATABASE_URL is not set — contact message not saved");
    return false;
  }
  try {
    await ensureSchema(pool);
    await pool.query(
      `INSERT INTO contact_messages
        (name, email, business, service_slug, message, wants_call)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        input.name,
        input.email,
        input.business,
        input.serviceSlug,
        input.message,
        input.wantsCall ? 1 : 0,
      ]
    );
    return true;
  } catch (err) {
    console.error("[db] saveContactMessage failed:", err);
    return false;
  }
}
