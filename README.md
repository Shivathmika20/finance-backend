# Finance backend

REST API for users, roles, financial records, and dashboard aggregates. Built with **Express 5**, **TypeScript**, **Prisma**, and **SQLite**.

## API docs (Bump.sh)

Preview the OpenAPI contract locally with [Bump.sh](https://bump.sh/) install the [Bump CLI](https://bump.sh/docs) and sign in if prompted:

```bash
npm run docs:preview
```

Live reload while you edit `openapi/openapi.yaml`:

```bash
npm run docs:preview:live
```

- **Spec file:** `openapi/openapi.yaml`
- **From a running server:** `GET http://localhost:3000/openapi.yaml` (after **Run** below)

## Prerequisites

- Node.js 20+ (recommended)
- npm

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Environment

Create a `.env` file in the project root. Prefilled example (edit `JWT_SECRET` before any real deployment):

```bash
DATABASE_URL=file:./dev.db
JWT_SECRET=change-me-to-a-long-random-string
```

### 3. Database

From the project root, run in order.

Apply migrations:

```bash
npx prisma migrate deploy
```

Generate the Prisma client:

```bash
npx prisma generate
```

### 4. Optional: seed demo users

```bash
npx prisma db seed
```

This creates:

- `admin@finance.com` / `admin123` (ADMIN)
- `analyst@finance.com` / `analyst123` (ANALYST)

Change or remove these credentials before any real deployment.

### 5. Run

Development (watches files and restarts):

```bash
npm run dev
```

The server listens on **port 3000**.

Production-style:

```bash
npm run build
npm start
```

## API overview

| Area      | Base path                                                                   | Notes                                                                                             |
| --------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Auth      | `POST /api/auth/signup`, `POST /api/auth/signin`                            | No JWT. New users default to **VIEWER**.                                                          |
| Records   | `/api/records`                                                              | Bearer JWT. **ADMIN** and **ANALYST** can read; **ADMIN** can create/update/delete (soft delete). |
| Users     | `/api/users`, `/api/users/:id`, role & status                               | **ADMIN** only.                                                                                   |
| Dashboard | `/api/dashboard`, `/category`, `/recent`, `/monthlytrends`, `/weeklytrends` | **VIEWER**: summary only; deeper routes need **ANALYST** or **ADMIN**.                            |

**Authentication:** send `Authorization: Bearer <token>` on protected routes. Inactive users get **403** on sign-in and on protected routes.

**Contract:** request/response shapes, status codes, and query parameters are defined in `openapi/openapi.yaml`—use the **API docs (Bump.sh)** section at the top to preview, or fetch the same file from the running server.
