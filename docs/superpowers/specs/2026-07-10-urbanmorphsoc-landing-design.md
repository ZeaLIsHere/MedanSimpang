# UrbanMorphSoc Landing Page — Design Spec

**Date:** 2026-07-10
**Status:** Approved (brainstorming), pending implementation plan

## Goal

`urbanmorphsoc.com` is an umbrella brand that will host several projects over time.
Today only **MedanSimpang** exists (served at `/medansimpang`). We want the root
domain (`/`) to show a proper **landing page** for UrbanMorphSoc — with Projects,
Stories, About, and a footer — that must also be viewable locally via a single
`npm run dev` at `http://localhost:3000/`.

## Chosen approach: integrate into the existing Next app (remove basePath)

The MedanSimpang app currently uses `basePath: '/medansimpang'` with `output: 'export'`.
`basePath` is app-wide, so a root landing page cannot coexist with it. We therefore:

- Remove `basePath`, make the app root `/` the **landing page**.
- Move the entire MedanSimpang app under a `/medansimpang` route subtree.
- Serve both from one `npm run dev` and one static export deployed to `public_html/` root.

Rejected alternatives:
- **Static HTML in `deploy/public_html-root/`** — cannot be previewed via `npm run dev`
  (root stays 404 because of basePath); no component/token reuse.
- **Separate Next project** — a second build/repo to maintain; overkill while only one
  project exists.

### Benefit of integration

The landing becomes a real React page that reuses `LanguageContext`, the color/font
design tokens, and `lucide-react`. The ID/EN toggle **shares state** with MedanSimpang,
so language is consistent across the whole site. This is cleaner than the earlier
static-HTML + inline-JS idea.

## Brand

- **Name:** UrbanMorphSoc
- **Tagline:** "Seeing cities at eye level" (echoes MedanSimpang's "Seen at eye level")
- **Positioning:** a home for urban projects — heritage walks, research, city stories.

## Design tokens (reuse MedanSimpang exactly)

- Background cream `#FDFBF7`, foreground charcoal `#1F2937`
- accent `#264653`, primary/gold `#DDA15E`, gold-strong `#8a5a12`, gold-light `#ecc07f`
- secondary/sage `#2A9D8F`, bone `#F4F1DE`
- Headings: Playfair Display (serif). Body: Outfit (sans).
- Cards `rounded-2xl`, soft shadows, sage underline-on-hover for nav links.

## File structure after refactor

```
src/app/
  layout.tsx          # root: <html>/<body>, fonts, LanguageProvider, UrbanMorphSoc site metadata
  page.tsx            # ★ LANDING (new, client component)
  globals.css
  robots.ts           # sitemap at root
  sitemap.ts          # landing root entry + all /medansimpang/* entries
  medansimpang/       # ← entire MedanSimpang app moves here
    layout.tsx        #   MedanSimpang-specific metadata (moved out of root layout)
    page.tsx          #   (from old src/app/page.tsx)
    cerita/  kawasan/  walks/  tentang/   # moved as-is
src/components/landing/   # ★ landing-only components (header, footer, sections)
```

MedanSimpang's own `src/components/layout/{Header,Footer}.tsx` stay MedanSimpang-specific
and are untouched except for link prefixing (below). The landing gets its **own** header
and footer under `src/components/landing/`.

## Core changes (mechanical, verifiable)

1. **`next.config.ts`**
   - Remove `basePath` and `env.NEXT_PUBLIC_BASE_PATH`.
   - Keep `output: 'export'`, `trailingSlash: true`, and the custom image loader
     (it becomes a passthrough once `BASE_PATH` is empty — `src/image-loader.ts` and
     `src/lib/paths.ts` already default `BASE_PATH` to `''`, so no code change needed there;
     assets in `public/` are served at root `/images/...`, consistent across landing and app).

2. **Move routes** — all MedanSimpang route folders move into `src/app/medansimpang/`.

3. **Prefix internal links with `/medansimpang`** — ~26 root-relative `href`s across 9 files
   (`Header`, `Footer`, `Card`, `Breadcrumbs`, the detail clients, and `MedanMap` popup
   `linkUrl`s built inline like `/kawasan/${slug}`). MedanSimpang's logo/home link →
   `/medansimpang`. Add a subtle "← UrbanMorphSoc" link in the MedanSimpang header/footer
   back to `/`. Re-audit with grep after editing so nothing is missed.

4. **`sitemap.ts`** — add the landing root entry (`https://urbanmorphsoc.com/`) and keep the
   existing `/medansimpang/*` entries (the `BASE_URL` constant already points at
   `.../medansimpang`).

5. **`robots.ts`** — sitemap URL at root (`https://urbanmorphsoc.com/sitemap.xml`).

6. **Metadata split** — root `layout.tsx` carries UrbanMorphSoc site metadata
   (`metadataBase: https://urbanmorphsoc.com`); MedanSimpang metadata moves to
   `medansimpang/layout.tsx`.

## Landing page content (single page, anchor navigation)

- **Header** (fixed, white + blur): `UrbanMorphSoc` wordmark left; nav right
  `Projects · Stories · About` (anchor scroll) + `ID/EN` toggle; hamburger on mobile.
- **Hero**: large Playfair headline, tagline "Seeing cities at eye level", short bilingual
  intro, CTA button → `/medansimpang`. Cream background.
- **Projects**: one large MedanSimpang card (cover image + title + tagline + "Explore →" →
  `/medansimpang`), styled like MedanSimpang cards, plus a subtle "More projects coming soon".
- **Stories**: heading + blurb + CTA "Read our city stories →" → `/medansimpang/cerita`.
- **About**: heading + UrbanMorphSoc mission (bilingual, editable copy) + 3 value pillars
  with icons.
- **Footer** (dark accent bg like MedanSimpang): wordmark + mission, quick links, contact
  `urbanmorphsoc@gmail.com`, social icons, `© 2026 UrbanMorphSoc`. **No** fake newsletter form.

All landing text has ID and EN variants driven by the shared `useLanguage()` (default ID).

## Deploy (changes)

`npm run build` now exports `out/` containing both `index.html` (landing) and `medansimpang/`
(the app). **Deploy the entire contents of `out/` to `public_html/` root.**

- **`deploy/public_html-root/`** (old root→/medansimpang redirect `.htaccess` + `index.html`)
  becomes obsolete → **remove it**.
- **`public/.htaccess`** (compression, caching, security headers) is now copied to the export
  root and governs the whole site — keep it, but change the last line:
  `ErrorDocument 404 /medansimpang/404.html` → `ErrorDocument 404 /404.html`
  (after removing basePath, the export puts the 404 page at `out/404.html`, served at `/404.html`).
- Update `deploy/README.md` to describe the new single-deploy-to-root model.

## Verification

After the refactor:
- `npm run dev` → `/` shows the landing; click through `/medansimpang` and its
  kawasan / walks / cerita / tentang routes (nav, cards, breadcrumbs, map popups).
- `grep` audit: no remaining root-relative MedanSimpang `href`s that should be prefixed.
- `npm run build` succeeds and `out/` contains `index.html` + `medansimpang/`.
- Language toggle switches ID/EN across landing and app.

## Out of scope (YAGNI)

- No CMS, no newsletter backend.
- No multi-project grid (one MedanSimpang card for now).
- No separate About/Stories pages (single-page anchors).
