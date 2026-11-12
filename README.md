# Real Estate Management System (LincolnEstate)

A comprehensive real estate and estate management portal built for administrative, security, and resident operations.

## Architecture

This project is organized as a decoupled monorepo:
- **`backend/`**: Laravel RESTful API (Authentication, RBAC, Database Migrations, API Resources).
- **`frontend/`**: Next.js (App Router, TypeScript, Tailwind CSS, Lucide Icons) with full cross-device responsiveness (Mobile, Tablet, Desktop).

---

## Brand Color System

The project uses the LincolnEstate brand identity:
- **Primary** (`#B22222`): Header highlights, active navigation indicators, primary buttons (`Add Reminder`), active state borders.
- **Dark** (`#1A1A1A`): Primary headings, body text, dark footer, high-contrast UI elements.
- **Accent** (`#C9A227`): Icons, currency badges (`₦15.2M`), operational status badges, trend indicators.
- **Surface** (`#F8F9FA`): Main dashboard background canvas.
- **Card** (`#FFFFFF`): Elevated card surfaces.

---

## Directory Structure

```text
estatemanagement/
├── backend/                  # Laravel API
│   ├── app/
│   │   ├── Http/Controllers/Api/V1/Admin/
│   │   ├── Models/
│   │   └── Resources/
│   ├── database/migrations/
│   └── routes/api.php
├── frontend/                 # Next.js Application
│   ├── src/
│   │   ├── app/              # App Router
│   │   ├── components/       # Layout, UI & Module widgets
│   │   ├── lib/              # API clients & utilities
│   │   └── types/            # TypeScript data definitions
├── .gitignore
└── README.md
```

---

## Setup & Getting Started

### Backend (Laravel)
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

### Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

