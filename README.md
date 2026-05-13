# PetNest — Online Pet Store (Full Stack)

PetNest is a demo marketplace for browsing pets and placing orders: a **React + Vite** frontend, an **Express** backend, and **Supabase** for data and auth. The cart lives in the browser. After checkout, matching rows in Supabase are marked sold (`IsSold`); they disappear from the public pet APIs but **rows are not deleted**.

## Tech Stack

| Layer | Technologies |
|--------|----------------|
| Frontend | React 19, Vite 8, React Router, Tailwind-style utilities, Framer Motion, Three.js / Rive, etc. |
| Backend | Node.js, Express 5, Supabase JS, dotenv |
| Data | Supabase (`Pet` table and related tables, including `IsSold`) |

## Repository Layout

```text
PetNest-Online-Pet-Store-main/
├── backend/          # Express API (default port 9090)
│   ├── server.js
│   ├── routes/
│   ├── services/
│   └── database/     # Supabase client
└── frontend/         # Vite + React (default port 5173)
    └── src/
        ├── pages/
        ├── components/
        ├── cart/     # Cart context + localStorage
        └── utils/    # API helpers (pets, orders, …)
```

## Prerequisites

- **Node.js** 18+ (current LTS recommended)
- A **Supabase** project whose schema matches what the backend expects (at minimum a `Pet` table with fields such as `PetID`, `IsSold`, etc.)

## Backend Setup

Create `backend/.env` (do **not** commit secrets):

```env
SUPABASE_URL=https://your-project.supabase.co
# Prefer the service role key on the server; for limited public operations you may use anon:
SUPABASE_SECRET_KEY=your_service_role_or_secret_key
# If SUPABASE_SECRET_KEY is unset, the app falls back to:
# SUPABASE_ANON_KEY=

PORT=9090
```

Install and run:

```bash
cd backend
npm install
npm run dev
```

When you see `Server running on port: 9090`, the API is up.

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

If the API is not at `http://localhost:9090`, add `frontend/.env`:

```env
VITE_BACKEND_BASE=http://localhost:YOUR_PORT
VITE_PETS_API_BASE=http://localhost:YOUR_PORT/pets
```

Defaults match the backend on port **9090** when these are omitted.

## Features (High Level)

- **Pet listing** (`/pets`): loads from the backend; pets with **`IsSold = true`** are omitted from list and detail responses; data remains in Supabase.
- **Pet detail** (`/pets/:id`).
- **Cart**: storage key `petnest_cart_v1`; **one unit per pet** (quantity cannot be increased past 1).
- **Orders**: `POST /order/place` sets **`IsSold` to `true`** for pets in the order, validates quantity 1 per line, and rejects duplicate pet IDs in the same order.
- **Accounts**: sign-up / sign-in wired to Supabase Auth and backend routes under `backend/routes`.

## NPM Scripts

| Location | Command | Purpose |
|----------|---------|---------|
| `backend` | `npm run dev` | Nodemon dev server |
| `frontend` | `npm run dev` | Vite dev server |
| `frontend` | `npm run build` | Production build |
| `frontend` | `npm run preview` | Preview the production build locally |

## Local Dev Checklist

1. Supabase `Pet` columns align with `backend/services/petService.js` (e.g. `PetID`, `PetName`, `IsSold`).
2. `backend/.env` is filled in and the server starts without errors.
3. Frontend `VITE_*` URLs match backend `PORT`.
4. For same-machine dev, `localhost` + existing CORS setup is usually enough; for split origins in production, tighten `cors` in Express as needed.

## License

Follow any `LICENSE` file in the repo; if none is present, treat the project as a learning/demo artifact only.
