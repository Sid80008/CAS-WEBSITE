## Production Deployment

### 1) Database (Supabase or Railway Postgres)

1. Create a PostgreSQL instance.
2. Copy connection string as `DATABASE_URL` (`sslmode=require`).
3. Run:
   - `npm ci`
   - `npm run prisma:generate`
   - `npm run prisma:migrate:deploy`
   - optional seed: `npx tsx prisma/seed.ts`

### 2) Backend (Render or Railway)

1. Connect GitHub repository.
2. Set root directory to project root.
3. Set env vars from `.env.production.example`:
   - `NODE_ENV=production`
   - `PORT=10000` (Render)
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `JWT_EXPIRES_IN=15m`
   - `CORS_ORIGINS=https://<your-vercel-domain>`
   - `FRONTEND_URL=https://<your-vercel-domain>`
   - `RATE_LIMIT_WINDOW_MS=900000`
   - `RATE_LIMIT_MAX=150`
   - `LOG_LEVEL=info`
4. Build command:
   - `npm ci && npm run prisma:generate && npm run prisma:migrate:deploy`
5. Start command:
   - `npm run start:api`
6. Verify:
   - `GET /health`

### 3) Frontend (Vercel)

1. Import repository in Vercel.
2. Framework: Next.js.
3. Set env var:
   - `NEXT_PUBLIC_API_BASE_URL=https://<backend-domain>/api`
4. Deploy and verify admin login + authenticated module calls.

### 4) GitHub Actions -> Vercel Auto Deploy

Create repo secrets:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`
- `NEXT_PUBLIC_API_BASE_URL`

Workflow is preconfigured in `.github/workflows/vercel-deploy.yml` and deploys on push to `main`.
