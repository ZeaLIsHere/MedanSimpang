'use client';
/* eslint-disable @next/next/no-img-element -- raw local images are reliable in the static Hostinger export */

import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { assetPath } from '@/lib/paths';

interface StoryTeaser {
  category: { id: string; en: string };
  title: { id: string; en: string };
  excerpt: { id: string; en: string };
  image: string;
}

const STORIES: StoryTeaser[] = [
  {
    category: { id: 'Bentuk Kota', en: 'Urban Form' },
    title: { id: 'Membaca Tata Bahasa Kota', en: "Reading the City's Grammar" },
    excerpt: {
      id: 'Bagaimana pola jalan, ukuran blok, dan garis kaveling menyimpan jejak sejarah sebuah lingkungan.',
      en: "How street patterns, block sizes, and plot lines quietly record a neighbourhood's history.",
    },
    image: '/images/frontpage.webp',
  },
  {
    category: { id: 'Masyarakat', en: 'Society' },
    title: { id: 'Ruang, Memori & Komunitas', en: 'Space, Memory & Community' },
    excerpt: {
      id: 'Ritual sehari-hari dan memori bersama meninggalkan bekas pada lingkungan binaan di sekitar kita.',
      en: 'Everyday rituals and shared memory leave their mark on the built environment around us.',
    },
    image: '/images/silalas.webp',
  },
  {
    category: { id: 'Morfologi', en: 'Morphology' },
    title: { id: 'Ketika Bentuk Bertemu Masyarakat', en: 'When Form Meets Society' },
    excerpt: {
      id: 'Perubahan sosial perlahan menulis ulang bentuk jalan, blok, dan ruang publik sebuah kota.',
      en: "Social change slowly rewrites the shape of a city's streets, blocks, and public spaces.",
    },
    image: '/images/cover-trail-2.webp',
  },
  {
    category: { id: 'Lapangan', en: 'Fieldwork' },
    title: { id: 'Menyusuri Kota Sehari-hari', en: 'Walking the Everyday City' },
    excerpt: {
      id: 'Catatan lapangan tentang bagaimana kehidupan urban terbentuk di jalan-jalan yang biasa kita lewati.',
      en: 'Field notes on how urban life takes shape along the ordinary streets we pass every day.',
    },
    image: '/images/cover-trail-3.webp',
  },
];

function Status({ id, inverted = false }: { id: boolean; inverted?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${inverted ? 'text-white/75' : 'text-accent/70'}`}>
      <Clock className={`h-3.5 w-3.5 ${inverted ? 'text-primary-light' : 'text-secondary'}`} />
      {id ? 'Dalam persiapan' : 'In preparation'}
    </span>
  );
}

export default function StoriesPage() {
  const { language } = useLanguage();
  const id = language === 'id';
  const pick = (value: { id: string; en: string }) => (id ? value.id : value.en);
  const [featured, ...remaining] = STORIES;

  return (
    <section className="overflow-x-hidden pb-20 pt-28 lg:pb-28 lg:pt-34">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <header className="grid gap-6 border-b border-bone/70 pb-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end lg:gap-16 lg:pb-12">
          <h1 className="text-balance font-serif text-5xl font-black tracking-[-0.03em] text-accent sm:text-6xl lg:text-7xl">
            {id ? 'Cerita' : 'Stories'}
          </h1>
          <p className="max-w-3xl text-pretty text-base font-medium leading-relaxed text-accent/85 sm:text-lg">
            {id
              ? 'Catatan lapangan, esai, dan pengamatan tentang bagaimana bentuk kota dan masyarakat saling membentuk. Tulisan pertama kami sedang dipersiapkan.'
              : 'Field notes, essays, and observations on how urban form and society shape one another. Our first pieces are now being prepared.'}
          </p>
        </header>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:gap-10">
          <article className="group min-w-0 overflow-hidden rounded-2xl bg-accent text-white">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={assetPath(featured.image)}
                alt={pick(featured.title)}
                className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-500 group-hover:scale-[1.025]"
              />
              <div className="absolute inset-0 bg-linear-to-t from-accent via-accent/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary-light">{pick(featured.category)}</p>
                <h2 className="mt-3 max-w-xl break-words font-serif text-2xl font-bold leading-tight sm:text-4xl">
                  {pick(featured.title)}
                </h2>
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <p className="max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">{pick(featured.excerpt)}</p>
              <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/15 pt-5">
                <Status id={id} inverted />
                <ArrowRight className="h-5 w-5 text-primary-light" aria-hidden="true" />
              </div>
            </div>
          </article>

          <div className="divide-y divide-bone/70 border-y border-bone/70">
            {remaining.map((story) => (
              <article key={story.title.en} className="group grid min-w-0 gap-5 py-6 sm:grid-cols-[180px_1fr] sm:items-center lg:grid-cols-[160px_1fr] xl:grid-cols-[190px_1fr]">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-bone">
                  <img
                    src={assetPath(story.image)}
                    alt={pick(story.title)}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-secondary">{pick(story.category)}</p>
                  <h2 className="mt-2 text-balance font-serif text-xl font-bold leading-snug text-accent sm:text-2xl">
                    {pick(story.title)}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-accent/75">{pick(story.excerpt)}</p>
                  <div className="mt-4"><Status id={id} /></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
