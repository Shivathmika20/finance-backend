# 💸 Finance Backend

A robust REST API for managing users, roles, and financial records, featuring powerful dashboard aggregates.  
Built with **Express 5**, **TypeScript**, **Prisma**, and **SQLite** for speed, security, and developer happiness.

---

## 🚀 Quick Links

| Resource               | Link                                                                                                         |
| :--------------------- | :---------------------------------------------------------------------------------------------------------- |
| **API Reference**      | [Finance Dashboard API — Bump.sh](https://bump.sh/my-organi/hub/finance-backend-api-doc/doc/f/)             |
| **Deployed Backend**   | [http://65.0.130.203/](http://65.0.130.203/) _(Hosted on AWS)_                                              |
| **Live App (Frontend)**| [Finance Dashboard — Vercel](https://zovryn-finance-dashboard.vercel.app/) _(exercise the API live!)_       |

---

## 🛠️ Tech Stack

| Layer           | Technology                                                                                                                                                                         |
|-----------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Runtime**     | ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)                                                                                               |
| **Framework**   | ![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)                                                                                               |
| **Language**    | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)                                                                                      |
| **ORM**         | ![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)                                                                                                  |
| **Database**    | ![SQLite](https://img.shields.io/badge/SQLite-003B57?logo=sqlite&logoColor=white)                                                                                                  |
| **Authentication** | ![JWT](https://img.shields.io/badge/JWT-blueviolet?logo=jsonwebtokens&logoColor=white) + ![bcryptjs](https://img.shields.io/badge/bcryptjs-ffcc00?logo=javascript&logoColor=black) |
| **Validation**  | ![Zod](https://img.shields.io/badge/Zod-3A7CFF?logo=zod&logoColor=white)                                                                                                           |

---

## ✨ Features

- 🔐 **JWT Authentication** — Secure endpoints with token-based authentication and role-based access control
- 🛡️ **Role Guard Middleware** — Supports three roles: `VIEWER`, `ANALYST`, `ADMIN` for granular permissions
- 📦 **Soft Delete** — Financial records use soft delete for auditability
- 📊 **Dashboard Aggregations** — Real-time stats using SQL `GROUP BY`
- 🔎 **Advanced Filtering** — Filter by type, category, and date range
- 📝 **Search** — Full-text search on category and notes (contains)
- 📃 **Pagination** — Effortlessly display large lists

---

## ⚡ Quick Start

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Setup Environment

Create a `.env` file in the project root. (⚠️ Change `JWT_SECRET` before real deployment!)

```bash
DATABASE_URL=file:./dev.db
JWT_SECRET=change-me-to-a-long-random-string
```

### 3️⃣ Database

Apply migrations:

```bash
npx prisma migrate dev
```

Generate Prisma client:

```bash
npx prisma generate
```

### 4️⃣ Seed demo users

```bash
npx prisma db seed
```

Creates:

- **ADMIN**: `admin@finance.com` / `admin123`
- **ANALYST**: `analyst@finance.com` / `analyst123`

> 🟡 New signups via `/api/auth/signup` receive the **VIEWER** role.  
> 🟡 Change or remove demo credentials before deploying to production.

### 5️⃣ Start the server

Development mode (auto-restarts):

```bash
npm run dev
```

Server listens on **port 3000**.

---

## 🔍 API Overview

> 📝 Interactive API docs powered by [bump.sh](https://bump.sh/my-organi/hub/finance-backend-api-doc/doc/f/)



| Area      | Base Path                                                                   | Notes                                                                                             |
|-----------|-----------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------|
| **Auth**      | `POST /api/auth/signup`, `POST /api/auth/signin`                        | No JWT needed. New users default to **VIEWER**.                                                   |
| **Records**   | `/api/records`                                                          | Bearer JWT required. **ADMIN/ANALYST** can read; **ADMIN** can create/update/soft-delete records. |
| **Users**     | `/api/users`, `/api/users/:id`                                         | **ADMIN** only. Manage users, roles, and status.                                                  |
| **Dashboard** | `/api/dashboard`, `/category`, `/recent`, `/monthlytrends`, `/weeklytrends` | **VIEWER**: summary only; deep routes require **ANALYST** or **ADMIN**.                           |

**Authentication:** Use `Authorization: Bearer <token>` for protected routes. Inactive users receive a **403** error both on sign-in and for any protected resource.

---

## 📚 Assumptions & Tradeoffs

- **SQLite over Postgres** — For simplicity and zero setup. Switching to Postgres: just change `schema.prisma` connection string. (Postgres has better native case-insensitivity.)
- **Soft Delete Only** — `isDeleted: true` fully hides records, enabling an audit trail without destructive deletes.
- **Default Role is VIEWER** — All signups default to VIEWER. **Admin/Analyst** roles must be seeded or granted by an ADMIN.

---