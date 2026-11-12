# Estate Management System - Frontend

This directory contains the Next.js application. For complete setup, routes,
architecture, payment notes, limitations, and deployment guidance, see the
[repository README](../README.md).

## Quick start

From this directory, install dependencies, copy `.env.example` to `.env.local`
if one does not already exist, then start the development server:

```powershell
npm ci
if (-not (Test-Path .env.local)) {
  Copy-Item .env.example .env.local
}
npm run dev
```

The app runs at `http://localhost:3000`. To use the Laravel-backed dashboard,
start the backend as described in the repository README. Keep
`PAYSTACK_SECRET_KEY` server-side and use test credentials during development.
