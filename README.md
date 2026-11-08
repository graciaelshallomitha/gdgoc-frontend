# GDGoC UGM – Open Recruitment (Front-End Task)

Responsive implementation of two pages from the GDGoC UGM Figma design, consuming the
[GDGoC UGM REST API](https://gdgoc-ugm-api.vercel.app/api).

- **Landing** (`/`): hero, about, learning tracks, formats, project feature, journey, values, FAQ, CTA
- **Contact** (`/contact`): inquiry categories, validated contact form, community updates, guidance

Live demo: https://gdgoc-frontend-red.vercel.app/ · Video Presentation: https://drive.google.com/file/d/1IjiTi11XodnraLUmxfDt-UgjptOH1w2W/view?usp=sharing 

## Tech stack

Next.js 15 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS 4 · native Fetch API · ESLint · Google Sans / Inter (self-hosted)

## Getting started

```bash
npm install
cp .env.example .env.local   # optional, defaults work
npm run dev                  # http://localhost:3000
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build / serve |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint (next/core-web-vitals + next/typescript) |

## Architecture

```
src/
├── app/(main)/        routes + shared layout (Navbar, Footer); loading / error / not-found
├── components/
│   ├── icons/         SVG icons exported from Figma
│   ├── layout/        Navbar (server) + NavbarView (client), Footer
│   ├── ui/            Button, TextLink, SectionHeading, FormField, Lines, Logo, state components
│   ├── landing/       one component per Landing section
│   └── contact/       ContactWorkspace (client) owns the selected category
├── content/           Landing copy taken from Figma
├── services/          gdgoc-api.ts (GET requests), contact.ts (submit adapter)
├── types/             TypeScript types for API responses
└── lib/               constants, link resolution, validators
```

### Which API data is used (and why)

The API was compared against the Figma content section by section. Only matching data is consumed:

| Endpoint | Used? | Where |
| --- | --- | --- |
| `/navigation` | Yes | Navbar, Footer (fallback links if the request fails) |
| `/stats` | Yes | Footer and Contact (Instagram handle, tagline) |
| `/inquiry-categories` | Yes | Contact cards + dropdown |
| `/tracks`, `/formats`, `/journey`, `/values`, `/faqs` | No | Their copy matches the Overview/About design, not the Landing design (different taglines, descriptions, 3 vs 4 items, 3 FAQs vs 7), so the Landing page uses Figma content in `src/content/landing.ts` |

### Data flow and state

- Server Components fetch data (`revalidate: 300`). Services return `{ ok, data } | { ok, error }` instead of
  throwing, so failures degrade gracefully (fallback nav links, error/empty state on Contact).
- Client Components only where interaction is needed: `NavbarView`, `FaqAccordion`, `ContactWorkspace`, `ContactForm`.
- No global state library. The selected contact category lives in `ContactWorkspace` and is shared by the
  category cards and the dropdown, so they cannot go out of sync.
- Contact form draft is persisted in `localStorage` (consent is never saved).

## Design tokens

Read from Figma: Google Sans (self-hosted via `@fontsource-variable/google-sans`), Inter Bold for step numbers,
primary button `#4284f4`, link/accent `#1967d2`, text `#242424` / `#5f6368`, border `#dadce0`.
Tokens and the type scale live in `src/app/globals.css`.

## Known limitations

- **Assets:** logo and illustrations are placeholders until exported from Figma. See `ASSETS.md`.
- **Contact submission:** the documented API has no POST endpoint, so the form validates and then reports honestly that
  nothing was sent. Set `NEXT_PUBLIC_CONTACT_ENDPOINT` when one exists.
- **YouTube icon:** the footer shows it as in Figma, but the API has no YouTube handle. Set `NEXT_PUBLIC_YOUTUBE_URL` to make it a link.
- **Navigation:** `/about` and `/overview` are not implemented, so they map to Landing anchors (`lib/links.ts`).
- **Mobile/tablet** are not in Figma (desktop frames only); breakpoints were designed here.

## Deployment

Import the repository in Vercel (framework preset: Next.js). No environment variables are required.