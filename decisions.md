# Architecture & Technical Decision Log (ADR)

This file maintains a permanent, chronological record of all architectural, structural, and implementation decisions made in the **Bhandhavya** project, along with valid technical and contextual reasoning.

---

## Decision Index

| ID | Date | Title | Status |
| :--- | :--- | :--- | :--- |
| [ADR-001](#adr-001-floating-heritage-glass-design-system) | 2026-08-31 | Floating Heritage Glass Design System | Accepted / Implemented |
| [ADR-002](#adr-002-frontend-tech-stack-nextjs-app-router--tailwind-css) | 2026-08-31 | Frontend Tech Stack: Next.js App Router & Tailwind CSS | Accepted / Implemented |
| [ADR-003](#adr-003-mock-data-service-layer-for-initial-ui-development) | 2026-08-31 | Mock Data Service Layer for Initial UI Development | Accepted / Implemented |
| [ADR-004](#adr-004-page-specific-transition-animations-using-framer-motion) | 2026-09-04 | Page-Specific Transition Animations Using Framer Motion | Accepted / Implemented |
| [ADR-005](#adr-005-mandatory-decision-logging-in-decisionsmd) | 2026-09-04 | Mandatory Decision Logging in `decisions.md` | Accepted / Active |
| [ADR-006](#adr-006-comprehensive-master-platform-blueprint-project_explainedmd) | 2026-09-08 | Comprehensive Master Platform Blueprint (`PROJECT_EXPLAINED.md`) | Accepted / Implemented |

---

## ADR-001: Floating Heritage Glass Design System

- **Date:** 2026-08-31
- **Status:** Accepted / Implemented
- **Context:** The community portal needed a distinct visual identity that honors traditional Brahmin family heritage while feeling fresh, modern, and welcoming rather than dated or sterile.
- **Decision:** Adopted the **"Floating Heritage Glass"** aesthetic, featuring:
  - Heritage color palette: Jaipur Pink (`#D96C8F`), Royal Blue (`#234E70`), Deep Indigo (`#1E3A5F`), Marigold (`#F4A300`), Terracotta (`#C76B42`), Peacock Teal (`#1F7A8C`), and Soft Ivory (`#F8F4EC`).
  - Glassmorphic translucent cards with subtle blurs (`backdrop-filter: blur(16px)`), delicate borders (`rgba(255, 255, 255, 0.7)`), and soft drop shadows.
  - Curated typography: `Inter` for body readability and `Poppins` for regal headings.
- **Reason:** Balances sacred traditional symbolism with high-end modern UX, providing warmth and reverence without visual clutter.

---

## ADR-002: Frontend Tech Stack: Next.js App Router & Tailwind CSS

- **Date:** 2026-08-31
- **Status:** Accepted / Implemented
- **Context:** Required a robust, SEO-friendly, production-ready frontend framework for a multi-role community portal (Guest, User/Member, Admin).
- **Decision:** Built the frontend with **Next.js 16 (App Router)**, **TypeScript**, and **Tailwind CSS**.
- **Reason:**
  - App Router enables layout nesting, fast routing, and clean route group organization (`/events`, `/blog`, `/gallery`, `/donate`, `/admin`, `/login`, `/profile`).
  - TypeScript provides type safety across API schemas, mock entities, and user roles.
  - Tailwind CSS enables rapid styling aligned with design tokens and responsive breakpoints.

---

## ADR-003: Mock Data Service Layer for Initial UI Development

- **Date:** 2026-08-31
- **Status:** Accepted / Implemented
- **Context:** UI pages and user workflows needed to be built, tested, and visually reviewed before backend database migrations and endpoints were completely connected.
- **Decision:** Built a typed mock service layer (`src/services/mockData.ts`) and Auth Context (`src/context/AuthContext.tsx`) with realistic community data (events, blogs, members, gallery albums, donations, and role switching between Guest, Member, and Admin).
- **Reason:** Allows the client application to be fully interactive and testable in isolation; keeps backend schemas and frontend contracts aligned for seamless switchover.

---

## ADR-004: Page-Specific Transition Animations Using Framer Motion

- **Date:** 2026-09-04
- **Status:** Accepted / Implemented
- **Context:** The user requested transitions between pages that are not generic single fades, but distinct animations tailored to each individual page that replay every time the page is navigated to.
- **Decision:** 
  - Installed `framer-motion` and created `PageTransitionWrapper.tsx` in `src/components/layout/`.
  - Wrapped `{children}` in `src/app/layout.tsx`.
  - Mapped each route (`/`, `/events`, `/blog`, `/gallery`, `/people`, `/donate`, `/admin`, `/login`, `/profile`) to a bespoke animation profile with custom initial/animate/exit transforms, easing curves, blurs, and top ambient aura shimmer bars.
  - Used `usePathname()` as the unique key in `AnimatePresence mode="wait"` to ensure re-triggering on every navigation.
- **Reason:** 
  - Framer Motion provides reliable hardware-accelerated 3D transforms (`rotateY`, `rotateX`, `scale`, `filter`).
  - Route-specific profiling gives each section a distinct thematic emotion (e.g. Gallery lens bloom, Events calendar flip, Donate devotional float, Blog manuscript reveal) while keeping timing and glassmorphic consistency.

---

## ADR-005: Mandatory Decision Logging in `decisions.md`

- **Date:** 2026-09-04
- **Status:** Accepted / Active
- **Context:** The user requested that every technical and architectural decision taken must be formally logged with a valid reason.
- **Decision Taken:** Established `decisions.md` in the workspace root as the single source of truth for all decisions. Any future feature choice, dependency selection, refactoring, or architectural change must be appended with:
  - Date & Status
  - Context / Problem
  - Decision Taken
  - Valid Reason & Justification
- **Reason:** Guarantees transparency, traceability, and continuity across sessions and contributors.

---

## ADR-006: Comprehensive Master Platform Blueprint (`PROJECT_EXPLAINED.md`)

- **Date:** 2026-09-08
- **Status:** Accepted / Implemented
- **Context:** The user requested an exhaustive, single explanatory markdown document detailing every nook and corner of the Bhandhavya platform assuming full completion across frontend, backend, infrastructure, security, data schemas, and deployment layers.
- **Decision:** Authored `PROJECT_EXPLAINED.md` in the root workspace. The document covers:
  1. Executive Vision & Cultural Mission
  2. Full-Stack Architecture & High-Level System Topology
  3. RBAC Matrix & Authentication Protocol
  4. Complete UI/UX Walkthrough (every page, component, and signature animation)
  5. Backend Service Architecture & API Endpoints
  6. Database Models, Entities & Relationships (PostgreSQL / SQLAlchemy)
  7. Object Storage & Media Processing Pipeline (Cloudflare R2)
  8. End-to-End User Workflows (RSVP, Seva Donations, Blog Moderation, Direct Uploads)
  9. DevOps, Multi-Container Docker Stack, Nginx Configuration & Production Hardening
  10. Complete File Sitemap & Directory Structure
- **Reason:** Ensures that any developer, administrator, or stakeholder can navigate, understand, operate, maintain, and expand the platform with 100% clarity and zero ambiguity.
