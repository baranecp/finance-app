# Finance App

![finance-app](./public/images/preview.svg)
A personal finance web app built with Next.js (TypeScript) for tracking income, expenses, budgets and visualizing transaction data.
This repository is a Next.js app (TypeScript-first) that uses Drizzle ORM and Neon for a serverless Postgres backend, Chart.js for charts, Tailwind for styling, and React 19.

## Quick demo
Run the app locally (see instructions below) and open http://localhost:3000. The UI demonstrates transaction lists, category filtering, charts and simple budgeting views.

## Tech stack
- Framework: Next.js (15.5.3) with TypeScript
- UI: React 19.1.0, Tailwind CSS
- State & data fetching: Zustand, @tanstack/react-query
- Charts: chart.js, react-chartjs-2
- ORM / database: drizzle-orm, drizzle-kit, @neondatabase/serverless
- Misc: framer-motion, react-icons, react-select
- Tooling: ESLint, TypeScript, tsx for scripts

Dependencies are listed in package.json — this README references the current versions used in the repo.

## Getting started

### Clone & install
```bash
git clone https://github.com/baranecp/finance-app.git
cd finance-app
npm install
# or
# yarn
# pnpm install
```

Turbopack is enabled in the dev script; if you encounter issues, try removing `--turbopack` temporarily (edit package.json script).
