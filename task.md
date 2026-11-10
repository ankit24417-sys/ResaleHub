

## 1. PROJECT OVERVIEW & GOAL
You are a Principal Full-Stack Architect and UI/UX Engineer. Build a complete, production-ready, multi-page full-stack web application for **ResaleHub** (or FranTransfer) — a high-trust, minimalist Franchise Resale Brokerage Platform inspired by the visual authority of Franchise Flippers.

The platform connects three core stakeholders:
1. **Buyers:** Browse blind teasers, unlock financial metrics via login, execute digital NDAs, and view Virtual Data Rooms.
2. **Sellers:** Build blind resale listings through a multi-step studio wizard, attach P&Ls, and set territory boundaries.
3. **Franchisors:** Corporate brand admins who audit buyer backgrounds and manage multi-stage transfer approvals.

---

## 2. TECH STACK & SYSTEM ARCHITECTURE
- **Frontend Framework:** Next.js (App Router, TypeScript `.tsx`, multi-page layout).
- **Backend Framework:** Node.js + Express.js (REST API, ES Modules).
- **Database:** MongoDB with Mongoose ODM (`2dsphere` spatial indexing for GeoJSON territory mapping).
- **Styling & UI:** Tailwind CSS, `lucide-react` icons, `clsx`, `tailwind-merge`.
- **Auth & Security:** JWT (HTTP-only cookies), `bcryptjs`, Role-Based Access Control (RBAC), and middleware route protection.
- **Imagery:** Curated, royalty-free Unsplash background images rendered with dark slate gradient overlays (`opacity-20 blend-luminosity`) for an executive, non-cluttered look.

---

## 3. TYPOGRAPHY & MINIMALIST DESIGN SYSTEM

To ensure a high-contrast, non-ordinary SaaS aesthetic:

### A. Typography Hierarchy (Montserrat System)
- **Primary Font:** `'Montserrat', sans-serif` via `next/font/google`.
- **Main Headlines:** `font-black` (Weight 900), `uppercase`, tight letter spacing (`tracking-tight`). Anchor key phrases in high-contrast emerald green (`text-emerald-500`).
- **Nav Links & Subheads:** `text-xs font-extrabold uppercase tracking-widest text-slate-700`.
- **Financial Metrics:** Bold mono-spaced / sharp numbers (`font-bold text-slate-900` or `text-emerald-600` for cash flow).

### B. Background Imagery & Visual Layering
- **Hero Sections:** Full-width dark background container (`bg-slate-950`) featuring subtle Unsplash background images (`https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80`).
- **Overlay Rule:** Apply a dark gradient overlay (`bg-gradient-to-b from-slate-950/80 via-slate-950/95 to-slate-950` with image opacity set to `opacity-20` and `mix-blend-luminosity`) to guarantee text readability without needing text shadows.
- **Card Surfaces:** Crisp white cards with multi-layered drop shadows (`shadow-xl`), subtle borders (`border border-slate-100`), and rounded corners (`rounded-2xl`).

---

## 4. MULTI-PAGE NAVBAR ROUTING & PAGE SPECIFICATIONS

Every Navbar link must route to its own fully developed, dedicated Next.js page (`app/*/page.tsx`):

1. **`BUYERS` (`/buyers`):**
   - **Hero:** "BUYER RESALE SERVICES" (Unsplash executive backdrop).
   - **Content:** Step-by-step buyer onboarding guide (*Account Creation* -> *Financial Verification* -> *NDA Execution* -> *Deal Room Access*), pre-qualification criteria checklist, and CTA to browse active resales.
2. **`SELLERS` (`/sellers`):**
   - **Hero:** "SELL YOUR FRANCHISE CONFIDENTIALLY".
   - **Content:** Valuation calculators, blind listing privacy guarantees, seller process timeline, and a direct CTA to launch the **Seller Listing Studio** (`/seller/create`).
3. **`FRANCHISORS` (`/franchisors`):**
   - **Hero:** "CORPORATE TRANSFER MANAGEMENT".
   - **Content:** Enterprise portal overview for franchisor brand representatives. Features approval workflow automation specs, brand control guidelines, and demo request forms.
4. **`CONSULTANTS` (`/consultants`):**
   - **Hero:** "BROKER & CONSULTANT PARTNERSHIPS".
   - **Content:** Co-brokerage network details, commission split structure explanations, referral submission portal, and advisor registration form.
5. **`RESOURCES` (`/resources`):**
   - **Hero:** "FRANCHISE RESALE KNOWLEDGE CENTER".
   - **Content:** Grid of downloadable guides, M&A market valuation reports, sample digital NDAs, and legal transfer documentation FAQs.
6. **`CONTACT` (`/contact`):**
   - **Hero:** "CONNECT WITH OUR M&A TEAM".
   - **Content:** High-trust contact page with direct phone lines, office locations, security compliance badges, and an inquiry submission form.
7. **`LOGIN / SIGN UP` (`/login`):**
   - Dedicated clean authentication page / modal with tabbed switching between Login and Account Registration.

---

## 5. GATED DATA ARCHITECTURE & ROUTE PROTECTION

Implement a strict 2-tier content gating system:

1. **Unauthenticated Teasers (Public Guests):**
   - Guests on `/` or `/buyers` see **Blind Teaser Cards** showing ONLY: `Public Title` (e.g., "High-Volume QSR Franchise - North Denver"), `Category`, and `Region`.
   - Financial fields (`Asking Price` & `Cash Flow`) must be blurred behind a dark backdrop filter lock overlay with a `Lock` icon and a `[ Sign In to Unlock ]` button.
2. **Authenticated Access (Logged In):**
   - Unlocks exact figures, P&Ls, territory boundaries, and access to execute the Digital NDA for full Data Room entry.
3. **Next.js Middleware Guard (`middleware.ts`):**
   - Intercept unauthenticated access to `/listings/[id]`, `/seller/*`, `/franchisor/*`, and `/dashboard/*`, redirecting to `/login?redirect=<target_route>`.

---

## 6. COMPLETE DIRECTORY TREE TO GENERATE

Generate complete, production-ready code for this full application structure:

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
├── middleware.ts                 # Server-side route protection middleware
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
└── login/page.tsx           # Authentication page (Login/Register)


### Refrences
https://franchiseflippers.com/selling-a-franchise/#seller-services


### Also use suitable and professional background image from the internet 
---

## 7. CODE COMPLETION REQUIREMENTS

1. **No Truncation:** Generate complete, runnable source code for all backend controllers, MongoDB models, Next.js page routes, and Tailwind components. Do not use placeholders like `// TODO: implement later`.
2. **Visual Consistency:** Apply the Montserrat typography classes (`font-black uppercase tracking-tight`) and dark Unsplash blend modes consistently across all secondary pages (`/buyers`, `/sellers`, `/franchisors`, etc.).
3. **Type Safety & State:** Include full TypeScript interfaces for all components and API responses.