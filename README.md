# Lincoln Estate Management System - Finance Subsystem

A decoupled Real Estate Management & Billing System built with **Next.js 14** (App Router, Tailwind CSS, TypeScript, Recharts) and **Laravel 11** (REST API, Eloquent, Paystack Gateway).

---

## Architecture Overview

```text
estatemanagement/
├── backend/                   # Laravel REST API Subsystem
│   ├── app/
│   │   ├── Http/Controllers/Api/  # FinanceDashboardController, PaymentController, etc.
│   │   └── Models/                # ServiceCharge, Invoice, Payment, Receipt
│   ├── database/migrations/       # Database schemas with Paystack references
│   └── routes/api.php             # /api/v1/finance/...
│
└── frontend/                  # Next.js 14 Frontend Application
    ├── src/
    │   ├── app/
    │   │   ├── layout.tsx         # Navbar + Sidebar root layout
    │   │   └── finance/page.tsx   # Task 1: Finance Dashboard 1
    │   ├── components/
    │   │   ├── layout/            # Top Navbar, Sidebar navigation
    │   │   └── finance/           # Metric cards, Spline area chart, Donut chart, Breakdowns table
    │   ├── data/                  # Mock dataset matching Figma specifications
    │   └── types/                 # TypeScript interfaces for all financial entities
    └── package.json
```

---

## Implemented Tasks

- [x] **Task 1: Build finance dashboard - Finance Dashboard 1**
  - LincolnEstate Admin layout with brand green palette (`#10B981`)
  - 6 Financial Metric KPI cards (Total Revenue, Monthly Rev, Yearly Rev, Outstanding, Total Paid, Total Owing)
  - Interactive Revenue History spline line chart with gradient fill and yearly selector
  - Revenue by Service multi-color donut chart with custom legend
  - Revenue Breakdowns table with progress bars, status highlights, and eye-action modal trigger
  - Matching Laravel API controller endpoint `GET /api/v1/finance/overview`

---

## Getting Started

### 1. Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000). It opens the **Sign In** page.

There is no login API yet, so sign-in is a front-end placeholder: any valid-looking email and a password of 6+ characters work.
Pick a role in **Login as**:

| Role | Lands on |
|------|----------|
| Admin / Security | `/management` (admin dashboard, Finance, **Agents** directory at `/agents`) |
| Agent | `/agent-portal` (the agent's own dashboard: listings, client requests, viewings, earnings) |
| User | `/finance` |

Admin pages need a signed-in session, and agents are sent to their own portal. Agent and portal changes are saved in the
browser (localStorage); use **Reset sample data** at the bottom of those pages to restore the demo data.

### 2. Backend (Laravel API)
```bash
cd backend
composer install
php artisan serve
```
The API is available at `http://localhost:8000/api/v1/finance/overview`.
