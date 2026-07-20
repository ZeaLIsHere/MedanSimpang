# UMS Umbrella Site — Multi-page + Hero + Real Content (Design Spec)

**Date:** 2026-07-10
**Status:** Approved (brainstorming), pending implementation plan
**Builds on:** `2026-07-10-urbanmorphsoc-landing-design.md` (branch `feat/urbanmorphsoc-landing`).

## Goal

Evolve the single-page UrbanMorphSoc landing into a small **multi-page umbrella site**
for **Urban Morphology and Society (UMS)** — a research cluster at Universitas Sumatera
Utara. Add real content, dedicated pages for Projects / Stories / About, and a large
background hero image on the landing. MedanSimpang (`/medansimpang`) stays untouched.

## Decisions (from brainstorming)

- **Brand placement:** Header wordmark = "Urban Morphology and Society" (full name, no
  "UMS" abbreviation). Hero display title = "UrbanMorphSoc" (stylized `Urban`**`Morph`**`Soc`)
  with "Urban Morphology and Society" as the subtitle. Drop the old "Seeing cities at eye
  level" tagline.
- **Multi-page:** the umbrella nav points to real pages, not in-page anchors.
- **Language:** umbrella pages keep the shared ID/EN toggle. UI labels, headings, CTAs, and
  short intro copy are bilingual. The **official UMS description paragraph is English-only**
  (shown regardless of toggle), as provided.
- **Hero:** `public/images/frontpage.png` as a large background image occupying ~50vh at the
  top of the landing (smog.chalmers.se style) with a subtle dark overlay for text legibility;
  title + subtitle + CTA overlaid; content flows below on the cream background.
- **Stories:** curated — introduces stories and links to `/medansimpang/cerita` (no umbrella
  stories exist yet).
- **People photos:** none exist yet; render photo-ready cards with initials-avatars now.
  Student names are TBD (user will provide); render a placeholder students subsection.

## Routes (umbrella, at root; `/medansimpang` unchanged)

- `/` — **Landing**: hero (frontpage.png bg + CTA "Lihat Project" → `/projects`), short UMS
  intro, and 3 teaser cards linking to Projects / Stories / About.
- `/projects` — MedanSimpang card (→ `/medansimpang`) + "more coming soon".
- `/stories` — intro + card(s) linking to `/medansimpang/cerita`.
- `/about` — full UMS content: description, establishment note, address, email, and People.

Route paths are English and language-agnostic; nav labels are bilingual.

## File structure

Use a Next.js **route group** `(site)` so all umbrella pages share one layout (header +
footer) while keeping URLs at root. `/medansimpang` stays outside the group.

```
src/app/
  layout.tsx              # root: <html>/<body>, fonts, LanguageProvider, site metadata (unchanged)
  (site)/
    layout.tsx            # renders <SiteHeader/> {children} <SiteFooter/>
    page.tsx              # / landing (replaces old src/app/page.tsx)
    projects/page.tsx     # /projects
    stories/page.tsx      # /stories
    about/page.tsx        # /about
  medansimpang/ ...       # untouched
  globals.css robots.ts sitemap.ts favicon.ico icon.png
src/components/site/
  SiteHeader.tsx          # replaces components/landing/LandingHeader.tsx (page links + toggle)
  SiteFooter.tsx          # replaces components/landing/LandingFooter.tsx (address, email, links)
src/data/ums.ts           # UMS content: intro (bilingual), description (EN), address, people
```

The old `src/components/landing/` and old `src/app/page.tsx` are superseded by the above and
removed.

## Components

### SiteHeader (`src/components/site/SiteHeader.tsx`)
- Fixed, white/blur (same behavior as the current LandingHeader).
- Wordmark (left, links to `/`): "Urban Morphology and Society" (serif; responsive size so it
  fits — smaller on mobile).
- Nav (right): `Home · Projects · Stories · About` as `next/link` page links; active-route
  styling (sage underline). Bilingual labels via `useLanguage()`.
- ID/EN toggle button (Globe icon), shared context. Mobile hamburger.

### SiteFooter (`src/components/site/SiteFooter.tsx`)
- Dark `accent` background (like MedanSimpang footer).
- Columns: brand + short mission; quick links (Home/Projects/Stories/About); contact block =
  UMS address + `urbanmorphsoc@gmail.com`.
- `© 2026 Urban Morphology and Society`.

### (site)/layout.tsx
Client or server wrapper rendering `<SiteHeader/>`, `<main>{children}</main>`, `<SiteFooter/>`.
(Header/Footer are client components; the layout itself can be a server component rendering
them.)

## Page content

### Landing `/`
- **Hero** (~50vh): `frontpage.png` via `next/image` `fill` `object-cover` in an absolutely
  positioned layer; gradient/overlay `div` above it; overlaid content: `UrbanMorphSoc` (big,
  stylized, white), subtitle "Urban Morphology and Society", and CTA button **"Lihat Project" /
  "View Projects"** → `/projects`.
- **Intro**: the first UMS description paragraph (English) plus a bilingual one-line lead-in.
- **Teaser cards**: 3 cards → Projects, Stories, About with short bilingual blurbs.

### Projects `/projects`
- Heading + one MedanSimpang card (cover `/images/silalas.jpg`, → `/medansimpang`) + italic
  "more projects coming soon" (bilingual).

### Stories `/stories`
- Heading + bilingual intro + a card/CTA → `/medansimpang/cerita` ("Read our city stories").

### About `/about`
- Heading "Urban Morphology and Society".
- **Description** (English, from `ums.ts`): the full provided paragraph.
- **Establishment**: "Officially established by Rector of Universitas Sumatera Utara decree
  No. 4921/UN5.1.R/SK/PPM/2023, 28 December 2023." (bilingual label, static fact).
- **Address block**: Department of Architecture, Universitas Sumatera Utara, Indonesia · Jalan
  Perpustakaan Kampus USU Padang Bulan · Medan, Indonesia 20155 · Email urbanmorphsoc@gmail.com.
- **People**: `Head` = Dr. Salmina Wati Ginting; `Members` = Dr. Ulrike Herbig, Dr. Isnen
  Fitri, Dr. Wahyuni Zahrah, Dr. Lim Seng Boon, Dr. Norhazlan Haron, Sri Elfina Panjaitan,
  Ryandika Afdila, Nurrahmadayeni. Rendered as photo-ready cards with initials-avatars.
  `Students` subsection: placeholder note ("names to be added") — user will provide names/photos.

## Data (`src/data/ums.ts`)

```ts
export const umsDescription = `Urban Morphology and Society (UMS) is a research cluster ...`; // full EN text
export const umsEstablishment = { decree: '4921/UN5.1.R/SK/PPM/2023', date: '28 December 2023' };
export const umsAddress = {
  dept: 'Department of Architecture, Universitas Sumatera Utara, Indonesia',
  street: 'Jalan Perpustakaan Kampus USU Padang Bulan',
  city: 'Medan, Indonesia 20155',
  email: 'urbanmorphsoc@gmail.com',
};
export const umsHead = { name: 'Dr. Salmina Wati Ginting', photo: null };
export const umsMembers = [ /* {name, photo:null} for the 8 members */ ];
export const umsStudents = []; // TBD — user will provide
```

Photos are optional (`photo: string | null`); cards fall back to an initials avatar when null.

## Sitemap / metadata

- `sitemap.ts`: add root-domain entries for `/projects/`, `/stories/`, `/about/`.
- Each umbrella page sets a `metadata` export (title/description) where it's a server
  component; client pages inherit the root metadata (acceptable).

## Verification

- `npm run build` succeeds; `out/{index,projects/index,stories/index,about/index}.html` exist.
- Landing shows the hero image; CTA → `/projects`; nav links resolve to the four pages;
  toggle flips UI labels; `/medansimpang` and its routes still work.
- Grep audit: no bare-root MedanSimpang links reintroduced; teaser/Stories links point to
  `/medansimpang/...`.

## Out of scope (YAGNI)

- No CMS, no per-person detail pages, no student data yet (placeholder), no photo upload flow.
- No new project beyond MedanSimpang.
- Official UMS description is not translated to ID (English-only, as provided).
