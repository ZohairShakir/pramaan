# Pramaan Deployment Guide

This guide outlines the steps to deploy the Pramaan platform with the frontend on **Vercel** and the database/backend services on **Railway**.

---

## 1. Prerequisites

- A GitHub repository with the project code.
- A [Vercel](https://vercel.com) account.
- A [Railway](https://railway.app) account.

---

## 2. Database Setup (Railway)

Since the local project uses SQLite, you must provision a production-grade database for the live environment.

1.  **Create a New Project**: In Railway, click **New Project** > **Provision PostgreSQL**.
2.  **Get Connection String**: Once provisioned, go to the **Variables** tab of the PostgreSQL service.
3.  **Copy `DATABASE_URL`**: It will look like `postgresql://user:password@host:port/database`.

### Update Prisma Schema
Before pushing to production, update your `prisma/schema.prisma` to support PostgreSQL:
```prisma
datasource db {
  provider = "postgresql" // Change from "sqlite"
  url      = env("DATABASE_URL")
}
```

---

## 3. Frontend Deployment (Vercel)

1.  **Import Project**: In Vercel, click **Add New** > **Project** and select your GitHub repository.
2.  **Configure Build Settings**:
    - **Framework Preset**: Next.js
    - **Build Command**: `npx prisma generate && next build` (This ensures the Prisma client is generated during build).
3.  **Environment Variables**: Add the following variables:

| Variable | Value | Description |
|----------|-------|-------------|
| `DATABASE_URL` | `postgresql://...` | The string copied from Railway |
| `NEXTAUTH_SECRET` | `generate-a-random-long-string` | Used for session encryption |
| `NEXTAUTH_URL` | `https://your-domain.vercel.app` | Your production URL |

4.  **Deploy**: Click **Deploy**. Vercel will build the frontend and connect to your Railway database.

---

## 4. Post-Deployment (Prisma Migration)

After the first deployment, you need to push your schema to the production database:

```bash
# From your local terminal, targeting the production database
# (Ensure your local .env has the Railway DATABASE_URL temporarily or use a tunnel)
npx prisma db push
```

---

## 5. Security Checklist

- [ ] **NEXTAUTH_SECRET**: Ensure this is a complex, unique string.
- [ ] **CORS**: Next.js API routes on Vercel are protected by default, but ensure `NEXTAUTH_URL` matches your domain.
- [ ] **Railway Public Access**: In Railway, you can restrict database access to specific IPs if needed, though Vercel IPs vary.

---

## 6. Maintenance

- **Database Backups**: Enable automatic backups in the Railway PostgreSQL settings.
- **Logs**: Use Vercel's **Runtime Logs** to monitor API performance and NextAuth sessions.
- **Scaling**: Vercel handles frontend scaling automatically. For high traffic, upgrade the Railway PostgreSQL instance.
