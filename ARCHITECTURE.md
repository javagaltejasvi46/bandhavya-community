# ARCHITECTURE.md

# High-Level Architecture

``` text
Internet
    │
Cloudflare DNS/CDN
    │
Nginx
    │
FastAPI
 ├── Auth Service
 ├── Blog Service
 ├── Event Service
 ├── Gallery Service
 ├── Comment Service
 ├── Donation Service
 └── Admin Service
    │
PostgreSQL
    │
Cloudflare R2
```

## Technology Stack

  Layer           Technology
  --------------- -----------------------------------
  Frontend        Next.js, TypeScript, Tailwind CSS
  Backend         FastAPI, Uvicorn
  ORM             SQLAlchemy
  Validation      Pydantic
  Database        PostgreSQL
  Storage         Cloudflare R2
  Reverse Proxy   Nginx
  CDN             Cloudflare
  Deployment      Docker Compose

## Core Entities

-   User
-   Role
-   Event
-   Blog
-   Comment
-   Media
-   Donation

## Authentication

-   JWT Access Token
-   HttpOnly Refresh Token
-   Role Based Access Control (RBAC)

## Media Flow

1.  Admin requests upload.
2.  Backend generates signed R2 URL.
3.  Browser uploads directly to R2.
4.  Backend stores metadata in PostgreSQL.
5.  Gallery renders thumbnails.

## Security

-   HTTPS
-   Password hashing (Argon2 or bcrypt)
-   CSRF protection where applicable
-   Input validation
-   Rate limiting
-   Audit logging

## Future Enhancements

-   Redis cache
-   Background workers
-   Push notifications
-   Full-text search
-   Image optimization
