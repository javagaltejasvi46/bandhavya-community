# Bhandhavya Frontend Implementation Prompt

## Purpose

Implement the complete **Bhandhavya** frontend in **React JS** based on the UI reference images placed in this frontend folder.

The reference images will be correctly named after their corresponding pages. Treat those images as the **primary visual source of truth**. Reproduce their layout, hierarchy, spacing, glass effects, colors, component structure, and overall visual personality as closely as practical.

Do not redesign the application into a generic dashboard. The intended identity is:

> **Floating Heritage Glass** — a warm, joyful, calm, Rajasthani-inspired community platform where translucent UI surfaces appear to levitate above a soft colorful background.

---

# Technology Requirements

Use:

- React JS
- JavaScript
- React Router for navigation
- CSS or the existing project styling approach
- Reusable React components
- Responsive layouts
- A consistent icon library

Do not introduce unnecessary dependencies.

---

# Core Design System

## Visual Personality

The UI must feel:

- Glass-like
- Soft
- Rounded
- Calm
- Colorful but not overwhelming
- Premium
- Friendly
- Community-oriented
- Easy for older users to understand
- Consistent across all screens

Major UI surfaces should appear to **float above the background in layers**.

Avoid harsh cyberpunk glassmorphism.

---

# Color Palette

| Name | Hex | Use |
|---|---|---|
| Cream White | `#FFF8F0` | Main background |
| Soft Ivory | `#F8F4EC` | Secondary background |
| Jaipur Pink | `#D96C8F` | Primary brand accent |
| Royal Blue | `#234E70` | Navigation and trust |
| Deep Indigo | `#1E3A5F` | Dark accent/text |
| Desert Sand | `#D8B384` | Warm decoration |
| Marigold | `#F4A300` | Highlights |
| Terracotta | `#C76B42` | Warm accent |
| Peacock Teal | `#1F7A8C` | Community accent |
| Sage Green | `#8FAF88` | Positive accents |

Use the reference images as the final authority for exact visual balance.

---

# Typography

Preferred:

- Headings: Poppins
- Body: Inter

Rules:

- No decorative or difficult-to-read fonts
- Comfortable body text around 16–18px
- Avoid important text below 14px
- Clear hierarchy
- Generous line height
- Good contrast

---

# Glass UI Rules

Major cards and panels should use:

- Semi-transparent cream/white surface
- Background blur
- Subtle translucent border
- Large rounded corners
- Soft diffuse shadows
- Gentle depth

Suggested direction:

```css
background: rgba(255, 248, 240, 0.55);
backdrop-filter: blur(18px);
border: 1px solid rgba(255, 255, 255, 0.55);
border-radius: 24px;
box-shadow: 0 16px 45px rgba(70, 50, 40, 0.10);
```

Do not make every element equally elevated.

Use three depth levels:

1. Background/base surface
2. Standard glass cards
3. Focus cards/modals/primary actions

Hover animations must remain subtle.

---

# UX Requirements

The application must be friendly to older users.

## Do

- Use large recognizable buttons
- Use clear text labels
- Keep navigation obvious
- Maintain comfortable spacing
- Keep important actions visible
- Use consistent button positions
- Use clear hierarchy

## Do Not

- Use tiny icon-only controls for important actions
- Hide important actions behind ambiguous menus
- Use hover-only interactions for essential functionality
- Use confusing layouts
- Use inconsistent colors or components
- Use misleading buttons
- Use excessively fancy typography
- Make the UI cluttered

Interactive targets should generally be at least 44px.

---

# Global Navigation

Create a reusable floating glass navigation component.

Typical navigation:

- Home
- Events
- Blog
- Gallery
- People
- About
- Donate
- Profile/Login

Use the supplied page images for exact visual direction.

The mobile navigation must remain simple and accessible.

---

# Roles and Permission-Aware UI

The backend enforces authorization. The frontend must accurately reflect permissions.

## Guest

Can:

- View Home
- View Events
- View Event Details
- View Blog
- View public Gallery
- Donate

Cannot:

- Comment
- Create posts
- Upload media
- Edit content

Show Login when authentication is required.

## Logged-in User

Can:

- Read content
- View People
- Comment on blog posts
- View galleries

Cannot:

- Create blogs
- Upload event media
- Edit organization content
- Perform admin actions

## Admin

There are two administrators.

Can:

- Create/edit/delete posts
- Manage events
- Upload media
- Manage gallery
- Moderate comments
- Manage people/content

**Create Post must only be visible to admins.**

---

# Major Pages

Implement these major screens:

1. Home
2. Events
3. Event Details
4. Blog Feed
5. Gallery
6. People
7. Login/Profile
8. Donate
9. Admin Dashboard

A separate traditional Blog Details page is intentionally not required.

Posts should expand inline or in a focused feed state.

---

# Reference Images

Reference images will be correctly named after their corresponding pages.

Examples:

- `home.png`
- `events.png`
- `event-details.png`
- `blog.png`
- `gallery.png`
- `people.png`
- `profile.png`
- `donate.png`
- `admin-dashboard.png`

Use the actual files available in the frontend project.

The screenshots are visual references only; do not build logic around screenshots.

---

# PAGE 1 — HOME

Use the Home reference image as the primary visual direction.

The Home page should communicate:

- Community
- Family togetherness
- Celebration
- Service
- Charity
- Preserving memories

Suggested structure:

1. Floating navigation
2. Hero section
3. About Bhandhavya
4. Community values
5. Featured events
6. Charity/service highlight
7. Community statistics
8. Memory preview
9. Donate CTA
10. Footer

Do not overcrowd the page.

Use subtle Rajasthani-inspired motifs only as background decoration.

---

# PAGE 2 — EVENTS

The Events page must have distinctive event face cards.

Do not use generic single-cover-image cards.

## Event Card Requirement

Each event card should use multiple event photos arranged as an elegant collage.

The composition should consider:

- Horizontal images
- Vertical images
- Square images
- Image aspect ratios
- Visual balance

The result should feel deliberate and curated, inspired by editorial/golden-ratio composition principles.

It must not look like a random tile grid.

Each event card should include:

- Photo collage
- Event title
- Date
- Location where relevant
- Short description
- Clear View Event action

---

# PAGE 3 — EVENT DETAILS

Design this as an immersive **event story and memory hub**.

## Hero

- Large photo composition
- Event title
- Date
- Location
- Category

## Main Content

- Event narrative
- Highlights
- Date
- Venue
- Organizer
- Category

## Gallery

Show photos belonging to the event.

## Comments

- Logged-in users can comment
- Guests see a clear Login to Comment action

The page should feel like a memory archive rather than a corporate listing.

---

# PAGE 4 — BLOG FEED

Use an interaction model strongly inspired by **X-style social feeds**, while keeping Bhandhavya's unique visual identity.

Do not copy X branding.

The intended combination is:

> X-like social-feed UX + Bhandhavya Floating Heritage Glass

## Desktop Layout

Use a familiar multi-column social feed where shown by the reference.

### Left Sidebar

Possible items:

- Feed
- For You
- Following
- Categories
- Saved
- My Activity

### Centre Feed

The main focus.

Include:

- Feed tabs
- Author information
- Timestamp
- Post text
- Event-related media
- Like/reaction
- Comment
- Share
- Save where appropriate

## Create Post

IMPORTANT:

- Only admins see Create Post/composer
- Normal users must not see creation controls
- Guests must not see creation controls

## No Traditional Blog Details Page

Posts should:

- Expand inline
- Reveal additional content in an expanded state
- Keep comments associated with the post

## Photo Click Behavior

IMPORTANT REQUIREMENT:

When a user clicks an image inside a blog post:

1. Navigate to the related event
2. Open the relevant event/gallery context
3. Visually highlight or flash the exact clicked image

Suggested route concept:

```text
/events/:eventId?highlightMedia=:mediaId
```

On arrival:

- Locate the selected media
- Scroll it into view where appropriate
- Apply a temporary highlight/flash animation
- Respect reduced-motion preferences

---

# PAGE 5 — GALLERY

This is a major custom UI requirement.

The gallery must NOT be:

- Random masonry
- Generic photo grid
- Standard mosaic

Instead, create a deliberate **Photo Cloud** based on the supplied reference sketch.

## Photo Cloud Concept

Photos should follow an intentional arrangement around a recognizable central cross-shaped structural/negative-space axis.

The composition should feel coordinated rather than random.

The layout engine should consider:

- Vertical photos
- Horizontal photos
- Square photos

## Requirements

The Photo Cloud must:

- Follow a repeatable pattern
- Maintain intentional spacing
- Use orientation-aware placement
- Preserve aspect ratio appropriately
- Feel balanced
- Avoid random positioning

Conceptually:

```text
                [ Horizontal ]

       [Horizontal]     [Vertical]

 [Square]       CROSS AXIS       [Horizontal]

       [Horizontal]     [Vertical]

                [Square]
```

The exact arrangement should closely follow the supplied reference image.

## Gallery Grouping

Group clouds by:

- Event
- Occasion
- Upload batch
- Date where useful

Each cloud should clearly identify its occasion.

## Interaction

Clicking a photo can:

- Open a larger preview
- Show metadata
- Navigate to the associated event

Maintain context so users understand where every photo belongs.

---

# PAGE 6 — PEOPLE

The People page should remain simple and friendly.

Use the People reference image as the main visual source.

Each person card should contain:

- Large round profile image
- Name
- Role/contribution badge where applicable
- Number of posts
- Number of events
- Membership duration where available
- View Profile action

Include:

- Search
- Basic filters
- Member count
- Optional sorting

Do not overcomplicate this screen.

---

# PAGE 7 — LOGIN / PROFILE

Keep this simple.

## Login

- Floating glass form
- Large inputs
- Clear labels
- Clear login button
- No unnecessary fields

## Profile

Show:

- Profile image
- Name
- Basic information
- Activity

Permission-sensitive controls must be accurate.

Admin-only controls must not appear for normal users.

---

# PAGE 8 — DONATE

Guests should be able to donate without authentication.

Create a warm, trustworthy donation experience.

Include:

- Why donations matter
- Organization/service information
- Suggested amounts
- Custom amount
- Clear payment CTA
- Trust/transparency information

Do not use misleading payment flows or dark patterns.

---

# PAGE 9 — ADMIN DASHBOARD

Only admins can access this route.

Maintain the same visual language but use a structured management layout.

Include:

- Overview statistics
- Recent activity
- Events management
- Blog management
- Media management
- Comment moderation
- People/users
- Storage information
- Quick actions

Quick actions may include:

- Create Event
- Create Post
- Upload Media

Use explicit labels for critical actions.

---

# Reusable Components

Create reusable components rather than duplicating UI.

Suggested structure:

```text
components/
├── layout/
│   ├── Navbar
│   ├── Footer
│   └── PageShell
├── ui/
│   ├── GlassCard
│   ├── GlassButton
│   ├── GlassPanel
│   ├── SearchInput
│   ├── SectionHeader
│   ├── Modal
│   └── EmptyState
├── events/
│   ├── EventCard
│   ├── EventPhotoCollage
│   └── EventMeta
├── blog/
│   ├── BlogPost
│   ├── CommentThread
│   ├── PostComposer
│   └── FeedTabs
├── gallery/
│   ├── PhotoCloud
│   ├── PhotoCloudEngine
│   └── PhotoPreview
├── people/
│   └── PersonCard
└── auth/
    └── ProtectedRoute
```

Adapt to the existing project structure where necessary.

---

# Suggested Routes

```text
/
/events
/events/:eventId
/blog
/gallery
/people
/profile
/login
/donate
/admin
```

Optional admin routes:

```text
/admin/events
/admin/blogs
/admin/gallery
/admin/comments
/admin/people
```

---

# Responsive Requirements

Desktop is the primary visual target.

However, the application must be genuinely mobile-friendly.

## Desktop

- Generous whitespace
- Floating layered composition
- Multi-column layouts where appropriate

## Tablet

- Reduce columns gradually
- Maintain readable spacing

## Mobile

- Stack intelligently
- Convert sidebars into accessible navigation
- Keep buttons large
- Keep text readable
- Do not simply shrink desktop layouts

---

# Animation Rules

Use subtle motion only.

Allowed:

- Gentle card lift
- Soft fades
- Small hover scale
- Elegant selected-image highlight flash

Avoid:

- Constant floating animations everywhere
- Excessive parallax
- Distracting motion
- Slow interactions

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

---

# Accessibility

Implement:

- Semantic HTML
- Keyboard-accessible controls
- Visible focus states
- Sufficient contrast
- Alt text
- Large click targets
- Clear form labels

Do not rely only on color for important information.

---

# Data and Backend Integration

Initially, use clean mock data where backend APIs are unavailable.

Expected entities:

```text
User
Event
BlogPost
Comment
Media
Donation
```

Keep API access separated from UI components.

Suggested structure:

```text
services/
├── api.js
├── events.js
├── blog.js
├── gallery.js
├── people.js
└── auth.js
```

The frontend should be easy to connect to the FastAPI backend.

---

# Final Quality Checklist

Verify:

- [ ] Visual consistency across pages
- [ ] Glass UI feels layered and floating
- [ ] Colors follow the Bhandhavya palette
- [ ] Typography is readable
- [ ] Important buttons are large
- [ ] Guest/User/Admin UI states are correct
- [ ] Create Post is admin-only
- [ ] Unauthorized write controls are hidden
- [ ] Blog image click navigates to the related event
- [ ] Selected image highlights/flashes after navigation
- [ ] Event cards use intelligent photo collages
- [ ] Gallery uses the intentional Photo Cloud pattern
- [ ] People page remains simple
- [ ] Layout works on desktop and mobile
- [ ] Components are reusable
- [ ] The result does not become a generic dashboard

---

# Final Instruction

The reference images and this document define the intended Bhandhavya frontend.

Prioritize:

1. Accurate visual implementation of supplied references
2. Consistency across all screens
3. Reusable component architecture
4. Older-user-friendly UX
5. Responsive behavior
6. Permission-aware UI

When generic implementation conventions conflict with Bhandhavya's specific visual requirements, preserve the **Floating Heritage Glass** design language.
