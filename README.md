# Trueweb Cart site

Marketing site for the Trueweb Cart platform: online shops, business websites, templates, App Store and pricing, plus IT services and the contact form.

Next.js 16 (App Router), Tailwind CSS 4, Postgres.

## Pages
- `/` home
- `/online-shop` every shop feature, grouped
- `/websites` website plans, sections, templates (`#templates`)
- `/pricing` plans, monthly/yearly, apps per plan (`#apps`); `?kind=website` opens the website plans
- `/services`, `/services/[slug]`, `/contact`

## Data
Postgres, from `POSTGRES_URL` (Railway: `${{Postgres.DATABASE_URL}}`), or `DATABASE_URL` if it is a Postgres URL.
Tables are created and seeded on first request (`src/lib/db.ts`), only when empty:
- `plans` (prices in pence, null shows "Ask for a price"), `apps`, `plan_apps` (included / addon)
- `services`, `contact_messages`

Seeds: `src/lib/catalog.ts` (plans, apps) and `src/lib/services-seed.ts`. Feature lists: `src/lib/features.ts`.
Without a database the pages show the seed content.

Optional: `NEXT_PUBLIC_ADMIN_URL` (Log in link, default https://admin.twcarts.com), `NEXT_PUBLIC_DEMO_SHOP_URL` (default https://www.twcarts.site), `SITE_URL`.

```bash
npm install
npm run dev
```
