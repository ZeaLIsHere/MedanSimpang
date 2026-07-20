# UrbanMorphSoc Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a root-domain (`/`) landing page for the UrbanMorphSoc umbrella brand (Projects / Stories / About / footer) by integrating it into the existing MedanSimpang Next app.

**Architecture:** Remove the app-wide `basePath: '/medansimpang'`, make the app root `/` the landing page, and move the entire MedanSimpang app under a `/medansimpang` route subtree. Both are served from one `npm run dev` and one static export deployed to `public_html/` root. The landing reuses the existing design tokens, `LanguageContext`, and `lucide-react`.

**Tech Stack:** Next.js 16 (App Router, `output: 'export'`), React 19, Tailwind CSS v4, `lucide-react`, Playfair Display + Outfit fonts.

## Global Constraints

- No test framework exists in this repo. The per-task verification gate is **`npm run build`** (which type-checks and produces `out/`), plus **grep audits** and **`npm run dev` smoke checks**. Do not add a test framework.
- Design tokens (Tailwind theme, defined in `src/app/globals.css`): background `#FDFBF7`, foreground `#1F2937`, `accent #264653`, `primary #DDA15E`, `primary-strong #8a5a12`, `primary-light #ecc07f`, `secondary #2A9D8F`, `bone #F4F1DE`. Headings use `font-serif` (Playfair Display); body uses `font-sans` (Outfit).
- Brand name: **UrbanMorphSoc**. Tagline: **"Seeing cities at eye level"**. Contact email: **urbanmorphsoc@gmail.com**.
- All MedanSimpang internal route links must be prefixed with `/medansimpang`. Asset paths (`/images/...`) must NOT be prefixed — `public/` is served at root.
- Landing copy is bilingual (ID default / EN) driven by the shared `useLanguage()` hook from `src/context/LanguageContext.tsx`.
- Commit after each task. Work happens on the existing branch `feat/urbanmorphsoc-landing`.

---

### Task 1: Remove `basePath` from Next config

**Files:**
- Modify: `next.config.ts`

**Interfaces:**
- Produces: an app served at root `/` with no basePath; `NEXT_PUBLIC_BASE_PATH` unset so `src/lib/paths.ts` and `src/image-loader.ts` (both default `BASE_PATH` to `''`) become passthrough. No code change needed in those two files.

- [ ] **Step 1: Edit `next.config.ts`**

Replace the entire file with:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true, // export folder/index.html agar cocok dgn URL bertrailing-slash (fix 403 di hosting statis)
  images: {
    // Custom loader agar next/image bekerja saat static export (unoptimized passthrough).
    loader: 'custom',
    loaderFile: './src/image-loader.ts',
  },
};

export default nextConfig;
```

- [ ] **Step 2: Verify the build passes**

Run: `npm run build`
Expected: build succeeds, `out/` is generated. (At this checkpoint MedanSimpang temporarily serves at `/` — this is fixed in Task 2.)

- [ ] **Step 3: Commit**

```bash
git add next.config.ts
git commit -m "refactor(config): remove /medansimpang basePath"
```

---

### Task 2: Move MedanSimpang routes under `/medansimpang` and split metadata

**Files:**
- Move: `src/app/page.tsx` → `src/app/medansimpang/page.tsx`
- Move: `src/app/cerita/` → `src/app/medansimpang/cerita/`
- Move: `src/app/kawasan/` → `src/app/medansimpang/kawasan/`
- Move: `src/app/walks/` → `src/app/medansimpang/walks/`
- Move: `src/app/tentang/` → `src/app/medansimpang/tentang/`
- Create: `src/app/medansimpang/layout.tsx`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: root `src/app/layout.tsx` still provides `<html>/<body>`, fonts, and `LanguageProvider` for the whole app (landing + MedanSimpang).
- Produces: MedanSimpang home at route `/medansimpang`; MedanSimpang metadata lives in `src/app/medansimpang/layout.tsx`. (Internal nav links are still root-relative and will 404 until Task 3 — expected intermediate state.)

- [ ] **Step 1: Move the route folders/files with git**

```bash
mkdir -p src/app/medansimpang
git mv src/app/page.tsx src/app/medansimpang/page.tsx
git mv src/app/cerita src/app/medansimpang/cerita
git mv src/app/kawasan src/app/medansimpang/kawasan
git mv src/app/walks src/app/medansimpang/walks
git mv src/app/tentang src/app/medansimpang/tentang
```

(Leave `src/app/{layout.tsx,globals.css,favicon.ico,icon.png,robots.ts,sitemap.ts}` at the root — they are site-wide.)

- [ ] **Step 2: Create `src/app/medansimpang/layout.tsx` with the MedanSimpang metadata**

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medan Simpang — Seen at eye level",
  description: "Platform city-guide & heritage-walk mandiri di Kota Medan. Jelajahi gang-gang kecil, sejarah, kuliner, dan arsitektur bersejarah dari level mata.",
  metadataBase: new URL("https://urbanmorphsoc.com/medansimpang"),
  openGraph: {
    title: "Medan Simpang — Seen at eye level",
    description: "Jelajahi Kota Medan dari level mata, selangkah demi selangkah.",
    url: "https://urbanmorphsoc.com/medansimpang",
    siteName: "Medan Simpang",
    locale: "id_ID",
    type: "website",
  },
};

export default function MedanSimpangLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
```

- [ ] **Step 3: Update the root layout metadata to UrbanMorphSoc**

In `src/app/layout.tsx`, replace the `metadata` export (currently the MedanSimpang metadata block, lines ~18-30) with:

```tsx
export const metadata: Metadata = {
  title: "UrbanMorphSoc — Seeing cities at eye level",
  description: "UrbanMorphSoc adalah wadah bagi project-project urban: heritage walk, riset, dan cerita kota. Melihat kota dari level mata.",
  metadataBase: new URL("https://urbanmorphsoc.com"),
  openGraph: {
    title: "UrbanMorphSoc — Seeing cities at eye level",
    description: "Wadah project-project urban: heritage walk, riset, dan cerita kota.",
    url: "https://urbanmorphsoc.com",
    siteName: "UrbanMorphSoc",
    locale: "id_ID",
    type: "website",
  },
};
```

Leave the rest of `src/app/layout.tsx` (fonts, `<html>/<body>`, `LanguageProvider`) unchanged.

- [ ] **Step 4: Verify the build passes**

Run: `npm run build`
Expected: build succeeds. `out/medansimpang/index.html` exists. Visiting `/` now 404s (no root page yet — fixed in Task 4); `/medansimpang` renders but its nav links are broken (fixed in Task 3).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "refactor(routes): move MedanSimpang app under /medansimpang, split metadata"
```

---

### Task 3: Prefix all MedanSimpang internal route links with `/medansimpang`

**Files (all under `src/`):**
- Modify: `src/components/layout/Header.tsx`
- Modify: `src/components/layout/Footer.tsx`
- Modify: `src/components/ui/Card.tsx`
- Modify: `src/components/ui/Breadcrumbs.tsx`
- Modify: `src/app/medansimpang/page.tsx`
- Modify: `src/app/medansimpang/cerita/page.tsx`
- Modify: `src/app/medansimpang/cerita/[slug]/CeritaDetailClient.tsx`
- Modify: `src/app/medansimpang/kawasan/[slug]/KawasanDetailClient.tsx`
- Modify: `src/app/medansimpang/walks/[walkSlug]/WalkDetailClient.tsx`
- Modify: `src/app/medansimpang/walks/[walkSlug]/lokasi/[locationSlug]/LocationDetailClient.tsx`

**Interfaces:**
- Consumes: routes now live under `/medansimpang/*`.
- Produces: every in-app `Link` / `router.push` / breadcrumb / map-popup target resolves under `/medansimpang`. Asset helper `assetPath()` and `next/image` targets (`/images/...`) are left untouched.

**Rule:** For each string below, prepend `/medansimpang`. Do NOT touch external URLs (`https://…`, `mailto:`), `assetPath(...)` image calls, or `/images/...` paths.

- [ ] **Step 1: `src/components/layout/Header.tsx`**

Apply these exact replacements:

- `aboutSubLinks` paths: `'/tentang/visi'` → `'/medansimpang/tentang/visi'`; `'/tentang/mitra'` → `'/medansimpang/tentang/mitra'`; `'/tentang/tim'` → `'/medansimpang/tentang/tim'`; `'/tentang/perjalanan'` → `'/medansimpang/tentang/perjalanan'`; `'/tentang/metodologi'` → `'/medansimpang/tentang/metodologi'`.
- Logo link `href="/"` → `href="/medansimpang"`.
- `href={`/kawasan/${kawasan.slug}`}` → `href={`/medansimpang/kawasan/${kawasan.slug}`}` (both desktop line ~126 and mobile line ~273).
- `href="/cerita"` → `href="/medansimpang/cerita"` (both line ~155 and ~300).
- `href={`/cerita?kategori=${encodeURIComponent(cat.toLowerCase())}`}` → `href={`/medansimpang/cerita?kategori=${encodeURIComponent(cat.toLowerCase())}`}` (both line ~164 and ~309).
- The two `href="/tentang/metodologi"` Academy links (line ~177 and ~323) → `href="/medansimpang/tentang/metodologi"`.

(The `href={link.path}` lines already resolve to the prefixed `aboutSubLinks` values — no change.)

- [ ] **Step 2: `src/components/layout/Footer.tsx`**

- `aboutSubLinks` paths (lines ~45-51): same five `/tentang/*` → `/medansimpang/tentang/*` replacements as Header.
- Logo link `href="/"` → `href="/medansimpang"` (line ~60).
- `href={`/kawasan/${k.slug}`}` → `href={`/medansimpang/kawasan/${k.slug}`}` (line ~109).
- Leave `mailto:` and social `https://` links unchanged.

- [ ] **Step 3: `src/components/ui/Card.tsx`**

- `href={`/kawasan/${kawasan.slug}`}` → `href={`/medansimpang/kawasan/${kawasan.slug}`}` (line ~19).
- `href={`/walks/${walk.slug}`}` → `href={`/medansimpang/walks/${walk.slug}`}` (line ~64).
- `href={`/cerita/${cerita.slug}`}` → `href={`/medansimpang/cerita/${cerita.slug}`}` (line ~103).

- [ ] **Step 4: `src/components/ui/Breadcrumbs.tsx`**

- Home crumb `href="/"` → `href="/medansimpang"` (line ~25). (`item.path` values come from callers and are prefixed in later steps.)

- [ ] **Step 5: `src/app/medansimpang/page.tsx`**

- Map pin `linkUrl: `/kawasan/${k.slug}`` → `linkUrl: `/medansimpang/kawasan/${k.slug}`` (line ~46).

- [ ] **Step 6: `src/app/medansimpang/cerita/page.tsx`**

- `href={`/cerita/${featuredStory.slug}`}` → `href={`/medansimpang/cerita/${featuredStory.slug}`}` (line ~211).

- [ ] **Step 7: `src/app/medansimpang/cerita/[slug]/CeritaDetailClient.tsx`**

- Breadcrumb item `path: '/cerita'` → `path: '/medansimpang/cerita'` (line ~48).
- Back link `href="/cerita"` → `href="/medansimpang/cerita"` (line ~26).
- `href={`/cerita/${relStory.slug}`}` → `href={`/medansimpang/cerita/${relStory.slug}`}` (line ~138).

- [ ] **Step 8: `src/app/medansimpang/kawasan/[slug]/KawasanDetailClient.tsx`**

- Back link `href="/"` → `href="/medansimpang"` (line ~41).
- Map pin `linkUrl: `/walks/${walk.slug}`` → `linkUrl: `/medansimpang/walks/${walk.slug}`` (line ~71).

- [ ] **Step 9: `src/app/medansimpang/walks/[walkSlug]/WalkDetailClient.tsx`**

- Back link `href="/"` → `href="/medansimpang"` (line ~42).
- Breadcrumb `path: `/kawasan/${walk.neighbourhoodSlug}`` → `path: `/medansimpang/kawasan/${walk.neighbourhoodSlug}`` (line ~68).
- Map pin `linkUrl: `/walks/${walkSlug}/lokasi/${loc.slug}`` → `linkUrl: `/medansimpang/walks/${walkSlug}/lokasi/${loc.slug}`` (line ~101).
- `href={`/kawasan/${walk.neighbourhoodSlug}`}` → `href={`/medansimpang/kawasan/${walk.neighbourhoodSlug}`}` (line ~130).
- `href={`/walks/${walkSlug}/lokasi/${loc.slug}`}` → `href={`/medansimpang/walks/${walkSlug}/lokasi/${loc.slug}`}` (line ~281).
- `href={`/walks/${nWalk.slug}`}` → `href={`/medansimpang/walks/${nWalk.slug}`}` (line ~352).
- Leave `href={assetPath(walk.downloadableMapImage)}` (line ~324) unchanged (asset).

- [ ] **Step 10: `src/app/medansimpang/walks/[walkSlug]/lokasi/[locationSlug]/LocationDetailClient.tsx`**

- Back link `href="/"` → `href="/medansimpang"` (line ~30).
- `href={`/walks/${walkSlug}`}` → `href={`/medansimpang/walks/${walkSlug}`}` (line ~85).
- `href={`/walks/${walkSlug}/lokasi/${nextLocation.slug}`}` → `href={`/medansimpang/walks/${walkSlug}/lokasi/${nextLocation.slug}`}` (line ~284).
- Leave `googleMapsUrl`, `appleMapsUrl`, `websiteUrl` (external) unchanged.

- [ ] **Step 11: Audit — no stray root-relative MedanSimpang links remain**

Run:
```bash
grep -rnE "href=[\"'\`]/(kawasan|cerita|walks|tentang)" src
grep -rnE "linkUrl: \`/(kawasan|walks|cerita)" src
grep -rnE "path: ['\"\`]/(kawasan|cerita|walks|tentang)" src
```
Expected: **no matches** (every hit should now start with `/medansimpang`). Also confirm no remaining `href="/"` inside MedanSimpang files (the only legitimate `href="/"` will be the new landing components added in Task 4):
```bash
grep -rn 'href="/"' src/app/medansimpang src/components
```
Expected: no matches.

- [ ] **Step 12: Verify build + dev smoke test**

Run: `npm run build` → succeeds.
Run: `npm run dev`, open `http://localhost:3000/medansimpang`, and click through: a kawasan card → walk → location; the Cerita list → a story; a Tentang page; a map popup ("Explore" button). All should navigate under `/medansimpang/...` with no 404.

- [ ] **Step 13: Commit**

```bash
git add -A
git commit -m "refactor(links): prefix MedanSimpang internal routes with /medansimpang"
```

---

### Task 4: Build the landing page at `/`

**Files:**
- Create: `src/components/landing/LandingHeader.tsx`
- Create: `src/components/landing/LandingFooter.tsx`
- Create: `src/app/page.tsx`

**Interfaces:**
- Consumes: `useLanguage()` from `src/context/LanguageContext.tsx` (returns `{ language: 'id' | 'en', setLanguage }`), provided by the root layout. `next/link`, `next/image`, `lucide-react`.
- Produces: the site landing page at `/`, with anchor sections `#projects`, `#stories`, `#about`, CTAs linking to `/medansimpang` and `/medansimpang/cerita`.

- [ ] **Step 1: Create `src/components/landing/LandingHeader.tsx`**

```tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const NAV = [
  { id: 'projects', id_label: 'Projects', en_label: 'Projects' },
  { id: 'stories', id_label: 'Cerita', en_label: 'Stories' },
  { id: 'about', id_label: 'Tentang', en_label: 'About' },
];

export default function LandingHeader() {
  const { language, setLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleLang = () => setLanguage(language === 'id' ? 'en' : 'id');

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-bone/45 py-3'
          : 'bg-white/80 backdrop-blur-sm py-4'
      }`}
    >
      <div className="w-full px-6 lg:px-12">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="font-serif text-2xl font-black tracking-tight text-accent">
            Urban<span className="text-primary-strong">Morph</span>Soc
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="relative text-sm font-semibold text-accent hover:text-secondary transition-colors py-2 after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:w-0 after:bg-secondary after:transition-all after:duration-300 hover:after:w-full hover:after:left-0"
              >
                {language === 'id' ? n.id_label : n.en_label}
              </a>
            ))}
            <button
              onClick={toggleLang}
              className="flex items-center rounded-lg border border-bone px-3 py-1.5 text-xs font-bold text-accent hover:bg-bone/30 transition-colors uppercase tracking-wider"
            >
              <Globe className="mr-1.5 h-3.5 w-3.5 text-secondary" />
              {language === 'id' ? 'EN' : 'ID'}
            </button>
          </nav>

          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={toggleLang}
              className="flex items-center rounded-lg border border-bone px-2 py-1 text-xs font-bold text-accent hover:bg-bone/30 transition-colors uppercase tracking-wider"
            >
              {language === 'id' ? 'EN' : 'ID'}
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-accent hover:bg-bone/40"
              aria-expanded={open}
            >
              <span className="sr-only">Menu</span>
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden absolute top-[70px] left-0 right-0 bg-white border-b border-bone/60 shadow-lg animate-fade-in">
          <div className="px-6 py-4 space-y-1">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => setOpen(false)}
                className="block py-2 text-base font-bold text-accent hover:text-secondary"
              >
                {language === 'id' ? n.id_label : n.en_label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 2: Create `src/components/landing/LandingFooter.tsx`**

```tsx
'use client';

import React from 'react';
import { Mail, Instagram, Facebook, Youtube } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function LandingFooter() {
  const { language } = useLanguage();

  const t = {
    mission: language === 'id'
      ? 'Wadah bagi project-project urban — heritage walk, riset, dan cerita kota. Melihat kota dari level mata.'
      : 'A home for urban projects — heritage walks, research, and city stories. Seeing cities at eye level.',
    links: language === 'id' ? 'Tautan' : 'Links',
    contact: language === 'id' ? 'Kontak' : 'Contact',
  };

  const nav = [
    { id: 'projects', label: 'Projects' },
    { id: 'stories', label: language === 'id' ? 'Cerita' : 'Stories' },
    { id: 'about', label: language === 'id' ? 'Tentang' : 'About' },
  ];

  return (
    <footer className="bg-accent text-white border-t border-bone/10">
      <div className="w-full px-6 py-12 lg:px-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 pb-8 border-b border-bone/10">
          <div className="space-y-4">
            <p className="font-serif text-2xl font-black tracking-tight">
              Urban<span className="text-primary-light">Morph</span>Soc
            </p>
            <p className="text-sm font-light text-gray-300 leading-relaxed max-w-xs">
              {t.mission}
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://instagram.com/urbanmorphsoc" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-light transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://facebook.com/urbanmorphsoc" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-light transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://youtube.com/@urbanmorphsoc" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-light transition-colors" aria-label="YouTube">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg font-bold text-primary-light mb-4">{t.links}</h4>
            <ul className="space-y-2 text-sm font-light text-gray-300">
              {nav.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="hover:text-primary-light transition-colors">{n.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-bold text-primary-light mb-4">{t.contact}</h4>
            <a href="mailto:urbanmorphsoc@gmail.com" className="flex items-center text-sm font-light text-gray-300 hover:text-primary-light transition-colors">
              <Mail className="mr-2 h-4 w-4 text-primary-light" />
              urbanmorphsoc@gmail.com
            </a>
          </div>
        </div>

        <div className="mt-8 text-xs font-light text-gray-400">
          <p>© 2026 UrbanMorphSoc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Create `src/app/page.tsx` (the landing)**

```tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Eye, Map, BookOpen } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import LandingHeader from '@/components/landing/LandingHeader';
import LandingFooter from '@/components/landing/LandingFooter';

export default function Landing() {
  const { language } = useLanguage();
  const id = language === 'id';

  const pillars = [
    {
      icon: <Eye className="h-6 w-6 text-secondary" />,
      title: id ? 'Level Mata' : 'Eye Level',
      body: id
        ? 'Kami membaca kota dari sudut pandang pejalan kaki — ruang, jalan, dan kehidupan sehari-hari.'
        : 'We read the city from the pedestrian’s view — its spaces, streets, and everyday life.',
    },
    {
      icon: <Map className="h-6 w-6 text-secondary" />,
      title: id ? 'Riset Ruang' : 'Spatial Research',
      body: id
        ? 'Mendokumentasikan bentuk dan morfologi kawasan urban lewat pemetaan dan penelusuran lapangan.'
        : 'Documenting the form and morphology of urban areas through mapping and fieldwork.',
    },
    {
      icon: <BookOpen className="h-6 w-6 text-secondary" />,
      title: id ? 'Cerita Kota' : 'City Stories',
      body: id
        ? 'Menceritakan sejarah, budaya, dan warga di balik setiap simpang dan gang.'
        : 'Telling the history, culture, and people behind every intersection and alley.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <LandingHeader />

      <main className="flex-grow">
        {/* Hero */}
        <section className="pt-36 pb-20 lg:pt-44 lg:pb-28">
          <div className="w-full px-6 lg:px-12 max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-widest text-primary-strong mb-4">
              {id ? 'Kolektif Urban' : 'Urban Collective'}
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-black text-accent tracking-tight leading-none">
              Urban<span className="text-primary-strong">Morph</span>Soc
            </h1>
            <p className="mt-6 text-xl sm:text-2xl font-bold text-secondary">
              Seeing cities at eye level
            </p>
            <p className="mt-6 text-base sm:text-lg font-medium text-accent/90 leading-relaxed max-w-2xl">
              {id
                ? 'UrbanMorphSoc adalah wadah bagi project-project yang menjelajahi kota — dari heritage walk hingga riset ruang dan cerita warga. Setiap project mengajak Anda melihat kota lebih dekat.'
                : 'UrbanMorphSoc is a home for projects that explore the city — from heritage walks to spatial research and residents’ stories. Each project invites you to see the city up close.'}
            </p>
            <a
              href="#projects"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent/90 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              {id ? 'Lihat Project' : 'View Projects'}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-16 lg:py-20 bg-bone/25 border-y border-bone/40">
          <div className="w-full px-6 lg:px-12">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="font-serif text-3xl sm:text-4xl font-black text-accent tracking-tight">
                  {id ? 'Project' : 'Projects'}
                </h2>
                <p className="mt-2 text-sm text-text-muted font-light">
                  {id ? 'Karya yang sedang berjalan.' : 'Work currently underway.'}
                </p>
              </div>
            </div>

            <Link
              href="/medansimpang"
              className="group grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-2xl border border-bone/60 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md max-w-4xl"
            >
              <div className="relative h-56 md:h-auto md:min-h-[260px]">
                <Image
                  src="/images/silalas.jpg"
                  alt="Medan Simpang"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">
                  {id ? 'Heritage Walk · Medan' : 'Heritage Walk · Medan'}
                </p>
                <h3 className="font-serif text-2xl font-black text-accent">Medan Simpang</h3>
                <p className="mt-3 text-sm text-accent/80 leading-relaxed">
                  {id
                    ? 'Menjelajahi Kota Medan sebagai persimpangan budaya, etnis, dan kepercayaan — selangkah demi selangkah dari level mata.'
                    : 'Exploring Medan as an intersection of cultures, ethnicities, and beliefs — step by step, at eye level.'}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary-strong group-hover:gap-2.5 transition-all">
                  {id ? 'Jelajahi' : 'Explore'}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>

            <p className="mt-6 text-sm text-text-muted font-light italic">
              {id ? 'Lebih banyak project segera hadir.' : 'More projects coming soon.'}
            </p>
          </div>
        </section>

        {/* Stories */}
        <section id="stories" className="py-16 lg:py-24">
          <div className="w-full px-6 lg:px-12 max-w-3xl">
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-accent tracking-tight">
              {id ? 'Cerita' : 'Stories'}
            </h2>
            <p className="mt-4 text-base text-accent/85 leading-relaxed">
              {id
                ? 'Kisah sejarah, budaya, dan kehidupan kota yang kami temukan di lapangan. Mulai dari cerita-cerita Medan Simpang.'
                : 'Histories, cultures, and city life we uncover in the field. Start with the stories from Medan Simpang.'}
            </p>
            <Link
              href="/medansimpang/cerita"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent px-6 py-3 text-sm font-semibold text-accent hover:bg-accent hover:text-white transition-all"
            >
              {id ? 'Baca cerita kota kami' : 'Read our city stories'}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-16 lg:py-24 bg-bone/25 border-y border-bone/40">
          <div className="w-full px-6 lg:px-12">
            <div className="max-w-3xl">
              <h2 className="font-serif text-3xl sm:text-4xl font-black text-accent tracking-tight">
                {id ? 'Tentang' : 'About'}
              </h2>
              <p className="mt-4 text-base text-accent/85 leading-relaxed">
                {id
                  ? 'UrbanMorphSoc adalah kolektif yang mempelajari bagaimana kota terbentuk dan dihidupi. Kami menggabungkan riset morfologi urban, penelusuran lapangan, dan storytelling untuk membuat kota lebih mudah dibaca oleh siapa saja.'
                  : 'UrbanMorphSoc is a collective studying how cities take shape and are lived in. We combine urban morphology research, fieldwork, and storytelling to make the city legible to everyone.'}
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
              {pillars.map((p) => (
                <div key={p.title} className="rounded-2xl border border-bone/60 bg-white p-6 shadow-sm">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10">
                    {p.icon}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-accent">{p.title}</h3>
                  <p className="mt-2 text-sm text-accent/80 leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
```

- [ ] **Step 4: Verify build + dev smoke test**

Run: `npm run build` → succeeds; `out/index.html` exists.
Run: `npm run dev`, open `http://localhost:3000/`. Confirm: hero renders with Playfair heading; nav anchors scroll to Projects/Stories/About; ID/EN toggle flips all copy and persists when navigating to `/medansimpang` and back; the Projects card links to `/medansimpang`; the Stories button links to `/medansimpang/cerita`.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(landing): add UrbanMorphSoc root landing page"
```

---

### Task 5: Update sitemap and robots for the new structure

**Files:**
- Modify: `src/app/sitemap.ts`
- Modify: `src/app/robots.ts`

**Interfaces:**
- Consumes: MedanSimpang routes now live under `https://urbanmorphsoc.com/medansimpang/*` (unchanged `BASE_URL`).
- Produces: a sitemap that also includes the landing root, and a robots file pointing at the root sitemap.

- [ ] **Step 1: Add the landing root entry in `src/app/sitemap.ts`**

Immediately after `const now = new Date();` (line ~15) and before `const staticPaths`, insert the landing entry, then append it. Concretely, change the initial `entries` construction so the first entry is the landing root. Replace the block that builds `entries` from `staticPaths` with:

```ts
  const entries: MetadataRoute.Sitemap = [
    {
      url: 'https://urbanmorphsoc.com/',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...staticPaths.map((p) => ({
      url: `${BASE_URL}${p}/`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
```

(Leave `BASE_URL = 'https://urbanmorphsoc.com/medansimpang'` and the kawasan/walks/cerita loops unchanged.)

- [ ] **Step 2: Point robots at the root sitemap in `src/app/robots.ts`**

Change:
```ts
    sitemap: 'https://urbanmorphsoc.com/medansimpang/sitemap.xml',
```
to:
```ts
    sitemap: 'https://urbanmorphsoc.com/sitemap.xml',
```

- [ ] **Step 3: Verify build + output**

Run: `npm run build`
Then confirm the generated files:
```bash
grep -c "urbanmorphsoc.com/" out/sitemap.xml
grep "sitemap.xml" out/robots.txt
```
Expected: `out/sitemap.xml` contains the root URL plus `/medansimpang/*` URLs; `out/robots.txt` references `https://urbanmorphsoc.com/sitemap.xml`.

- [ ] **Step 4: Commit**

```bash
git add src/app/sitemap.ts src/app/robots.ts
git commit -m "chore(seo): add landing root to sitemap, point robots at root sitemap"
```

---

### Task 6: Update deploy config for the single-deploy-to-root model

**Files:**
- Modify: `public/.htaccess`
- Delete: `deploy/public_html-root/.htaccess`, `deploy/public_html-root/index.html` (whole folder)
- Modify: `deploy/README.md`

**Interfaces:**
- Consumes: `npm run build` now exports the whole site to `out/` (landing at root, app under `medansimpang/`), and `public/.htaccess` is copied to `out/.htaccess` (site-root).
- Produces: deploy instructions and `.htaccess` matching "upload all of `out/` to `public_html/` root".

- [ ] **Step 1: Fix the 404 path in `public/.htaccess`**

Change the last line:
```apache
ErrorDocument 404 /medansimpang/404.html
```
to:
```apache
ErrorDocument 404 /404.html
```
(After removing basePath, static export emits `out/404.html` served at `/404.html`.)

- [ ] **Step 2: Remove the obsolete root-redirect folder**

```bash
git rm -r deploy/public_html-root
```

- [ ] **Step 3: Rewrite `deploy/README.md`**

Replace the whole file with:

```markdown
# Deploy — UrbanMorphSoc (landing di root) + MedanSimpang

## Model
Sejak landing page UrbanMorphSoc diintegrasikan, `basePath` dihapus dan
seluruh situs di-export ke satu folder `out/`:

```
out/
├── index.html          <- landing UrbanMorphSoc (root domain)
├── 404.html
├── .htaccess           <- dari public/.htaccess (kompresi, cache, header, 404)
├── sitemap.xml, robots.txt
├── _next/ ... images/ ...
└── medansimpang/
    ├── index.html      <- MedanSimpang
    └── kawasan/ walks/ cerita/ tentang/ ...
```

## Cara deploy (Hostinger — File Manager atau FTP)
1. Jalankan `npm run build` → menghasilkan folder `out/`.
2. Upload **seluruh isi `out/`** ke `public_html/` (root domain), termasuk
   file tersembunyi `.htaccess` (aktifkan "Show hidden files" bila perlu).
3. Buka `https://urbanmorphsoc.com/` → tampil landing UrbanMorphSoc.
   Buka `https://urbanmorphsoc.com/medansimpang/` → tampil MedanSimpang.

## Catatan
- Tidak ada lagi redirect root → /medansimpang (folder `public_html-root/`
  yang lama sudah dihapus). Root kini disajikan langsung oleh `index.html`.
- `.htaccess` di root berlaku untuk seluruh situs (aturan berbasis ekstensi).
```

- [ ] **Step 4: Verify build + output layout**

Run: `npm run build`
Then confirm:
```bash
ls out/index.html out/404.html out/.htaccess out/medansimpang/index.html
grep "ErrorDocument" out/.htaccess
```
Expected: all listed files exist; `out/.htaccess` shows `ErrorDocument 404 /404.html`.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore(deploy): single deploy-to-root model, drop root redirect, fix 404 path"
```

---

### Task 7: Full verification pass

**Files:** none (verification only).

- [ ] **Step 1: Clean build**

Run: `npm run build`
Expected: succeeds with no type errors; `out/` contains `index.html` and `medansimpang/index.html`.

- [ ] **Step 2: Serve the static export and click through**

Run:
```bash
npx serve out
```
Open the served URL and verify:
- `/` → landing renders; hero, Projects, Stories, About, footer all present.
- ID/EN toggle switches all landing copy and stays consistent when moving between `/` and `/medansimpang`.
- Projects card → `/medansimpang`; Stories button → `/medansimpang/cerita`.
- In `/medansimpang`, click through kawasan → walk → location, cerita list → story, a tentang page, and a map popup — all resolve under `/medansimpang/...` with no 404s.
- Visit a nonexistent path (e.g. `/does-not-exist`) → the custom 404 page renders.

- [ ] **Step 3: Final link audit**

Run:
```bash
grep -rnE "href=[\"'\`]/(kawasan|cerita|walks|tentang)" src
grep -rnE "linkUrl: \`/(kawasan|walks|cerita)" src
```
Expected: no matches (all MedanSimpang links are prefixed).

- [ ] **Step 4: Commit any final fixes and finish**

If Step 2/3 surfaced issues, fix them, re-run the build, and commit. Otherwise the feature branch `feat/urbanmorphsoc-landing` is ready to merge.

---

## Self-Review Notes

- **Spec coverage:** integration/remove-basePath (Task 1), move routes + metadata split (Task 2), link prefixing incl. Breadcrumbs & map popups (Task 3), landing page with Hero/Projects/Stories/About/Footer + bilingual toggle (Task 4), sitemap/robots (Task 5), `.htaccess` ErrorDocument + remove redirect folder + README (Task 6), verification (Task 7). All spec sections mapped.
- **Assets:** Projects card uses the existing `/images/silalas.jpg`; the landing wordmark is text (no new logo asset required).
- **No new dependencies:** `lucide-react`, `next/image`, `next/link`, and `useLanguage()` all already exist.
