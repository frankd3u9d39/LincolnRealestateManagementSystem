# Estate Management System

A responsive estate and store operations dashboard built with Next.js, React,
TypeScript, Laravel, and MySQL. The application brings together a merchant
dashboard, product catalog, inventory tools, workspace settings, registration
drafts, and a Paystack checkout prototype.

> **Project status:** This is an MVP and development preview, not a production
> estate-management platform. Several screens use sample records, browser-only
> storage, or incomplete workflows. Read [Current capabilities and
> limitations](#current-capabilities-and-limitations) before using real data or
> accepting real payments.

## Contents

- [Highlights](#highlights)
- [Technology](#technology)
- [Repository layout](#repository-layout)
- [Application routes](#application-routes)
- [Requirements](#requirements)
- [Local setup](#local-setup)
- [Configuration](#configuration)
- [Development and verification](#development-and-verification)
- [Data flow and persistence](#data-flow-and-persistence)
- [Payments and receipts](#payments-and-receipts)
- [API reference](#api-reference)
- [Current capabilities and limitations](#current-capabilities-and-limitations)
- [Troubleshooting](#troubleshooting)
- [Production readiness checklist](#production-readiness-checklist)

## Highlights

- Estate dashboard with merchant metrics and transaction activity.
- Product catalog with search, category, price, and stock filters.
- Inventory editing, CSV export, and confirmed product deletion.
- Product photo capture or upload, resized before browser storage.
- Store open/closed control and a simple owner workspace.
- Settings for site identity, administrator profile, business contacts, colors,
  regional preferences, and notification preferences.
- Browser-only business reset for a fresh local workspace.
- Store registration draft flow.
- Plan selection and billing-history preview.
- Reports and CSV export.
- Responsive layouts, mobile navigation, and touch-friendly controls.
- Paystack initialization and server-side payment verification.
- Unpaid receipt preview, verified receipt view and download, and WhatsApp
  sharing links.

## Technology

| Area | Technology |
| --- | --- |
| Frontend | Next.js App Router, React, TypeScript |
| Styling | CSS and Tailwind CSS/Turbopack |
| Backend | Laravel API |
| Database | MySQL or MariaDB |
| Payment provider | Paystack |
| Currency and locale | Nigerian Naira (NGN), `en-NG`, `Africa/Lagos` |

The Next.js app is in `frontend/`. The Laravel API and its database migrations
are in `backend/`.

## Repository layout

```text
store-app/
|-- README.md
|-- backend/
|   |-- app/
|   |   |-- Http/Controllers/Api/
|   |   |-- Http/Resources/
|   |   `-- Models/
|   |-- database/
|   |   |-- migrations/
|   |   `-- seeders/
|   |-- routes/api.php
|   `-- tests/
`-- frontend/
    |-- public/
    |   |-- assets/
    |   `-- figma/
    `-- src/app/
        |-- api/
        |-- components/
        |-- lib/
        `-- [route folders]/
```

### Important frontend modules

- `frontend/src/app/components/store-dashboard.tsx` - main dashboard and
  dashboard navigation.
- `frontend/src/app/components/store-screens.tsx` - shared app shell, catalog,
  inventory, reports, registration, subscription, and related screens.
- `frontend/src/app/components/site-settings.ts` - browser settings model and
  cross-screen settings updates.
- `frontend/src/app/components/site-settings-screen.tsx` - settings and reset
  interface.
- `frontend/src/app/components/checkout-screen.tsx` - Paystack checkout and
  receipts.
- `frontend/src/app/lib/checkout.ts` - fixed checkout bundle and NGN totals.
- `frontend/src/app/api/` - Next.js API handlers for dashboard and payments.

### Important backend modules

- `backend/routes/api.php` - Laravel API routes.
- `backend/app/Http/Controllers/Api/StoreDashboardController.php` - dashboard
  endpoint.
- `backend/app/Http/Resources/StoreDashboardResource.php` - dashboard response
  shape.
- `backend/app/Models/` - merchant and transaction models.
- `backend/database/migrations/` - merchant and transaction tables.
- `backend/database/seeders/StoreDashboardSeeder.php` - sample dashboard data.
- `backend/tests/Feature/StoreDashboardTest.php` - dashboard API tests.

## Application routes

| Path | Screen | Current behavior |
| --- | --- | --- |
| `/` | Store dashboard | Loads merchant metrics from the Laravel API and provides store availability controls. |
| `/store` | Product management | Catalog view with search, filters, and product editing. |
| `/products` | Product catalog | Catalog view with search, filters, and product editing. |
| `/products/manage` | Inventory | Stock filters, editing, confirmed deletion, and CSV export. |
| `/owner` | Owner workspace | Open/closed control and links to settings and inventory; no separate login. |
| `/dashboard` | Analytics | Preview figures and sample transactions. |
| `/reports` | Reports | Sample sales rows and CSV export. |
| `/messages` | Messages | Sample conversation and support links; no message delivery. |
| `/staff` | Staff | Lightweight workspace preview. |
| `/settings` | Settings | Profile, branding, contact, preferences, notifications, and local reset. |
| `/stores/new` | Store registration | Multi-step draft saved in the current browser. |
| `/subscription` | Subscription | Plan preference and sample billing history. |
| `/checkout` | Checkout | Fixed bundle, Paystack redirect, verification, and receipts. |

## Requirements

- Node.js 22 LTS (Node.js 20.9 or newer is required by the current Next.js
  release).
- npm.
- PHP 8.3 or newer.
- Composer.
- MySQL or MariaDB.
- A Paystack **test** secret key for testing provider redirects. Without a key,
  checkout initialization and verification return a configuration error.

## Local setup

Run the backend and frontend in separate PowerShell terminals from the
repository root.

### 1. Configure and start Laravel

```powershell
Set-Location .\backend
composer install

# Copy the example once; keep an existing .env rather than overwriting it.
if (-not (Test-Path .env)) {
  Copy-Item .env.example .env
}

php artisan key:generate
```

Edit `backend/.env` and configure the database connection:

```dotenv
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=estate_management
DB_USERNAME=root
DB_PASSWORD=
```

Create the database in MySQL/MariaDB, then migrate and seed the sample dashboard:

```powershell
php artisan migrate --seed
php artisan serve --host=127.0.0.1 --port=8000
```

The Laravel dashboard endpoint should be available at:

```text
http://127.0.0.1:8000/api/store/dashboard
```

### 2. Configure and start Next.js

Open a second terminal at the repository root:

```powershell
Set-Location .\frontend
npm ci

# Copy the example once; keep an existing .env.local rather than overwriting it.
if (-not (Test-Path .env.local)) {
  Copy-Item .env.example .env.local
}

npm run dev
```

The dashboard is served at `http://localhost:3000`.

### 3. Preview without Laravel

For a local Figma-data preview in development, open:

```text
http://localhost:3000/?preview=1
```

The `DASHBOARD_PREVIEW` environment option can force preview data. Keep it
disabled for normal operation and do not treat preview data as live business
records.

## Configuration

Frontend environment variables are documented in `frontend/.env.example`:

| Variable | Purpose |
| --- | --- |
| `LARAVEL_API_URL` | Laravel dashboard endpoint. Defaults to `http://127.0.0.1:8000/api/store/dashboard`. |
| `DASHBOARD_PREVIEW` | When set to `true`, serves sample dashboard figures instead of querying Laravel. |
| `NEXT_PUBLIC_APP_URL` | Public base URL used when constructing the Paystack callback URL. |
| `PAYSTACK_SECRET_KEY` | Server-side Paystack secret. Use a test key during development; never expose it with a `NEXT_PUBLIC_` prefix. |

After changing `.env.local`, restart the Next.js development server.

## Development and verification

Run commands from `frontend/`:

```powershell
npm run lint
npx tsc --noEmit
npm run build
npm run start
```

`npm run start` serves the most recent production build. It is not a replacement
for `npm run dev`.

Run Laravel tests from `backend/`:

```powershell
composer test
# Or:
php artisan test
```

The PHPUnit configuration uses an in-memory SQLite database. Enable the
`pdo_sqlite` PHP extension if the feature tests report that the SQLite driver is
unavailable. Do not point destructive test runs at a production database.

## Data flow and persistence

### Laravel-backed dashboard

The root dashboard requests the Next.js route `/api/dashboard`. That route
either returns development preview data or forwards the request to
`LARAVEL_API_URL`. Laravel reads the first seeded merchant and its transactions
from MySQL/MariaDB.

### Browser-saved workspace data

The following data is stored in the current browser and is not synchronized to
Laravel or other devices:

- Business settings and branding.
- Product and inventory edits, including product photos.
- Store open/closed preference.
- Selected subscription plan.
- Store registration draft.

The **Start a new business** action clears these browser-owned values only. It
does not delete or alter Laravel/MySQL merchant or transaction records. The
reset confirmation explains this before proceeding.

### Sample and preview data

Analytics, reports, message conversations, staff information, subscription
billing history, and some dashboard values are sample data. Settings such as
notification preferences are saved locally, but they do not send email or
notifications. Registration does not submit data to the backend or upload
documents.

## Payments and receipts

Checkout uses a fixed sample bundle defined in
`frontend/src/app/lib/checkout.ts`. When a server-side `PAYSTACK_SECRET_KEY` is
configured, the flow:

1. Validates the checkout name and email.
2. Requests a transaction from Paystack in NGN.
3. Redirects the customer to Paystack-hosted checkout.
4. Verifies the returned payment reference on the server.
5. Checks the payment status, currency, amount, and reference before showing a
   paid receipt.

The checkout does **not** create an order, subscription, entitlement, or
fulfillment record in Laravel. A paid receipt is not evidence that the estate
workspace has been provisioned. Do not accept real customer payments until a
persistent order workflow and fulfillment process are implemented and tested.

The checkout also provides an unpaid receipt preview. Paid receipts can be
downloaded as SVG files. WhatsApp sharing opens a prefilled message to the
configured support number; the customer must attach the downloaded receipt
manually.

## API reference

### Next.js handlers

| Method and path | Purpose |
| --- | --- |
| `GET /api/dashboard` | Returns preview data or forwards the Laravel dashboard response. |
| `POST /api/payments/initialize` | Validates checkout details and requests a Paystack transaction. |
| `GET /api/payments/verify?reference=...` | Verifies a transaction with Paystack and returns a receipt only for a matching successful payment. |

### Laravel handler

| Method and path | Purpose |
| --- | --- |
| `GET /api/store/dashboard` | Returns the seeded merchant summary and recent transactions. |

The Laravel API currently has no authentication or tenant scoping. Do not expose
financial dashboard records to an untrusted network.

## Current capabilities and limitations

This section distinguishes working local UI from connected production
workflows.

### Working in the current MVP

- Dashboard data loading and explicit error/retry states.
- Responsive navigation and layouts for small screens.
- Product catalog filtering and local product editing.
- Product image capture/upload with browser-side resizing.
- Inventory product deletion with confirmation.
- Settings editing and cross-screen branding updates in the same browser.
- Browser-only reset with a confirmation dialog.
- Store availability toggle saved in the browser.
- Paystack initialization and payment verification when configured.
- Verified receipt display, SVG download, and WhatsApp link.

### Not implemented as production workflows

- Administrator authentication, role-based authorization, or protected owner
  routes.
- Multi-business tenancy or shared account storage.
- Server-side persistence for settings, catalog, registration, or store status.
- Live analytics, reporting, messages, staff management, or billing records.
- Backend order creation, subscription provisioning, refunds, and fulfillment.
- Email or notification delivery.
- Automatic receipt-file attachment to WhatsApp.
- A customer storefront that is blocked when the store is marked closed.

## Troubleshooting

### The browser reports that localhost refused to connect

Confirm both servers are running in their own terminals:

```powershell
# In backend/
php artisan serve --host=127.0.0.1 --port=8000

# In frontend/
npm run dev
```

### The dashboard reports that Laravel is unavailable

- Request `http://127.0.0.1:8000/api/store/dashboard` directly.
- Check that MySQL/MariaDB is running and `backend/.env` has the correct
  credentials.
- Run `php artisan migrate --seed` from `backend/`.
- Check `LARAVEL_API_URL` in `frontend/.env.local`.

### Checkout says Paystack is not configured

Set `PAYSTACK_SECRET_KEY` in `frontend/.env.local` using a Paystack test key,
then restart Next.js. The secret must remain server-side.

### Paystack returns to the checkout but no paid receipt appears

The browser must return with the Paystack reference, and the server must be able
to reach Paystack for verification. Check the Next.js server logs and confirm
that the same secret key is used for initialization and verification. A failed
verification must not be treated as a paid order.

### Browser-saved data does not appear on another device

That is expected: settings, products, photos, store status, and drafts are
browser-local in this MVP. Clearing site data or using a different browser also
removes access to those locally saved values.

## Production readiness checklist

Before any real customer or estate data is used:

- Add authentication and authorization to every dashboard screen and API.
- Add tenant-aware ownership checks for every business record.
- Move settings, products, inventory, and store status into a server-side
  database with migrations and backups.
- Persist Paystack references and orders before enabling real payments.
- Add idempotent payment handling, subscription fulfillment, refunds, and
  reconciliation.
- Replace sample analytics and billing history with queries over verified data.
- Implement registration document uploads with access controls.
- Implement actual message, email, staff, and notification workflows.
- Use HTTPS, production environment variables, least-privilege database
  credentials, and tested backup/restore procedures.
- Run frontend lint, TypeScript checks, production builds, backend tests, and
  end-to-end payment tests with Paystack test credentials.

Until these controls exist, treat the application as a local MVP preview rather
than a secure, production estate-management service.
