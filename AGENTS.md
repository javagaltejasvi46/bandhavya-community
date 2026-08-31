# AGENTS.md

## Project

**Bhandhavya** -- Community platform for a Brahmin family association.

## Development Principles

-   Backend: FastAPI
-   Frontend: Next.js + TypeScript + Tailwind CSS
-   Database: PostgreSQL
-   Object Storage: Cloudflare R2
-   Reverse Proxy: Nginx
-   CDN/DNS: Cloudflare
-   Containers: Docker Compose

## Roles

### Guest

Permissions: - View Home - View Events - View Blogs - View Gallery
(public) - Donate Restrictions: - No authentication - No comments - No
uploads - No edits

### User (Member)

Permissions: - Read all content - Comment on blogs - View member
directory Restrictions: - Cannot create/edit/delete blogs - Cannot
upload media - Cannot modify database records

### Admin (2)

Permissions: - Full CRUD on events, blogs, gallery and members -
Upload/delete media - Moderate comments - Manage users - Configure site
settings

## Backend Modules

-   Authentication
-   Users
-   Events
-   Blogs
-   Comments
-   Gallery
-   Donations
-   Notifications
-   Admin

## Coding Guidelines

-   SQLAlchemy ORM
-   Pydantic validation
-   JWT authentication
-   RBAC authorization
-   Repository + Service pattern
-   Async endpoints where appropriate
-   Unit tests for services
