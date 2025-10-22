# News and Publication Society (NAPS) — BIT Mesra

A Remix + Express app for the News and Publication Society at BIT Mesra. It powers editorial posts, publications (Epistle, Newsletter), media and site reports, interviews, seasonal sections, and team pages with a clean, mobile-friendly UI.

Live features include:

- Home with featured posts and search (query param `?search`)
- Editorials listing and detail pages
- Publications: Epistle, Newsletter
- Media Reports, Site Reports, Interviews
- Seasonal sections: Winter and Summer
- Team pages (Teams and Legends)
- Authenticated notes area (private): create and manage posts
- Healthcheck endpoint and Prometheus metrics for ops

## Tech Stack

- Remix (React 18) with Express server
- Prisma ORM + PostgreSQL
- Tailwind CSS
- Rich text editing via Quill
- Testing: Cypress (E2E), Vitest (unit)
- Prometheus metrics at `/metrics` (separate server on port 3010)

Key files:

- `app/root.tsx` — layout, nav, and footer
- `app/routes/_index.tsx` — homepage with search and featured posts
- `app/routes/editorials.*` — editorial list and details
- `app/routes/healthcheck.tsx` — app + DB health
- `server.ts` — Express server, assets, metrics, and dev reload

## Local Development

Prereqs: Node 18+, Docker (optional for Postgres).

1) Create a `.env` file

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/postgres?schema=public
SESSION_SECRET=<paste a random 32+ char hex string>
```

Generate a secret (fish shell):

```
set -l SECRET (openssl rand -hex 32)
echo $SECRET  # paste into .env as SESSION_SECRET
```

2) Start Postgres via Docker

```
npm run docker
```

3) Setup DB (generate client, run migrations, seed)

```
npm run setup
```

4) Start the dev servers (Remix + Node server + metrics)

```
npm run dev
```

App: http://localhost:3000  •  Metrics: http://localhost:3010/metrics

Seeded login (for the private notes area):

- Email: `rachel@remix.run`
- Password: `racheliscool`

## Scripts

- `npm run dev` — run Remix in dev mode and watch the Node server
- `npm run build` — build Remix and the server bundle
- `npm run start` — run the production server
- `npm run setup` — Prisma generate + migrate deploy + seed
- `npm run docker` — start local Postgres in Docker
- `npm run test` — unit tests (Vitest)
- `npm run test:e2e:dev` — start app and open Cypress
- `npm run lint`, `npm run typecheck`, `npm run format` — quality checks

## Routes overview

- `/` — Home. Search posts with `?search=`
- `/editorials` and `/editorials/:noteId` — Editorials list and post detail
- `/epistle`, `/newsletter` — Publications
- `/media_reports`, `/site_reports`, `/interviews` — Reports and interviews
- `/winter_section`, `/summer_section` — Seasonal content
- `/teams` and `/teams/legends` — Team pages
- `/notes`, `/notes/new`, `/notes/:noteId` — Private area (auth required)
- `/login`, `/logout` — Auth
- `/healthcheck` — App/DB status (200 OK when healthy)

## Testing

- Unit: `npm run test` (Vitest)
- E2E: `npm run test:e2e:dev` (Cypress in open mode)

Helpers are available for auth in Cypress (`cy.login()` and cleanup utilities).

## Deployment

This app includes configs for Fly.io (Docker + Express) and Netlify (serverless).

- Fly.io: ensure `SESSION_SECRET` and `DATABASE_URL` are set as secrets. The app serves metrics at `/metrics` on port 3010. Healthcheck route is `/healthcheck`.
- Netlify: `netlify/functions/server.js` is included for serverless deployments.

Adjust `fly.toml` / Netlify settings as needed for your environment.

## License

Copyright © News and Publication Society, BIT Mesra.
