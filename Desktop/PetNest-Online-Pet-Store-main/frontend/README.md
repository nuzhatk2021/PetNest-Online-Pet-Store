# PetNest Frontend

PetNest is a React + Vite storefront for browsing pets, searching products, creating an account, signing in, and managing a local shopping cart. The UI uses animated React pages, Three.js canvas effects, Rive animation, and Tailwind-style utility classes for the pet marketplace experience.

## Features

- Home page with animated hero, pet-focused marketing sections, and call-to-action links
- Pet browsing page with demo pet data, category filters, search, and price sorting
- Product search page with API lookup and demo fallback results
- Local cart powered by React context and `localStorage`
- Sign in and registration screens with animated multi-step UI
- Backend auth integration through Supabase routes

## Tech Stack

- React 19
- Vite
- React Router
- Framer Motion
- Three.js and `@react-three/fiber`
- Rive via `@rive-app/react-canvas`
- Tailwind CSS utilities
- Lucide React

## Getting Started

Install dependencies:

```bash
npm install
```

Start the frontend dev server:

```bash
npm run dev
```

Vite will print the local URL in the terminal, usually:

```text
http://localhost:5173/
```

## Backend Setup

This frontend is designed to work with the backend in the repository root:

```bash
cd ../backend
npm install
npm run dev
```

The backend requires a `.env` file with Supabase credentials:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
PORT=8080
```

The frontend API helper currently sends requests to:

```text
http://localhost:8080/api
```

If the backend is running on a different port, update `src/utils/api.js` or set the backend `PORT` to `8080`.

## Available Scripts

```bash
npm run dev
```

Runs the Vite development server.

```bash
npm run build
```

Builds the app for production into `dist/`.

```bash
npm run preview
```

Serves the production build locally.

```bash
npm run lint
```

Runs ESLint across the frontend codebase.

## Project Structure

```text
src/
  assets/        Static images and animation assets
  cart/          Cart context and local cart state
  components/    Shared UI components
  pages/         Route-level pages
  utils/         API helper functions
```

## Main Routes

- `/` - Home
- `/pets` - Browse pets
- `/search` - Search products
- `/cart` - Cart
- `/login` and `/signin` - Sign in
- `/signup` and `/register` - Register

## Notes

- The cart is stored locally in the browser under `petnest_cart_v1`.
- The pet browsing page currently uses sample data in `src/pages/Pets.jsx`.
- The search page attempts to call the backend first, then falls back to demo products when the backend is unavailable.
