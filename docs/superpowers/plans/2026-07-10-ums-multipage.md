# UMS Umbrella Multi-page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the single-page UrbanMorphSoc landing into a small multi-page UMS umbrella site (Landing + Projects + Stories + About) with a large background hero image and real Urban Morphology and Society content.

**Architecture:** Add a Next.js route group `src/app/(site)/` that shares one layout (site header + footer) for the umbrella pages while keeping URLs at root. MedanSimpang (`/medansimpang`) stays outside the group, untouched. Umbrella pages are client components using the shared `useLanguage()` for bilingual UI.

**Tech Stack:** Next.js 16 App Router (`output: 'export'`), React 19, Tailwind v4, `lucide-react`, Playfair/Outfit fonts.

## Global Constraints

- Repo has NO test framework. Verification gate is `npm run build` + grep audits + inspecting generated `out/`. Do NOT add tests.
- Design tokens (in `src/app/globals.css`): `bg-background` cream, `accent`, `primary`, `primary-strong`, `primary-light`, `secondary`, `bone`, `text-text-muted`; `font-serif` = Playfair, `font-sans` = Outfit. Reuse only these.
- Brand placement: Header wordmark = "Urban Morphology and Society" (full name, NO "UMS" abbreviation). Landing hero title = `Urban`**`Morph`**`Soc` stylized, subtitle "Urban Morphology and Society". No "Seeing cities at eye level" tagline anywhere.
- Bilingual: UI labels/headings/CTAs/intros have ID + EN via `useLanguage()` (`{ language: 'id'|'en' }`, default `id`). The official UMS description paragraph is English-only.
- Contact: urbanmorphsoc@gmail.com. Address per `src/data/ums.ts`.
- `/medansimpang` and all its routes must remain functional and unchanged.
- Commit after each task on branch `feat/urbanmorphsoc-landing`.

---

### Task 1: UMS content data + shared site chrome

**Files:**
- Create: `src/data/ums.ts`
- Create: `src/components/site/SiteHeader.tsx`
- Create: `src/components/site/SiteFooter.tsx`

**Interfaces:**
- Produces: `src/data/ums.ts` exports `umsDescription` (string), `umsEstablishment` ({decree,date}), `umsAddress` ({dept,street,city,email}), `umsHead` (Person), `umsMembers` (Person[]), `umsStudents` (Person[]), `initials(name)` (string), and `type Person = { name: string; role?: string; photo?: string | null }`. `SiteHeader`/`SiteFooter` are default-exported client components consuming `useLanguage()` and (footer) `umsAddress`.

- [ ] **Step 1: Create `src/data/ums.ts`**

```ts
export interface Person {
  name: string;
  role?: string;
  photo?: string | null;
}

export const umsDescription =
  'Urban Morphology and Society (UMS) is a research cluster dedicated to understanding how society shapes the built environment and, in turn, how the built environment influences social life. The cluster investigates the morphology of buildings, neighbourhoods, and cities through the lens of spatial transformation, cultural practices, historical processes, community adaptation, and everyday urban life. Rather than viewing urban form as a static physical artifact, UMS approaches morphology as a means of understanding the evolving relationship between space and society across diverse cultural and historical settings.';

export const umsEstablishment = {
  decree: '4921/UN5.1.R/SK/PPM/2023',
  date: '28 December 2023',
};

export const umsAddress = {
  dept: 'Department of Architecture, Universitas Sumatera Utara, Indonesia',
  street: 'Jalan Perpustakaan Kampus USU Padang Bulan',
  city: 'Medan, Indonesia 20155',
  email: 'urbanmorphsoc@gmail.com',
};

export const umsHead: Person = { name: 'Dr. Salmina Wati Ginting', role: 'Head', photo: null };

export const umsMembers: Person[] = [
  { name: 'Dr. Ulrike Herbig', photo: null },
  { name: 'Dr. Isnen Fitri', photo: null },
  { name: 'Dr. Wahyuni Zahrah', photo: null },
  { name: 'Dr. Lim Seng Boon', photo: null },
  { name: 'Dr. Norhazlan Haron', photo: null },
  { name: 'Sri Elfina Panjaitan', photo: null },
  { name: 'Ryandika Afdila', photo: null },
  { name: 'Nurrahmadayeni', photo: null },
];

// TBD — user will provide student names/photos. Keep empty until then.
export const umsStudents: Person[] = [];

export function initials(name: string): string {
  const parts = name.replace(/^Dr\.\s*/i, '').trim().split(/\s+/);
  return ((parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')).toUpperCase();
}
```

- [ ] **Step 2: Create `src/components/site/SiteHeader.tsx`**

```tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const NAV = [
  { href: '/', id_label: 'Beranda', en_label: 'Home' },
  { href: '/projects', id_label: 'Project', en_label: 'Projects' },
  { href: '/stories', id_label: 'Cerita', en_label: 'Stories' },
  { href: '/about', id_label: 'Tentang', en_label: 'About' },
];

export default function SiteHeader() {
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleLang = () => setLanguage(language === 'id' ? 'en' : 'id');
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-bone/45 py-3'
          : 'bg-white/80 backdrop-blur-sm py-4'
      }`}
    >
      <div className="w-full px-6 lg:px-12">
        <div className="flex h-14 items-center justify-between gap-4">
          <Link
            href="/"
            className="font-serif text-sm sm:text-base lg:text-lg font-black tracking-tight text-accent leading-tight max-w-[60%] lg:max-w-none"
          >
            Urban Morphology <span className="text-primary-strong">and Society</span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`relative text-sm font-semibold transition-colors py-2 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-secondary after:transition-all after:duration-300 ${
                  isActive(n.href)
                    ? 'text-secondary after:w-full'
                    : 'text-accent hover:text-secondary after:w-0 hover:after:w-full'
                }`}
              >
                {language === 'id' ? n.id_label : n.en_label}
              </Link>
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
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className={`block py-2 text-base font-bold ${
                  isActive(n.href) ? 'text-secondary' : 'text-accent hover:text-secondary'
                }`}
              >
                {language === 'id' ? n.id_label : n.en_label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 3: Create `src/components/site/SiteFooter.tsx`**

```tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { umsAddress } from '@/data/ums';

export default function SiteFooter() {
  const { language } = useLanguage();
  const id = language === 'id';

  const t = {
    mission: id
      ? 'Klaster riset yang mempelajari bagaimana masyarakat membentuk lingkungan binaan, dan sebaliknya.'
      : 'A research cluster studying how society shapes the built environment, and vice versa.',
    links: id ? 'Tautan' : 'Links',
    contact: id ? 'Kontak' : 'Contact',
  };

  const nav = [
    { href: '/', label: id ? 'Beranda' : 'Home' },
    { href: '/projects', label: id ? 'Project' : 'Projects' },
    { href: '/stories', label: id ? 'Cerita' : 'Stories' },
    { href: '/about', label: id ? 'Tentang' : 'About' },
  ];

  return (
    <footer className="bg-accent text-white border-t border-bone/10">
      <div className="w-full px-6 py-12 lg:px-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 pb-8 border-b border-bone/10">
          <div className="space-y-4">
            <p className="font-serif text-xl font-black tracking-tight leading-tight">
              Urban Morphology <span className="text-primary-light">and Society</span>
            </p>
            <p className="text-sm font-light text-gray-300 leading-relaxed max-w-xs">{t.mission}</p>
            <div className="flex space-x-4 pt-2">
              <a href="https://instagram.com/urbanmorphsoc" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-light transition-colors" aria-label="Instagram"><Instagram className="h-5 w-5" /></a>
              <a href="https://facebook.com/urbanmorphsoc" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-light transition-colors" aria-label="Facebook"><Facebook className="h-5 w-5" /></a>
              <a href="https://youtube.com/@urbanmorphsoc" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-light transition-colors" aria-label="YouTube"><Youtube className="h-5 w-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg font-bold text-primary-light mb-4">{t.links}</h4>
            <ul className="space-y-2 text-sm font-light text-gray-300">
              {nav.map((n) => (
                <li key={n.href}><Link href={n.href} className="hover:text-primary-light transition-colors">{n.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-bold text-primary-light mb-4">{t.contact}</h4>
            <div className="flex items-start text-sm font-light text-gray-300 mb-3">
              <MapPin className="mr-2 mt-0.5 h-4 w-4 shrink-0 text-primary-light" />
              <span>{umsAddress.dept}<br />{umsAddress.street}<br />{umsAddress.city}</span>
            </div>
            <a href={`mailto:${umsAddress.email}`} className="flex items-center text-sm font-light text-gray-300 hover:text-primary-light transition-colors">
              <Mail className="mr-2 h-4 w-4 text-primary-light" />{umsAddress.email}
            </a>
          </div>
        </div>

        <div className="mt-8 text-xs font-light text-gray-400">
          <p>© 2026 Urban Morphology and Society. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: succeeds (TypeScript passes; new files compile; they're not imported yet — that's fine).

- [ ] **Step 5: Commit**

```bash
git add src/data/ums.ts src/components/site/
git commit -m "feat(site): add UMS content data and shared site header/footer"
```

---

### Task 2: Route group + new landing hero; remove old landing

**Files:**
- Create: `src/app/(site)/layout.tsx`
- Create: `src/app/(site)/page.tsx`
- Delete: `src/app/page.tsx`
- Delete: `src/components/landing/LandingHeader.tsx`, `src/components/landing/LandingFooter.tsx`
- Modify: `src/app/layout.tsx` (root metadata only)

**Interfaces:**
- Consumes: `SiteHeader`, `SiteFooter` (Task 1), `umsDescription` (Task 1), `useLanguage()`.
- Produces: `(site)/layout.tsx` wraps all umbrella pages with header/main/footer; `/` renders the hero landing. Umbrella pages return fragments (no own header/footer/main).

- [ ] **Step 1: Create `src/app/(site)/layout.tsx`**

```tsx
import React from 'react';
import SiteHeader from '@/components/site/SiteHeader';
import SiteFooter from '@/components/site/SiteFooter';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SiteHeader />
      <main className="flex-grow">{children}</main>
      <SiteFooter />
    </div>
  );
}
```

- [ ] **Step 2: Create `src/app/(site)/page.tsx` (landing)**

```tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, FolderOpen, BookOpen, Info } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { umsDescription } from '@/data/ums';

export default function Landing() {
  const { language } = useLanguage();
  const id = language === 'id';

  const teasers = [
    { href: '/projects', icon: <FolderOpen className="h-6 w-6 text-secondary" />, title: id ? 'Project' : 'Projects', body: id ? 'Karya dan inisiatif kami, mulai dari Medan Simpang.' : 'Our work and initiatives, starting with Medan Simpang.' },
    { href: '/stories', icon: <BookOpen className="h-6 w-6 text-secondary" />, title: id ? 'Cerita' : 'Stories', body: id ? 'Kisah kota dari lapangan.' : 'City stories from the field.' },
    { href: '/about', icon: <Info className="h-6 w-6 text-secondary" />, title: id ? 'Tentang' : 'About', body: id ? 'Tentang klaster riset & tim kami.' : 'About the research cluster & our team.' },
  ];

  return (
    <>
      {/* Hero — frontpage.png background, ~50vh */}
      <section className="relative h-[50vh] min-h-[360px] flex items-end">
        <div className="absolute inset-0">
          <Image src="/images/frontpage.png" alt="" fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-accent/85 via-accent/45 to-accent/20" />
        </div>
        <div className="relative w-full px-6 lg:px-12 pb-10 lg:pb-14">
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none">
            Urban<span className="text-primary-light">Morph</span>Soc
          </h1>
          <p className="mt-3 text-lg sm:text-xl font-semibold text-white/90">Urban Morphology and Society</p>
          <Link
            href="/projects"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-accent hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            {id ? 'Lihat Project' : 'View Projects'}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Intro — official UMS description (English) */}
      <section className="py-16 lg:py-20">
        <div className="w-full px-6 lg:px-12 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-widest text-primary-strong mb-4">
            {id ? 'Klaster Riset' : 'Research Cluster'}
          </p>
          <p className="text-base sm:text-lg font-medium text-accent/90 leading-relaxed">{umsDescription}</p>
          <Link href="/about" className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-secondary hover:gap-2.5 transition-all">
            {id ? 'Selengkapnya tentang kami' : 'Learn more about us'}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Teaser cards */}
      <section className="pb-20">
        <div className="w-full px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
            {teasers.map((tsr) => (
              <Link key={tsr.href} href={tsr.href} className="group rounded-2xl border border-bone/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10">{tsr.icon}</div>
                <h3 className="font-serif text-lg font-bold text-accent">{tsr.title}</h3>
                <p className="mt-2 text-sm text-accent/80 leading-relaxed">{tsr.body}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary-strong group-hover:gap-2.5 transition-all">
                  {id ? 'Buka' : 'Open'}<ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 3: Delete the old landing files**

```bash
git rm src/app/page.tsx src/components/landing/LandingHeader.tsx src/components/landing/LandingFooter.tsx
```
(The `src/components/landing/` folder should now be empty/removed.)

- [ ] **Step 4: Update root metadata in `src/app/layout.tsx`**

Replace the current `metadata` export block with:

```tsx
export const metadata: Metadata = {
  title: "Urban Morphology and Society",
  description: "Urban Morphology and Society (UMS) is a research cluster at Universitas Sumatera Utara studying how society shapes the built environment and, in turn, how the built environment shapes social life.",
  metadataBase: new URL("https://urbanmorphsoc.com"),
  openGraph: {
    title: "Urban Morphology and Society",
    description: "A research cluster studying the morphology of buildings, neighbourhoods, and cities — and its relationship with society.",
    url: "https://urbanmorphsoc.com",
    siteName: "Urban Morphology and Society",
    locale: "id_ID",
    type: "website",
  },
};
```
Leave the fonts, `<html>/<body>`, and `LanguageProvider` unchanged.

- [ ] **Step 5: Verify build + landing**

Run: `npm run build`
Expected: succeeds; `out/index.html` exists and contains "Urban Morphology and Society" and "UrbanMorphSoc". Confirm:
```bash
grep -c "Urban Morphology and Society" out/index.html   # >= 1
grep -c "frontpage.png" out/index.html                  # >= 1 (hero image referenced)
```
(Teaser links to `/projects` `/stories` `/about` 404 until Task 3 — expected.)

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(site): route-group layout + hero landing, drop old landing components"
```

---

### Task 3: Projects, Stories, and About pages

**Files:**
- Create: `src/app/(site)/projects/page.tsx`
- Create: `src/app/(site)/stories/page.tsx`
- Create: `src/app/(site)/about/page.tsx`

**Interfaces:**
- Consumes: `useLanguage()`, and (About) `umsDescription`, `umsEstablishment`, `umsAddress`, `umsHead`, `umsMembers`, `umsStudents`, `initials`, `type Person` from `@/data/ums`.
- Produces: routes `/projects`, `/stories`, `/about`. Each is a client component returning a `<section>` (chrome comes from `(site)/layout.tsx`). Sub-pages start with top padding (`pt-28 lg:pt-32`) to clear the fixed header.

- [ ] **Step 1: Create `src/app/(site)/projects/page.tsx`**

```tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function ProjectsPage() {
  const { language } = useLanguage();
  const id = language === 'id';

  return (
    <section className="pt-28 lg:pt-32 pb-20">
      <div className="w-full px-6 lg:px-12">
        <h1 className="font-serif text-4xl sm:text-5xl font-black text-accent tracking-tight">{id ? 'Project' : 'Projects'}</h1>
        <p className="mt-3 text-base text-accent/80 max-w-2xl">
          {id ? 'Karya dan inisiatif Urban Morphology and Society.' : 'Work and initiatives by Urban Morphology and Society.'}
        </p>

        <Link
          href="/medansimpang"
          className="group mt-10 grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-2xl border border-bone/60 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md max-w-4xl"
        >
          <div className="relative h-56 md:h-auto md:min-h-[260px]">
            <Image src="/images/silalas.jpg" alt="Medan Simpang" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
          <div className="p-8 flex flex-col justify-center">
            <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">Heritage Walk · Medan</p>
            <h2 className="font-serif text-2xl font-black text-accent">Medan Simpang</h2>
            <p className="mt-3 text-sm text-accent/80 leading-relaxed">
              {id ? 'Menjelajahi Kota Medan sebagai persimpangan budaya, etnis, dan kepercayaan — selangkah demi selangkah dari level mata.' : 'Exploring Medan as an intersection of cultures, ethnicities, and beliefs — step by step, at eye level.'}
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary-strong group-hover:gap-2.5 transition-all">
              {id ? 'Jelajahi' : 'Explore'}<ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </Link>

        <p className="mt-6 text-sm text-text-muted font-light italic">
          {id ? 'Lebih banyak project segera hadir.' : 'More projects coming soon.'}
        </p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `src/app/(site)/stories/page.tsx`**

```tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function StoriesPage() {
  const { language } = useLanguage();
  const id = language === 'id';

  return (
    <section className="pt-28 lg:pt-32 pb-20">
      <div className="w-full px-6 lg:px-12 max-w-3xl">
        <h1 className="font-serif text-4xl sm:text-5xl font-black text-accent tracking-tight">{id ? 'Cerita' : 'Stories'}</h1>
        <p className="mt-4 text-base text-accent/85 leading-relaxed">
          {id ? 'Kisah sejarah, budaya, dan kehidupan kota yang kami temukan di lapangan. Saat ini cerita hadir melalui project Medan Simpang.' : 'Histories, cultures, and city life we uncover in the field. Stories currently live through the Medan Simpang project.'}
        </p>

        <Link
          href="/medansimpang/cerita"
          className="group mt-8 flex items-center gap-4 rounded-2xl border border-bone/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
        >
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 shrink-0"><BookOpen className="h-6 w-6 text-secondary" /></div>
          <div className="flex-grow">
            <h2 className="font-serif text-lg font-bold text-accent">{id ? 'Cerita Medan Simpang' : 'Medan Simpang Stories'}</h2>
            <p className="mt-1 text-sm text-accent/80">{id ? 'Baca kisah-kisah kota dari Medan Simpang.' : 'Read city stories from Medan Simpang.'}</p>
          </div>
          <ArrowRight className="h-5 w-5 text-primary-strong shrink-0 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create `src/app/(site)/about/page.tsx`**

```tsx
'use client';

import React from 'react';
import { Mail, MapPin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import {
  umsDescription,
  umsEstablishment,
  umsAddress,
  umsHead,
  umsMembers,
  umsStudents,
  initials,
  type Person,
} from '@/data/ums';

function PersonCard({ person }: { person: Person }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-bone/60 bg-white p-4 shadow-sm">
      <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-secondary/10 text-secondary font-serif font-bold text-lg shrink-0">
        {initials(person.name)}
      </div>
      <div>
        <p className="font-semibold text-accent leading-tight">{person.name}</p>
        {person.role && <p className="text-xs text-text-muted uppercase tracking-wider mt-0.5">{person.role}</p>}
      </div>
    </div>
  );
}

export default function AboutPage() {
  const { language } = useLanguage();
  const id = language === 'id';

  return (
    <section className="pt-28 lg:pt-32 pb-20">
      <div className="w-full px-6 lg:px-12 max-w-4xl">
        <h1 className="font-serif text-4xl sm:text-5xl font-black text-accent tracking-tight">Urban Morphology and Society</h1>

        <p className="mt-6 text-base sm:text-lg font-medium text-accent/90 leading-relaxed">{umsDescription}</p>

        <p className="mt-6 text-sm text-text-muted">
          <span className="font-bold text-accent">{id ? 'Pendirian resmi: ' : 'Officially established: '}</span>
          {id
            ? `Berdasarkan SK Rektor Universitas Sumatera Utara No. ${umsEstablishment.decree}, ${umsEstablishment.date}.`
            : `By Rector of Universitas Sumatera Utara decree No. ${umsEstablishment.decree}, ${umsEstablishment.date}.`}
        </p>

        {/* Address */}
        <div className="mt-10 max-w-xl">
          <div className="rounded-2xl border border-bone/60 bg-white p-6 shadow-sm">
            <h2 className="font-serif text-lg font-bold text-accent mb-3">{id ? 'Alamat' : 'Address'}</h2>
            <div className="flex items-start text-sm text-accent/80">
              <MapPin className="mr-2 mt-0.5 h-4 w-4 shrink-0 text-secondary" />
              <span>{umsAddress.dept}<br />{umsAddress.street}<br />{umsAddress.city}</span>
            </div>
            <a href={`mailto:${umsAddress.email}`} className="mt-3 flex items-center text-sm font-semibold text-secondary hover:text-primary-strong transition-colors">
              <Mail className="mr-2 h-4 w-4" />{umsAddress.email}
            </a>
          </div>
        </div>

        {/* People */}
        <div className="mt-14">
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-accent tracking-tight">{id ? 'Tim' : 'People'}</h2>

          <h3 className="mt-6 text-xs font-bold uppercase tracking-widest text-primary-strong">{id ? 'Ketua' : 'Head'}</h3>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
            <PersonCard person={umsHead} />
          </div>

          <h3 className="mt-8 text-xs font-bold uppercase tracking-widest text-primary-strong">{id ? 'Anggota' : 'Members'}</h3>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {umsMembers.map((m) => <PersonCard key={m.name} person={m} />)}
          </div>

          <h3 className="mt-8 text-xs font-bold uppercase tracking-widest text-primary-strong">{id ? 'Mahasiswa' : 'Students'}</h3>
          {umsStudents.length > 0 ? (
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {umsStudents.map((s) => <PersonCard key={s.name} person={s} />)}
            </div>
          ) : (
            <p className="mt-3 text-sm text-text-muted font-light italic">
              {id ? 'Daftar mahasiswa akan segera ditambahkan.' : 'Student list coming soon.'}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Verify build + routes**

Run: `npm run build`
Expected: succeeds; these exist:
```bash
ls out/projects/index.html out/stories/index.html out/about/index.html
grep -c "Dr. Salmina Wati Ginting" out/about/index.html   # >= 1
grep -c "4921/UN5.1.R/SK/PPM/2023" out/about/index.html    # >= 1
grep -oE 'href="/medansimpang[^"]*"' out/stories/index.html # story link present
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(site): add Projects, Stories, and About pages"
```

---

### Task 4: Sitemap update + full verification

**Files:**
- Modify: `src/app/sitemap.ts`

**Interfaces:**
- Consumes: existing sitemap structure (root entry + `/medansimpang/*`).
- Produces: sitemap that also lists `/projects/`, `/stories/`, `/about/` at the root domain.

- [ ] **Step 1: Add umbrella pages to `src/app/sitemap.ts`**

Find the entries array that currently starts with the root landing object:
```ts
  const entries: MetadataRoute.Sitemap = [
    {
      url: 'https://urbanmorphsoc.com/',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...staticPaths.map((p) => ({
```
Insert three umbrella-page entries immediately AFTER the root `{ url: 'https://urbanmorphsoc.com/', ... }` object and BEFORE the `...staticPaths.map(...)` spread:
```ts
    {
      url: 'https://urbanmorphsoc.com/projects/',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://urbanmorphsoc.com/stories/',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://urbanmorphsoc.com/about/',
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
```
Leave everything else unchanged.

- [ ] **Step 2: Verify build + sitemap**

```bash
npm run build
grep -o "https://urbanmorphsoc.com/[a-z]*/" out/sitemap.xml | sort -u
```
Expected: shows `/projects/`, `/stories/`, `/about/`, `/medansimpang/` (and the root `https://urbanmorphsoc.com/`).

- [ ] **Step 3: Full verification pass**

```bash
# structure
ls out/index.html out/projects/index.html out/stories/index.html out/about/index.html out/medansimpang/index.html
# MedanSimpang still intact — no bare-root route leaks anywhere
grep -rhoE 'href="/(kawasan|cerita|walks|tentang)/[^"]*"' out --include=*.html | sort -u   # expect empty
# umbrella links resolve to real routes
grep -oE 'href="/(projects|stories|about)/?"' out/index.html | sort -u                      # teaser + nav
# no leftover references to deleted landing components
grep -rn "components/landing" src && echo "STALE REF" || echo "no stale landing refs"
```
Expected: all files present; no bare-root MedanSimpang route leaks; umbrella links present; no `components/landing` references remain.

- [ ] **Step 4: Dev smoke (if possible) + commit**

Optionally run `npm run dev` and click `/` → hero + CTA → `/projects`; nav to `/stories`, `/about`; toggle ID/EN; verify `/medansimpang` still works.
Then commit:
```bash
git add src/app/sitemap.ts
git commit -m "chore(seo): add umbrella pages to sitemap"
```

---

## Self-Review Notes

- **Spec coverage:** multi-page route group (Tasks 2-3), hero with frontpage.png (Task 2), brand placement header/hero (Tasks 1-2), bilingual UI + English UMS description (all page tasks), real UMS content incl. establishment/address/people with student placeholder (Task 3, data in Task 1), Stories→MedanSimpang (Task 3), sitemap (Task 4), MedanSimpang untouched (verified Task 4). All spec sections mapped.
- **Type consistency:** `Person` type and `initials()` defined in `ums.ts` (Task 1), consumed in About (Task 3). `useLanguage()` returns `{ language, setLanguage }` per existing context. Nav hrefs (`/`, `/projects`, `/stories`, `/about`) consistent across SiteHeader, SiteFooter, landing teasers, and route folders.
- **Chrome ownership:** umbrella pages return fragments/sections; header+footer+main come from `(site)/layout.tsx`. MedanSimpang is outside `(site)` and keeps its own Header/Footer — no double chrome.
- **Client components + metadata:** umbrella pages are `'use client'` (need the toggle) so they inherit root-layout metadata; acceptable per spec (no per-page metadata export). Root metadata updated to UMS in Task 2.
- **No placeholders:** student list intentionally empty (`umsStudents: []`) with a rendered "coming soon" note — a real content gap owned by the user, not a plan gap.
