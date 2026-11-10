# ResaleHub (FranTransfer) — Franchise Resale Brokerage Platform

An institutional, high-trust, minimalist Franchise Resale Brokerage Platform inspired by the visual authority of Franchise Flippers. ResaleHub connects three core stakeholders:
1. **Buyers:** Browse blind teasers, unlock financial metrics via login, execute digital NDAs, and view Virtual Data Rooms.
2. **Sellers:** Build blind resale listings through a multi-step studio wizard, attach P&Ls, and set territory boundaries (`/seller/create`).
3. **Franchisors:** Corporate brand admins who audit buyer backgrounds and manage multi-stage transfer approvals (`/franchisors`).

---

## Architecture & Tech Stack

- **Frontend:** Next.js 14 (App Router, TypeScript `.tsx`, Tailwind CSS, Montserrat Google Font hierarchy, `lucide-react`).
- **Backend:** Node.js + Express.js (REST API, ES Modules, `cookie-parser`, `cors`, `jsonwebtoken`, `bcryptjs`).
- **Database:** MongoDB with Mongoose ODM with `2dsphere` spatial indexing for GeoJSON territory boundaries, with seamless in-memory fallback persistence when MongoDB service is not started.
- **Route Protection Middleware:** Server-side Next.js `middleware.ts` guarding `/listings/*`, `/seller/*`, `/franchisor/*`, and `/dashboard/*`.
- **Styling & Visual Design:** Executive minimalist palette (`bg-slate-950`, `text-emerald-500`, crisp white cards with multi-layered drop shadows, and curated Unsplash imagery with `opacity-20 mix-blend-luminosity`).

---

## Directory Structure

```
├── backend/
│   ├── config/
│   │   ├── db.js                    # MongoDB connection & spatial index initialization
│   │   └── seed.js                  # Seed 5 realistic franchise listings (QSR, Gym, Auto, etc.)
│   ├── models/
│   │   ├── User.js                  # User schema (buyer, seller, franchisor, consultant)
│   │   ├── Listing.js               # Listing schema with GeoJSON polygon & private data sub-doc
│   │   └── NdaAgreement.js          # NDA execution logs & time-stamped access tokens
│   ├── middlewares/
│   │   ├── authMiddleware.js        # JWT verification & req.user attachment
│   │   └── dataRoomGatekeeper.js    # Verifies signed NDA prior to unlocking PDFs
│   ├── controllers/
│   │   ├── authController.js        # Register, Login, Me endpoints
│   │   ├── listingController.js     # Public teasers endpoint vs full protected listing fetch
│   │   └── ndaController.js         # Digital NDA signing engine
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── listingRoutes.js
│   │   └── ndaRoutes.js
│   └── server.js                    # Express app setup & CORS handling
│
└── frontend/
    ├── context/
    │   └── AuthContext.tsx          # Client-side user auth state provider
    ├── middleware.ts                # Server-side route protection middleware
    ├── components/
    │   ├── layout/
    │   │   ├── Navbar.tsx           # Sticky white navbar with all 6 uppercase options + Login pill
    │   │   └── Footer.tsx           # Corporate M&A footer with dynamic site map
    │   ├── marketplace/
    │   │   ├── HeroBanner.tsx       # Centered high-impact hero with Unsplash backdrop overlay
    │   │   ├── ListingTeaserCard.tsx# Gated card with lock overlay for guests
    │   │   └── SearchFilters.tsx    # Floating search container overlapping hero bottom
    │   └── common/
    │       └── PageHeader.tsx       # Reusable Unsplash backdrop hero header for secondary pages
    └── app/
        ├── layout.tsx               # Root layout configuring Montserrat Google Font
        ├── page.tsx                 # Public teaser homepage
        ├── buyers/page.tsx          # Dedicated Buyers page
        ├── sellers/page.tsx         # Dedicated Sellers page
        ├── franchisors/page.tsx     # Dedicated Franchisors page
        ├── consultants/page.tsx     # Dedicated Consultants page
        ├── resources/page.tsx       # Dedicated Resources page
        ├── contact/page.tsx         # Dedicated Contact page
        ├── listings/[id]/page.tsx   # Protected detail view & NDA workflow
        ├── seller/create/page.tsx   # Seller Listing Studio multi-step wizard
        └── login/page.tsx           # Authentication page (Login/Register with 1-click Demo quick logins)
```

---

## 1-Click Demo Accounts

On the `/login` page, you can use the instant 1-click quick login buttons or enter these credentials:

| Role | Email | Password | Access Capabilities |
| :--- | :--- | :--- | :--- |
| **Buyer** | `buyer@resalehub.com` | `password123` | Unlock financials, sign digital NDAs, view Virtual Data Rooms |
| **Seller** | `seller@resalehub.com` | `password123` | Access Seller Listing Studio (`/seller/create`) |
| **Franchisor** | `franchisor@resalehub.com` | `password123` | Brand transfer desk, audit applicant liquidity |
| **Consultant** | `consultant@resalehub.com` | `password123` | Co-brokerage network, 50/50 fee split agreements |

---

## Running Locally

### Backend (Port 5000)
```bash
cd backend
npm install
npm run dev # or npm start
```

### Frontend (Port 3000)
```bash
cd frontend
npm install
npm run dev # or npm run build && npm start
```

Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

