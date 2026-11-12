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
Open [http://localhost:3000](http://localhost:3000) to view the Finance Dashboard.

### 2. Backend (Laravel API)
```bash
cd backend
composer install
php artisan serve
```
The API is available at `http://localhost:8000/api/v1/finance/overview`.
