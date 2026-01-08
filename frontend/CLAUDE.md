# MC Smart Bytes - Project Context

## Quick Reference

| Item | Value |
|------|-------|
| **Live URL** | https://mcsmartbytes.vercel.app/ |
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Database** | Supabase (PostgreSQL) |
| **Auth** | Supabase Auth |
| **Styling** | Tailwind CSS v4 |
| **Email** | SendGrid |
| **Hosting** | Vercel |

---

## Project Purpose

MC Smart Bytes is the main company website and user portal for the "Made Easy" suite of business tools. It serves as:

1. **Marketing Site** - Landing page showcasing products (Expenses Made Easy, Books Made Easy, SiteSense)
2. **User Portal** - Login/signup for MC Smart Bytes accounts
3. **Admin Dashboard** - Internal CRM, accounting, and client management
4. **Service Pages** - Done For You bookkeeping, web design, Excel, and database services

---

## Key Features

1. **Public Pages** - Homepage, services, portfolio, blog, booking
2. **User Auth** - Signup, login, dashboard with Supabase Auth
3. **Admin Panel** - CRM, invoicing, expense sync, reports, tasks
4. **Contact Forms** - Inquiry forms with SendGrid email
5. **PWA Support** - Installable as desktop/mobile app

---

## File Structure

```
src/
├── app/
│   ├── page.tsx                  # Homepage with products, pricing, testimonials
│   ├── signup/                   # User registration
│   ├── login/                    # User login
│   ├── dashboard/                # User dashboard (product links, account info)
│   ├── services/                 # Done For You service pages
│   │   ├── bookkeeping/
│   │   ├── web-design/
│   │   ├── excel/
│   │   └── database/
│   ├── blog/                     # Blog with [slug] dynamic routes
│   ├── portfolio/                # Portfolio showcase
│   ├── book/                     # Booking/scheduling page
│   ├── admin/                    # Admin panel (protected)
│   │   ├── dashboard/            # Admin overview
│   │   ├── login/                # Admin authentication
│   │   ├── accounting/           # Full accounting suite
│   │   │   ├── invoices/         # Invoice management
│   │   │   ├── customers/        # Customer management
│   │   │   ├── vendors/          # Vendor management
│   │   │   ├── chart-of-accounts/
│   │   │   └── expense-sync/     # Sync with Expenses Made Easy
│   │   ├── clients/              # Client CRM with [id] routes
│   │   ├── inquiries/            # Contact form submissions
│   │   ├── tasks/                # Task management
│   │   ├── todos/                # Todo list
│   │   ├── reports/              # Financial reports
│   │   └── blog/                 # Blog content management
│   └── api/
│       ├── send-email/           # General email endpoint
│       ├── send-booking-email/   # Booking confirmation emails
│       └── send-lead-email/      # Lead notification emails
├── components/
│   ├── Navigation.tsx            # Main site navigation
│   ├── AdminNav.tsx              # Admin panel navigation
│   ├── ContactForm.tsx           # Contact/inquiry form
│   ├── AnimatedCounter.tsx       # Number animation component
│   └── AnimatedSection.tsx       # Scroll animation wrapper
├── lib/
│   ├── supabase.ts               # Supabase client with auth config
│   └── api.ts                    # API utilities
└── public/
    ├── manifest.json             # PWA manifest
    ├── sw.js                     # Service worker
    ├── logo.jpg                  # Company logo
    └── icons/                    # PWA icons
```

---

## Database (Supabase)

Two Supabase projects are used:

### Main Database (`supabase`)
- User accounts and auth
- Admin CRM data
- Accounting (invoices, customers, vendors)
- Blog posts

### Expenses Database (`expensesSupabase`)
- Connected to Expenses Made Easy app
- Used for expense sync feature in admin

---

## Authentication

### User Auth (Public)
- `/signup` - Create account with email/password
- `/login` - Sign in, redirects to `/dashboard`
- `/dashboard` - Protected user area

### Admin Auth (Internal)
- `/admin/login` - Admin authentication
- All `/admin/*` routes require admin session

```typescript
// Supabase client uses unique storage key
storageKey: 'mcsmartbytes-auth'
```

---

## Navigation Structure

### Public Navigation
```typescript
Products (dropdown) → Expenses Made Easy, Books Made Easy, SiteSense
Pricing → /#pricing
Done For You → /services
About → /#about
Login → /login
Get Started → /signup
```

### Admin Navigation
```typescript
Dashboard, Accounting, Clients, Inquiries, Tasks, Reports, Blog
```

---

## Products (External Apps)

The Made Easy suite products are separate apps:

| Product | URL |
|---------|-----|
| Expenses Made Easy | https://expenses-made-easy-opal.vercel.app |
| Books Made Easy | https://books-made-easy-app.vercel.app |
| SiteSense | https://sitesense-lilac.vercel.app |

User dashboard provides quick links to these apps.

---

## Environment Variables

```env
# Main Supabase (MC Smart Bytes)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Expenses Supabase (for sync)
NEXT_PUBLIC_EXPENSES_SUPABASE_URL=
NEXT_PUBLIC_EXPENSES_SUPABASE_ANON_KEY=

# SendGrid
SENDGRID_API_KEY=

# App
NEXT_PUBLIC_APP_URL=
```

---

## Common Patterns

### Page Component
```typescript
'use client';
import Navigation from '@/components/Navigation';
import { supabase } from '@/lib/supabase';

export default function PageName() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
        {/* Content */}
      </div>
    </>
  );
}
```

### Protected Route
```typescript
useEffect(() => {
  const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/login');
      return;
    }
    setUser(user);
  };
  getUser();
}, [router]);
```

### API Route (SendGrid)
```typescript
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(request: Request) {
  const body = await request.json();
  await sgMail.send({ to, from, subject, html });
  return NextResponse.json({ success: true });
}
```

---

## Styling

Uses Tailwind CSS v4 with common patterns:
- Gradients: `bg-gradient-to-r from-blue-700 to-blue-800`
- Cards: `bg-white rounded-2xl shadow-xl p-8 border border-gray-200`
- Buttons: `px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all`
- Brand colors: Blue (#1e40af), Orange (#D2691E), Teal (#20B2AA)

---

## PWA Configuration

```json
// public/manifest.json
{
  "name": "MC Smart Bytes",
  "short_name": "MC Bytes",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#1e40af"
}
```

Service worker (`sw.js`) uses network-first caching strategy.

---

## Build & Deploy

```bash
npm run dev          # Development with Turbopack
npm run build        # Production build
npm run start        # Start production server
```

Deployed via Vercel with automatic deployments on push to `main`.
