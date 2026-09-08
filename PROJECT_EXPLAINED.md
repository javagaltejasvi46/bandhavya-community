# Bhandhavya (ಬಾಂಧವ್ಯ) — Complete Platform Architecture & System Guide

> **"Vasudhaiva Kutumbakam" — The World is One Family**  
> A dedicated, high-performance community portal engineered for the **Bhandhavya Brahmin Family Association**. Celebrating sacred heritage, fostering intergenerational connection, honoring senior elders, empowering youth education, and facilitating philanthropic seva.

---

## Table of Contents

1. [Executive Summary & Cultural Vision](#1-executive-summary--cultural-vision)
2. [High-Level Architecture & Infrastructure Topology](#2-high-level-architecture--infrastructure-topology)
3. [Security Architecture & Role-Based Access Control (RBAC)](#3-security-architecture--role-based-access-control-rbac)
4. [Visual Design System: "Floating Heritage Glass"](#4-visual-design-system-floating-heritage-glass)
5. [Page Transition Engine & Micro-Interactions](#5-page-transition-engine--micro-interactions)
6. [Complete Frontend Walkthrough: Every Page & Component](#6-complete-frontend-walkthrough-every-page--component)
   - [6.1 Global Layout, Header & Dynamic Role Simulator](#61-global-layout-header--dynamic-role-simulator)
   - [6.2 Home Page (`/`)](#62-home-page-)
   - [6.3 Events Suite (`/events` & `/events/[id]`)](#63-events-suite-events--eventsid)
   - [6.4 Blog & Cultural Chronicles (`/blog` & `/blog/[id]`)](#64-blog--cultural-chronicles-blog--blogid)
   - [6.5 Sacred Photo Cloud & Gallery (`/gallery`)](#65-sacred-photo-cloud--gallery-gallery)
   - [6.6 Community & Family Directory (`/people`)](#66-community--family-directory-people)
   - [6.7 Seva & Philanthropy Hub (`/donate`)](#67-seva--philanthropy-hub-donate)
   - [6.8 Member Profile & Lineage Ledger (`/profile`)](#68-member-profile--lineage-ledger-profile)
   - [6.9 Authentication Gateways (`/login`, `/register`)](#69-authentication-gateways-login-register)
   - [6.10 Administrative HUD & Moderation Center (`/admin`)](#610-administrative-hud--moderation-center-admin)
   - [6.11 Global Footer & Heritage Shloka](#611-global-footer--heritage-shloka)
7. [Backend Service Layer & API Specifications](#7-backend-service-layer--api-specifications)
8. [Database Architecture & Entity Relationship Diagram (ERD)](#8-database-architecture--entity-relationship-diagram-erd)
9. [Object Storage & Media Processing Pipeline (Cloudflare R2)](#9-object-storage--media-processing-pipeline-cloudflare-r2)
10. [End-to-End System Workflows](#10-end-to-end-system-workflows)
    - [10.1 Pre-Signed Direct Media Upload Flow](#101-pre-signed-direct-media-upload-flow)
    - [10.2 Event RSVP & Digital Ticket Issuance](#102-event-rsvp--digital-ticket-issuance)
    - [10.3 Blog Post Authoring, Moderation & Publishing](#103-blog-post-authoring-moderation--publishing)
    - [10.4 Seva Donation, Webhook & 80G Receipt Issuance](#104-seva-donation-webhook--80g-receipt-issuance)
11. [DevOps, Docker Mesh & Production Deployment](#11-devops-docker-mesh--production-deployment)
12. [Complete Project File Map & Sitemap](#12-complete-project-file-map--sitemap)

---

## 1. Executive Summary & Cultural Vision

**Bhandhavya** (ಬಾಂಧವ್ಯ / kinship, alliance, sacred bond) is a modern web application created for a traditional Brahmin family association. The platform bridges sacred traditional values with state-of-the-art web technology.

### Core Objectives
- **Cultural Preservation:** Document rituals, festival calendars, Gotra/Pravara lineages, and Vedic wisdom in an accessible digital format.
- **Family Unification:** Connect geographically dispersed family branches, diaspora members, and elder lineages into a unified directory.
- **Elder Care & Youth Empowerment:** Spotlight senior elders, collect oral histories, provide student scholarships, and host career mentorship initiatives.
- **Transparent Philanthropy (Seva):** Facilitate targeted contributions for Annadana (food offering), Vidya Dana (education), temple upkeep, and disaster relief with automatic 80G tax exemption receipts and open financial ledgers.
- **Private & Sacred Media Preservation:** Safely curate high-resolution family photos, celebratory moments, and historical documents in a private Cloudflare R2 cloud archive.

---

## 2. High-Level Architecture & Infrastructure Topology

The application is structured into four segregated network layers orchestrated through Docker Compose:

```text
                                  [ INTERNET ]
                                        │
                                        ▼
                         [ Cloudflare CDN / Edge DNS ]
                         • HTTPS / TLS 1.3 Termination
                         • DDoS & Web Application Firewall (WAF)
                         • Global Asset & Media Caching
                                        │
                                        ▼
                         [ Nginx Reverse Proxy (:80/:443) ]
                         • Host header preservation
                         • Dynamic route multiplexing
                                        │
                    ┌───────────────────┴───────────────────┐
                    │                                       │
                    ▼                                       ▼
       [ Frontend: Next.js 16 ]                 [ Backend: FastAPI ]
       • App Router (SSR & CSR)                 • Python 3.11 + Uvicorn
       • Port 3000 (Internal)                   • Port 8000 (Internal)
       • Framer Motion & Tailwind v4            • Async Pydantic Validation
                    │                                       │
                    │                               ┌───────┴───────┐
                    │                               ▼               ▼
                    │                     [ PostgreSQL 15 ]   [ Cloudflare R2 ]
                    │                     • SQLAlchemy 2.0    • S3-Compatible
                    │                     • Asyncpg Driver    • Media Storage
                    │                     • Relational DB     • Zero Egress Cost
                    └───────────────────────────────┘
```

### Routing Rules in Nginx
- **`http://localhost/api/*`** ➔ Proxied directly to FastAPI backend (`backend:8000`).
- **`http://localhost/*`** ➔ Proxied to Next.js SSR/CSR frontend server (`frontend:3000`).
- **Websocket / Hot-Reload Support:** Connection upgrade headers (`Upgrade`, `Connection "upgrade"`) configured for development and live notifications.

---

## 3. Security Architecture & Role-Based Access Control (RBAC)

Bhandhavya operates on strict, context-driven Role-Based Access Control (RBAC) to respect the privacy of family lineages and financial disclosures:

### The Three Operational Tiers
1. **Guest (Unauthenticated Visitor):**
   - Public view of Home, public Event highlights, public Blog posts, public Gallery highlights.
   - Able to initiate Seva donations.
   - *Restrictions:* Cannot access member directories, cannot comment on articles, cannot download private family media, cannot access administrative screens.
2. **Member / User (Verified Community Kinsman):**
   - Access to the full Community Directory (family branches, Gotras, elders, youth accomplishments).
   - Post comments on cultural blogs and community announcements.
   - Submit RSVP confirmations for family rituals and gatherings.
   - View personal Seva donation history and download 80G tax receipts.
   - *Restrictions:* Cannot modify system records, delete other users' comments, publish unreviewed blog posts, or alter site settings.
3. **Admin (Dual Administrators & Managing Trustees):**
   - Full CRUD permissions over Events, Blogs, Media Albums, and Member Registrations.
   - Content moderation queue (approving blogs, reviewing flagged comments).
   - Financial management (auditing Seva transactions, reconciling bank settlement IDs).
   - User verification (confirming new family members into the verified roster).

### RBAC Permission Matrix

| Feature / Action | Guest | Member (User) | Admin (1 & 2) |
| :--- | :---: | :---: | :---: |
| Browse Home, Public Events & Blogs | ✅ | ✅ | ✅ |
| Initiate Seva Donation | ✅ | ✅ | ✅ |
| View Member Directory & Family Lineages | ❌ | ✅ | ✅ |
| RSVP to Family Events & Download Passes | ❌ | ✅ | ✅ |
| Post Comments & Discussion Replies | ❌ | ✅ | ✅ |
| Submit Community Stories / Draft Blogs | ❌ | ✅ (Pending Review) | ✅ (Instant Publish) |
| Direct Media Upload to Sacred Cloud | ❌ | ❌ | ✅ |
| Moderate Comments & Delete Inappropriate Content | ❌ | ❌ | ✅ |
| Approve / Reject Member Verification Requests | ❌ | ❌ | ✅ |
| Access Financial Ledger & Audit Trail | ❌ | ❌ | ✅ |

### Token & Cryptographic Protocol
- **Access Tokens:** Short-lived JSON Web Tokens (15-minute lifespan) containing `sub` (User ID), `role`, and `exp`, signed using asymmetric RS256 or secure HS256.
- **Refresh Tokens:** Long-lived (7-day lifespan) stored in `HttpOnly`, `SameSite=Strict`, `Secure` cookies, shielded from XSS attacks.
- **Password Hashing:** Argon2id / bcrypt with salted key derivation.

---

## 4. Visual Design System: "Floating Heritage Glass"

The UI uses a custom aesthetic called **Floating Heritage Glass**, designed to evoke the tranquility of a traditional temple courtyard, royal Rajasthani architecture, and sacred Vedic simplicity.

### Palette Design Tokens

| Token Name | Hex Code | Purpose / Cultural Significance |
| :--- | :--- | :--- |
| **Jaipur Pink** | `#D96C8F` | Warmth, hospitality, celebration, bridal auspiciousness. |
| **Royal Blue** | `#234E70` | Nobility, depth, trustworthiness, evening sky. |
| **Deep Indigo** | `#1E3A5F` | Intellectual grounding, Vedic scholarship, primary text color. |
| **Marigold Gold** | `#F4A300` | Genda flowers, temple aarti, morning sun, celebration. |
| **Terracotta** | `#C76B42` | Clay diyas, sacred earth, temple brickwork, warmth. |
| **Peacock Teal** | `#1F7A8C` | Grace, nature, plumage of Mayura, youth vigor. |
| **Sage Green** | `#8FAF88` | Tulsi leaves, herbal wellness, tranquility, renewal. |
| **Cream White / Soft Ivory** | `#FFF8F0` / `#F8F4EC` | Silk dhotis, sandalwood paste, ivory parchment background. |

### Glassmorphism System
- **`glass-card`**: `background: rgba(255, 248, 240, 0.72); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.7);` with subtle elevation.
- **`glass-nav`**: Frosted header bar hovering fixed at the top with `backdrop-filter: blur(20px)`.
- **`glass-button-primary`**: Vibrant gradient blend from Jaipur Pink (`#D96C8F`) to Terracotta (`#C76B42`) with soft ambient drop-shadow.

---

## 5. Page Transition Engine & Micro-Interactions

Every page features a **unique, dedicated signature animation profile** implemented via `framer-motion` inside `src/components/layout/PageTransitionWrapper.tsx`. The animations are keyed to the active route pathname (`usePathname()`), ensuring that every navigation into a page plays its distinct visual entrance:

```text
[ Route Navigation Triggered ]
             │
             ▼
[ AnimatePresence mode="wait" ]
             │
             ├──► 1. Exit Old Route: Snappy fade & slight contraction (180ms)
             │
             ├──► 2. Top Aura Bar: Sweeps across the top in page signature gradient
             │
             ├──► 3. Window Auto-Scroll: Resets smoothly to top (0, 0)
             │
             └──► 4. Enter New Route: Bespoke 3D transform & blur clearance (450ms - 580ms)
```

### Signature Transition Roster

1. **Home (`/`) — "Mandala Horizon Bloom":**  
   Smooth radial expansion (`scale: 0.93 ➔ 1`, `y: 28 ➔ 0`, `blur: 12px ➔ 0px`) symbolizing the opening of an ancestral courtyard.
2. **Events (`/events`) — "Chronicle 3D Page Sweep":**  
   Horizontal perspective page-glide (`x: 65 ➔ 0`, `rotateY: -8° ➔ 0°`) like turning the page of a ceremonial calendar.
3. **Blog (`/blog`) — "Manuscript Parchment Reveal":**  
   Vertical literary cascade (`y: 50 ➔ 0`, `rotateX: 7° ➔ 0°`) revealing sacred chronicles and stories.
4. **Gallery (`/gallery`) — "Aperture Lens Bloom":**  
   Camera lens focus (`scale: 1.08 ➔ 1`, `blur: 14px ➔ 0px`, `brightness: 1.2 ➔ 1`) snapping family memories into crystal focus.
5. **People (`/people`) — "Sangha Gathering Convergence":**  
   Multi-directional entrance (`x: -42 ➔ 0`, `y: 22 ➔ 0`, `scale: 0.96 ➔ 1`) representing family members gathering in unity.
6. **Donate (`/donate`) — "Seva Sacred Ascent":**  
   Devotional upward float (`y: 56 ➔ 0`, `scale: 0.94 ➔ 1`) with golden radiant energy.
7. **Admin (`/admin`) — "Executive Command Drop":**  
   Crisp downward HUD lock-in (`y: -38 ➔ 0`, `scale: 0.98 ➔ 1`) evoking an administrative console powering on.
8. **Login (`/login`) — "Sanctuary Gateway Zoom":**  
   Focal contraction (`scale: 0.87 ➔ 1`, `blur: 14px ➔ 0px`) drawing immediate attention to credentials.
9. **Profile (`/profile`) — "Personal Ledger Slide":**  
   Lateral slide from the left drawer (`x: -55 ➔ 0`) presenting family records and personal seva logs.

---

## 6. Complete Frontend Walkthrough: Every Page & Component

### 6.1 Global Layout, Header & Dynamic Role Simulator
- **Sticky Frosted Header (`Navbar.tsx`):**
  - Displays the Bhandhavya brand crest (`भ` in a golden gradient ring) and sub-title.
  - Desktop nav links with active indicator pills and highlight glow for the **Donate** action.
  - **Dynamic Role Simulator Toggle:** A real-time dropdown allowing administrators and reviewers to switch between `Guest`, `User (Member)`, and `Admin` roles instantly without re-logging, updating UI permissions across the entire platform.
  - Mobile responsive drawer menu with smooth backdrop blur.
- **Top Ambient Aura Bar:** Micro-gradient progress line that activates on every page transition.

### 6.2 Home Page (`/`)
- **Hero Courtyard:** Welcoming banner with radial ambient lights, headline *"Preserving Heritage, Uniting Families"*, and quick navigation CTAs.
- **Stats Counter Ribbon:** High-contrast navy glass card displaying community metrics:
  - `1,250+` Registered Family Members
  - `48+` Cultural & Vedic Gatherings Hosted
  - `₹18.4L+` Distributed in Education & Elder Seva
  - `3,400+` Preserved Archival Photographs
- **Featured Gathering Banner:** Live countdown and badge for the next upcoming major festival (e.g., Annual Mahotsava & Veda Parayana).
- **Featured Chronicle Card:** Highlighted editorial story from senior community scholars.
- **Sacred Photo Cloud Preview:** Compact interactive preview of archival family memories leading into the main gallery.
- **Core Pillars Grid:** 4 dedicated value cards — *Vedic Heritage*, *Elder Care*, *Youth Scholarships*, and *Community Unity*.

### 6.3 Events Suite (`/events` & `/events/[id]`)
- **Category Filter Tabs:** *All Gatherings*, *Festivals & Pujas*, *Vedic Parayana*, *Youth Seminars*, *Elder Satsangs*.
- **Search Bar:** Real-time search across titles, locations, and organizers.
- **Event Card Anatomy:**
  - High-res cover image with category chip.
  - Date pill, time, venue address, and pricing indicator (Free / Seva Sponsor).
  - Attendee progress meter (e.g., "142 / 200 Attending").
- **Event Detail View (`/events/[id]`):**
  - Comprehensive schedule timeline (Morning Ganapathi Homa, Noon Annadana, Evening Cultural Sangeet).
  - Venue Map coordinates and Google Calendar / Apple Calendar `.ics` export.
  - Interactive RSVP modal: Collects family head count, elder assistance requirements, and dietary preferences.
  - Real-time guest list visible to logged-in members.

### 6.4 Blog & Cultural Chronicles (`/blog` & `/blog/[id]`)
- **Article Categories:** *Traditions & Rituals*, *Gotra & Genealogy*, *Youth Achievements*, *Ayurvedic Health*, *Association News*.
- **Chronicle Card:** Read time estimate, author bio badge, published date, and comment counter.
- **Article Reader (`/blog/[id]`):**
  - Rich typography formatting optimized for deep cultural essays.
  - Social sharing links (WhatsApp, Telegram, Email, Copy Link).
  - **Discussion Thread:**
    - Authenticated members can leave replies.
    - Markdown support for sanskrit verses.
    - Community flag button to report inappropriate remarks directly to administrators.

### 6.5 Sacred Photo Cloud & Gallery (`/gallery`)
- **Aesthetic Spiral Cloud Layout:**
  - Alternating horizontal and vertical cards positioned in a balanced cross-axis geometry.
  - Intelligent aspect ratio cropping (`aspect-[4/3]` and `aspect-[3/4]`) with smooth scale hover states.
- **Category Filter Chips:** *Mahotsava 2025*, *Youth Camp*, *Veda Pathashala*, *Temple Renovation*, *Senior Elders*.
- **Interactive Lightbox:** Full-screen modal viewing with photo captions, photographer credits, and high-resolution view.
- **Member Upload Submission:** Modal enabling members to propose historical family photographs for admin curation.

### 6.6 Community & Family Directory (`/people`)
- **Search & Filter Matrix:** Search by First/Last Name, Gotra (e.g., Kashyapa, Bharadwaja, Vashistha, Harita), Native Town, or Profession.
- **Elder Honor Roll:** Dedicated golden-bordered spotlight honoring octogenarian and nonagenarian family elders.
- **Member Card Details:** Name, Gotra, Family House name, Residence City, Contact button (privacy-shielded relay), and Student Merit Badges.
- **Family Tree & Lineage Modal:** Displays father, mother, spouse, and children connections for registered families.

### 6.7 Seva & Philanthropy Hub (`/donate`)
- **Transparent Seva Meter:** Visual progress bars displaying current collections versus annual requirements for:
  - *Annadana Fund* (Community feasts and prasadam)
  - *Vidya Nidhi* (Student merit scholarships & hostel aid)
  - *Elder Healthcare Aid* (Medical checkups & medicine subsidies)
  - *Temple & Heritage Preservation* (Maintaining ancestral shrines)
- **Preset Giving Tiers:** Instant selection buttons for `₹501`, `₹1,001`, `₹2,501`, `₹5,001`, `₹11,000`, `₹25,000`, or Custom Amount.
- **Payment Method Simulation:** UPI QR Code, Netbanking, Credit/Debit Cards, and International Wire instructions.
- **80G Tax Exemption:** Automatic receipt generator with PAN registration, downloadable as a PDF.

### 6.8 Member Profile & Lineage Ledger (`/profile`)
- **Identity Banner:** Member avatar, role badge, Member ID number, verified seal.
- **Personal Heritage Info:** Gotra, Pravara, Shakha, Sutra, Kuladevate (family deity), and Native Village (*Mane Devaru*).
- **Activity Tabs:**
  - *My RSVPs:* List of registered upcoming events with QR entry passes.
  - *My Contributions:* Total donations made, with direct links to download tax receipts.
  - *Bookmarked Stories:* Saved cultural blog posts for offline reading.
  - *Security & Privacy:* Manage visibility in the community directory, change password, toggle 2FA.

### 6.9 Authentication Gateways (`/login`, `/register`)
- **Sanctum Gate Modal:** Elegant centered card with Jaipur Pink branding.
- **Login Options:** Email & Password, or One-Time Password (OTP) sent to verified mobile numbers.
- **Registration Wizard:** Captures basic user credentials alongside Gotra and family branch details for admin verification.
- **Password Reset:** Secure time-limited email reset link generation.

### 6.10 Administrative HUD & Moderation Center (`/admin`)
- **Telemetry KPI Grid:** Real-time counts of Active Members, Pending Approvals, Total Seva Funds, and Event RSVPs.
- **Member Verification Queue:** Review newly registered family members, verify their family reference, and approve/reject with one click.
- **Content Moderation Tab:**
  - Blog post drafts awaiting review.
  - Flagged comments queue with "Approve" or "Delete" actions.
- **Event Management:** Wizard to create new events, define schedule timelines, and export attendee CSV rosters.
- **Audit Log Stream:** Complete chronological record of administrative actions (who edited what and when).

### 6.11 Global Footer & Heritage Shloka
- Features the golden Sanskrit shloka: *“सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः”* (May all beings be happy, may all be free from illness).
- Quick links to all main modules, legal privacy policy, contact details of association trustees, and copyright declaration.

---

## 7. Backend Service Layer & API Specifications

The backend is built with **FastAPI** following the **Repository + Service** design pattern. Route endpoints (`app/api/`) only handle HTTP contracts, delegating business logic to `app/services/` and database queries to `app/repositories/`.

### API Endpoint Roster

```text
/api/
├── health
│   └── GET  /health                      # Container liveness check
├── auth
│   ├── POST /auth/register               # New member registration
│   ├── POST /auth/login                  # Credentials verification & JWT issue
│   ├── POST /auth/refresh                # HttpOnly refresh token rotation
│   ├── POST /auth/logout                 # Invalidate session cookie
│   └── GET  /auth/me                     # Current user profile & role
├── users
│   ├── GET  /users                       # Directory list with gotra/name filters
│   ├── GET  /users/{id}                  # Detailed profile & family lineage
│   └── PUT  /users/{id}                  # Update profile data
├── events
│   ├── GET  /events                      # Query all events with date/type filter
│   ├── POST /events                      # Create new gathering (Admin only)
│   ├── GET  /events/{id}                 # Event details, schedule, attendees
│   ├── PUT  /events/{id}                 # Update event details (Admin only)
│   ├── DELETE /events/{id}               # Soft delete event (Admin only)
│   └── POST /events/{id}/rsvp            # Submit / cancel RSVP
├── blogs
│   ├── GET  /blogs                       # Paginated published blogs
│   ├── POST /blogs                       # Submit new article (Member / Admin)
│   ├── GET  /blogs/{slug}                # Read article content
│   ├── PUT  /blogs/{id}                  # Edit article
│   └── DELETE /blogs/{id}                # Delete article (Admin only)
├── comments
│   ├── GET  /blogs/{id}/comments         # List threaded comments for an article
│   ├── POST /blogs/{id}/comments         # Post new comment (Member only)
│   ├── DELETE /comments/{id}             # Delete comment (Author or Admin)
│   └── POST /comments/{id}/flag          # Report comment for moderation
├── gallery
│   ├── GET  /gallery/albums              # List all photo albums
│   ├── GET  /gallery/albums/{id}         # Album photos & metadata
│   ├── POST /gallery/albums              # Create album (Admin only)
│   ├── POST /gallery/presigned-upload    # Request Cloudflare R2 signed upload URL
│   └── POST /gallery/photos              # Register uploaded photo metadata
├── donations
│   ├── GET  /donations/causes            # Active Seva causes & progress
│   ├── POST /donations/initiate          # Create payment order (Razorpay/UPI)
│   ├── POST /donations/webhook           # Payment gateway webhook callback
│   └── GET  /donations/{id}/receipt      # Download 80G tax receipt PDF
└── admin
    ├── GET  /admin/stats                 # System KPIs & telemetry
    ├── GET  /admin/verifications         # Pending member approvals
    ├── POST /admin/verifications/{id}    # Approve / Reject member
    └── GET  /admin/audit-logs            # System audit logs
```

---

## 8. Database Architecture & Entity Relationship Diagram (ERD)

The relational schema is implemented in PostgreSQL 15 via SQLAlchemy 2.0 with asynchronous execution (`asyncpg`):

```text
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│      roles      │       │      users      │       │    profiles     │
├─────────────────┤       ├─────────────────┤       ├─────────────────┤
│ id (PK)         │◄──┐   │ id (UUID, PK)   │◄──┐   │ id (PK)         │
│ name            │   └───┤ role_id (FK)    │   └───┤ user_id (FK)    │
│ permissions     │       │ email           │       │ first_name      │
└─────────────────┘       │ hashed_password │       │ last_name       │
                          │ is_verified     │       │ gotra           │
                          │ created_at      │       │ native_village  │
                          └────────┬────────┘       │ phone_number    │
                                   │                └─────────────────┘
         ┌─────────────────────────┼─────────────────────────┐
         │                         │                         │
         ▼                         ▼                         ▼
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│     events      │       │      posts      │       │    donations    │
├─────────────────┤       ├─────────────────┤       ├─────────────────┤
│ id (UUID, PK)   │       │ id (UUID, PK)   │       │ id (UUID, PK)   │
│ title           │       │ author_id (FK)  │◄──┐   │ user_id (FK)    │
│ slug            │       │ title           │   │   │ cause_id (FK)   │
│ start_time      │       │ content         │   │   │ amount          │
│ venue           │       │ status          │   │   │ payment_status  │
│ max_capacity    │       │ published_at    │   │   │ 80g_receipt_no  │
└────────┬────────┘       └────────┬────────┘   │   └─────────────────┘
         │                         │            │
         ▼                         ▼            │
┌─────────────────┐       ┌─────────────────┐   │
│event_reg(RSVPs) │       │    comments     │   │
├─────────────────┤       ├─────────────────┤   │
│ id (PK)         │       │ id (UUID, PK)   │   │
│ event_id (FK)   │       │ post_id (FK)    │   │
│ user_id (FK)    │       │ author_id (FK)──┼───┘
│ attendees_count │       │ content         │
│ created_at      │       │ is_flagged      │
└─────────────────┘       └─────────────────┘
```

### Table Specifications
- **`users`**: Core credentials, verification status, and foreign key to `roles`.
- **`profiles`**: Cultural metadata including Gotra, Pravara, Nakshatra, native town, address, and directory privacy toggles (`is_directory_visible`).
- **`events` & `event_registrations`**: Stores venue, dates, capacity, and RSVP logs with guest counts.
- **`posts` & `comments`**: Article authoring with `DRAFT`, `PENDING_REVIEW`, and `PUBLISHED` states. Comments support soft deletion and moderation flags.
- **`media_albums` & `media_items`**: Cloudflare R2 object keys, CDN URLs, aspect ratios, dominant color hashes, and photo titles.
- **`donations` & `donation_causes`**: Seva funding pools, transaction IDs, payment gateway payloads, and 80G tax serial numbers.
- **`audit_logs`**: Immutable ledger recording User ID, Action, Entity, Timestamp, and IP Address for full transparency.

---

## 9. Object Storage & Media Processing Pipeline (Cloudflare R2)

To ensure high performance and zero egress fees, Bhandhavya uses **Cloudflare R2** with an asynchronous pre-signed upload pipeline:

```text
[ Browser (Admin) ]                [ FastAPI Backend ]               [ Cloudflare R2 ]
        │                                  │                                 │
        │ 1. Request Upload URL (filename) │                                 │
        ├─────────────────────────────────►│                                 │
        │                                  │ 2. Generate Pre-signed PUT URL  │
        │                                  ├────────────────────────────────►│
        │                                  │◄────────────────────────────────┤
        │ 3. Returns signed URL + Key      │                                 │
        │◄─────────────────────────────────┤                                 │
        │                                                                    │
        │ 4. Direct Binary Upload (PUT)                                      │
        ├───────────────────────────────────────────────────────────────────►│
        │                                                                    │
        │ 5. Confirm Upload Complete (Key, Dimensions, Caption)              │
        ├─────────────────────────────────►│                                 │
        │                                  │ 6. Write record to PostgreSQL   │
        │                                  ├────────┐                        │
        │                                  │        │                        │
        │ 7. Gallery Card Rendered         │◄───────┘                        │
        │◄─────────────────────────────────┤                                 │
```

### Benefits of this Flow
- **Zero Server Memory Overhead:** Multi-megabyte images never pass through the FastAPI server memory.
- **Zero Egress Fees:** Cloudflare R2 provides free egress bandwidth when served through Cloudflare CDN.
- **Edge Caching:** Images are cached at Cloudflare edge nodes globally for sub-50ms load times.

---

## 10. End-to-End System Workflows

### 10.1 Pre-Signed Direct Media Upload Flow
1. Admin selects high-resolution images in the Gallery Manager.
2. Frontend sends file metadata (name, MIME type, size) to `/api/gallery/presigned-upload`.
3. Backend validates admin credentials and generates a time-limited (10 min) presigned PUT URL using `boto3`.
4. Browser streams the file directly to Cloudflare R2 using `fetch(signedUrl, { method: 'PUT', body: file })`.
5. Upon 200 OK from R2, browser notifies backend at `/api/gallery/photos` to create the database entry.
6. The gallery updates dynamically without page reloads.

### 10.2 Event RSVP & Digital Ticket Issuance
1. Authenticated member views `/events/evt-1` and clicks **"Confirm RSVP"**.
2. Member specifies attendee count (e.g., 2 adults, 1 senior, 1 child) and special dietary or seating requests.
3. Backend validates remaining event capacity.
4. Database creates an `event_registrations` row and decrements available capacity atomically.
5. Frontend renders an auspicious digital pass with a QR code, which is also emailed to the member.
6. Admin scans the QR code at the event entrance using the admin check-in scanner.

### 10.3 Blog Post Authoring, Moderation & Publishing
1. Member writes a cultural article on *“Significance of Sandhyavandana”* in `/blog/new`.
2. Post is saved with state `PENDING_REVIEW`.
3. Admin receives a notification on the Admin HUD.
4. Admin reviews content, checks for formatting, and clicks **"Approve & Publish"**.
5. State transitions to `PUBLISHED`; post is automatically indexed in the blog feed and search index.

### 10.4 Seva Donation, Webhook & 80G Receipt Issuance
1. Donor navigates to `/donate`, selects **"Vidya Nidhi Scholarship Fund"**, and enters `₹5,001`.
2. Donor inputs PAN number and billing address for tax exemption.
3. Backend calls payment gateway (Razorpay/Stripe/UPI) to initiate an order.
4. Donor completes payment via UPI QR code or card.
5. Payment Gateway triggers `/api/donations/webhook` with cryptographic signature verification.
6. Backend verifies payment, generates an 80G compliant receipt number (`BHA-80G-2026-0412`), generates a PDF, and emails it to the donor.
7. The public cause progress bar updates in real time.

---

## 11. DevOps, Docker Mesh & Production Deployment

The entire stack is packaged into reproducible, isolated Docker containers configured in `docker-compose.yml`:

### Container Roster
- **`nginx`:** Reverse proxy handling ports `80` (HTTP) and `443` (HTTPS), SSL termination, request buffering, and path routing.
- **`frontend`:** Next.js 16 Node.js runtime serving SSR pages, API client routes, and static assets on port `3000`.
- **`backend`:** Python 3.11 with Uvicorn ASGI server executing FastAPI on port `8000`.
- **`db`:** PostgreSQL 15 Alpine image with persistent Docker volume storage (`postgres_data`).

### Production Launch Commands
```bash
# 1. Clone project repository
git clone https://github.com/javagaltejasvi46/bandhavya-community.git
cd bandhavya-community

# 2. Configure environment files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local

# 3. Build and launch all services in detached mode
docker compose up --build -d

# 4. Verify running containers
docker compose ps

# 5. Run database migrations
docker compose exec backend alembic upgrade head
```

---

## 12. Complete Project File Map & Sitemap

```text
d:\bhandavya_project\
│
├── .gitignore                         # Git exclusion rules
├── AGENTS.md                          # Project principles, roles, and coding guidelines
├── ARCHITECTURE.md                    # High-level architecture specification
├── decisions.md                       # Architectural Decision Records (ADR-001 to ADR-006)
├── docker-compose.yml                 # Multi-container orchestration mesh
├── PROJECT_EXPLAINED.md               # [THIS FILE] Comprehensive system master guide
│
├── nginx/
│   └── nginx.conf                     # Reverse proxy routing rules & headers
│
├── backend/
│   ├── Dockerfile                     # Python 3.11 / FastAPI container definition
│   ├── requirements.txt               # Backend dependencies (fastapi, uvicorn, sqlalchemy, etc.)
│   ├── app/
│   │   ├── main.py                    # FastAPI entrypoint, CORS & healthcheck
│   │   ├── core/                      # Configuration, JWT security, and hashing
│   │   ├── db/                        # Database session and base model definitions
│   │   ├── api/                       # HTTP route controllers (/auth, /events, /blogs, etc.)
│   │   ├── models/                    # SQLAlchemy database entity declarations
│   │   ├── repositories/              # Database query abstraction layer
│   │   ├── schemas/                   # Pydantic validation & serialization models
│   │   └── services/                  # Core business logic layer
│   └── tests/                         # Pytest unit and integration test suite
│
└── frontend/
    ├── Dockerfile                     # Next.js multi-stage build container
    ├── package.json                   # Dependencies (Next.js 16, React 19, Framer Motion, Lucide)
    ├── tsconfig.json                  # TypeScript compiler settings
    ├── next.config.ts                 # Next.js runtime configuration
    │
    ├── public/
    │   ├── images/
    │   │   ├── background.png         # Cultural backdrop texture
    │   │   └── mockups/               # Sample gallery and heritage photography
    │   └── favicon.ico
    │
    └── src/
        ├── app/
        │   ├── globals.css            # Tailwind CSS v4 tokens, glassmorphic utilities
        │   ├── layout.tsx             # Root layout with font preconnect & PageTransitionWrapper
        │   ├── page.tsx               # Home page (Hero, Stats, Culture pillars, Photo preview)
        │   ├── admin/
        │   │   └── page.tsx           # Administrative HUD (moderation, verifications, analytics)
        │   ├── blog/
        │   │   └── page.tsx           # Cultural chronicles feed & post authoring
        │   ├── donate/
        │   │   └── page.tsx           # Seva funding hub & 80G tax receipt generator
        │   ├── events/
        │   │   ├── page.tsx           # Event calendar, category filters & listings
        │   │   └── [id]/
        │   │       └── page.tsx       # Event detailed schedule, RSVP pass generator
        │   ├── gallery/
        │   │   └── page.tsx           # Sacred spiral photo cloud & lightbox viewer
        │   ├── login/
        │   │   └── page.tsx           # Sanctum authentication & OTP gateway
        │   ├── people/
        │   │   └── page.tsx           # Family lineage directory & elder honor roll
        │   └── profile/
        │       └── page.tsx           # Personal lineage ledger, RSVP history & privacy settings
        │
        ├── components/
        │   ├── layout/
        │   │   ├── Navbar.tsx         # Sticky frosted navigation & dynamic role switcher
        │   │   ├── Footer.tsx         # Heritage crest, Sanskrit shloka & trustee links
        │   │   └── PageTransitionWrapper.tsx # Route-specific 3D animations & aura beam engine
        │   └── ui/                    # Reusable glassmorphic UI components
        │
        ├── context/
        │   └── AuthContext.tsx        # RBAC state manager (Guest, Member, Admin simulation)
        │
        └── services/
            └── mockData.ts            # Typed community mock dataset for rapid client development
```

---

## Conclusion & Ongoing Evolution

With its **Floating Heritage Glass** design system, **page-specific Framer Motion transitions**, robust **FastAPI & PostgreSQL backend architecture**, and zero-egress **Cloudflare R2 media pipeline**, the Bhandhavya platform stands as an exemplary digital home for the Brahmin family association. Every feature is crafted with purpose, reverence, and technological precision.
