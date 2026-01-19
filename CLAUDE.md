# MC Smart Bytes - Project Context

## Overview

**MC Smart Bytes Super Site** is a complete business platform serving as:
- Marketing hub for the "Made Easy" suite of products
- User portal with authentication
- Admin dashboard with CRM
- Full double-entry accounting system

**Live URL:** https://mcsmartbytes.vercel.app/

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16.1.1 (App Router, Turbopack) |
| Frontend | React 19.1.0, TypeScript 5, Tailwind CSS v4 |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth (email/password) |
| Email | SendGrid |
| Hosting | Vercel |

## Project Structure

```
bytes_super_site/
├── frontend/src/
│   ├── app/
│   │   ├── page.tsx              # Marketing homepage
│   │   ├── login/, signup/       # User auth
│   │   ├── dashboard/            # User portal
│   │   ├── services/             # Done For You pages
│   │   ├── blog/, portfolio/     # Content pages
│   │   ├── admin/                # Protected admin area
│   │   │   ├── dashboard/        # Admin overview
│   │   │   ├── accounting/       # Full AR/AP/Banking
│   │   │   ├── clients/          # CRM
│   │   │   └── tasks/, todos/    # Task management
│   │   └── api/                  # API routes (SendGrid)
│   ├── components/               # Reusable UI components
│   ├── lib/supabase.ts          # Database clients
│   └── types/                    # TypeScript interfaces
├── sql/                          # Migration scripts
└── docs/                         # Documentation
```

## Key Commands

```bash
cd frontend
npm run dev      # Development (Turbopack)
npm run build    # Production build
npm run start    # Production server
```

## Database Configuration

Two Supabase projects:
- **Main** (`kktxfbmlmajmbmwxocvn`): Auth, Admin, Accounting
- **Expenses** (`vckynnyputrvwjhosryl`): Mobile app sync

## Authentication

| Type | Routes | Storage Key |
|------|--------|-------------|
| User | `/login`, `/signup` | `mcsmartbytes-auth` |
| Admin | `/admin/login` | Separate admin auth |

## Accounting System

**Completed:**
- Customer management (AR)
- Vendor management with 1099 tracking (AP)
- Invoice creation with line items
- Chart of accounts with 8 industry templates
- Mobile expense sync structure

**In Progress:**
- Bills (AP) interface
- Banking/transactions
- Bank reconciliation
- Payment recording

## Design System

| Element | Value |
|---------|-------|
| Primary Blue | `#1e40af` |
| Orange Accent | `#D2691E` |
| Sidebar BG | `#2c2c2c` |
| Brand Teal | `#20B2AA` |

Pattern: Dark sidebar with orange accents, white content areas, stats cards with colored borders.

## Key Files

| Purpose | Location |
|---------|----------|
| Supabase clients | `frontend/src/lib/supabase.ts` |
| Navigation | `frontend/src/components/Navigation.tsx` |
| Admin Nav | `frontend/src/components/AdminNav.tsx` |
| Type definitions | `frontend/src/types/` |
| DB migrations | `sql/` |

## Related Apps

- Expenses Made Easy: https://expenses-made-easy-opal.vercel.app
- Books Made Easy: https://books-made-easy-app.vercel.app
- SiteSense: https://sitesense-lilac.vercel.app

## Code Conventions

- Use TypeScript for all new files
- Follow existing Tailwind patterns for styling
- Place API routes in `app/api/`
- Use Supabase client from `lib/supabase.ts`
- Admin routes require auth check via `checkAdminAuth()`

## Known Issues

- Expense sync has RLS policy issues to resolve
- Some service role keys in client code need server-side migration
