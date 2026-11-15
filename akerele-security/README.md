# Akerele — Security Dashboard

This folder contains the **Security Dashboard** module for the Lincoln Estate Management System, developed by **Akerele**.

## Structure

```
akerele-security/
├── Backend/      # Laravel API (security module)
└── frontend/     # Next.js 16 app (security dashboard UI)
```

## Frontend Routes

| Route | Description |
|---|---|
| `/security/dashboard` | Main security dashboard |
| `/security/hq` | Security Management HQ |
| `/security/emergency` | Emergency Alerts |
| `/security/intelligence` | Intelligence Feed |
| `/security/access` | Access Control |
| `/security/blacklist` | Blacklist Management |
| `/security/members` | Security Members |
| `/security/reports` | Reports |

## Stack

- **Frontend**: Next.js 16, Tailwind CSS v4, TypeScript
- **Backend**: Laravel (PHP), Sanctum, Spatie Permissions
