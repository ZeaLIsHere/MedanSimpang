'use client';

import React from 'react';
import { BookOpen, Clock } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface StoryTeaser {
  category: { id: string; en: string };
  title: { id: string; en: string };
  excerpt: { id: string; en: string };
  date: { id: string; en: string };
}

const STORIES: StoryTeaser[] = [
  {
    category: { id: 'Bentuk Kota', en: 'Urban Form' },
    title: { id: 'Membaca Tata Bahasa Kota', en: "Reading the City's Grammar" },
    excerpt: {
      id: 'Bagaimana pola jalan, ukuran blok, dan garis kaveling menyimpan jejak sejarah sebuah lingkungan.',
      en: 'How street patterns, block sizes, and plot lines quietly record a neighbourhood’s history.',
    },
    date: { id: 'Jul 2026', en: 'Jul 2026' },
  },
  {
    category: { id: 'Masyarakat', en: 'Society' },
    title: { id: 'Ruang, Memori & Komunitas', en: 'Space, Memory & Community' },
    excerpt: {
      id: 'Ritual sehari-hari dan memori bersama meninggalkan bekas pada lingkungan binaan di sekitar kita.',
      en: 'Everyday rituals and shared memory leave their mark on the built environment around us.',
    },
    date: { id: 'Jun 2026', en: 'Jun 2026' },
  },
  {
    category: { id: 'Morfologi', en: 'Morphology' },
    title: { id: 'Ketika Bentuk Bertemu Masyarakat', en: 'When Form Meets Society' },
    excerpt: {
      id: 'Perubahan sosial perlahan menulis ulang bentuk jalan, blok, dan ruang publik sebuah kota.',
      en: 'Social change slowly rewrites the shape of a city’s streets, blocks, and public spaces.',
    },
    date: { id: 'Mei 2026', en: 'May 2026' },
  },
  {
    category: { id: 'Lapangan', en: 'Fieldwork' },
    title: { id: 'Menyusuri Kota Sehari-hari', en: 'Walking the Everyday City' },
    excerpt: {
      id: 'Catatan lapangan tentang bagaimana kehidupan urban terbentuk di jalan-jalan yang biasa kita lewati.',
      en: 'Field notes on how urban life takes shape along the ordinary streets we pass every day.',
    },
    date: { id: 'Apr 2026', en: 'Apr 2026' },
  },
];

export default function StoriesPage() {
  const { language } = useLanguage();
  const id = language === 'id';
  const pick = (v: { id: string; en: string }) => (id ? v.id : v.en);

  return (
    <section className="pt-28 lg:pt-32 pb-20">
      <div className="w-full px-6 lg:px-12 max-w-5xl">
        <h1 className="font-serif text-4xl sm:text-5xl font-black text-accent tracking-tight">{id ? 'Cerita' : 'Stories'}</h1>
        <p className="mt-4 text-base text-accent/85 leading-relaxed max-w-2xl">
          {id
            ? 'Catatan lapangan, esai, dan pengamatan tentang bagaimana bentuk kota dan masyarakat saling membentuk. Cerita-cerita pertama kami sedang disiapkan.'
            : 'Field notes, essays, and observations on how urban form and society shape one another. Our first stories are on the way.'}
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {STORIES.map((s) => (
            <article
              key={s.title.en}
              className="overflow-hidden rounded-2xl border border-bone/60 bg-white shadow-sm"
            >
              <div className="relative h-36 bg-gradient-to-br from-secondary/20 via-primary/15 to-primary-light/25 flex items-center justify-center">
                <BookOpen className="h-9 w-9 text-secondary/70" />
              </div>
              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">{pick(s.category)}</p>
                <h2 className="font-serif text-lg font-bold text-accent leading-snug">{pick(s.title)}</h2>
                <p className="mt-2 text-sm text-accent/80 leading-relaxed">{pick(s.excerpt)}</p>
                <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-text-muted">
                  <span className="inline-flex items-center gap-1 rounded-full bg-bone/40 px-2.5 py-1">
                    <Clock className="h-3 w-3" />
                    {id ? 'Segera hadir' : 'Coming soon'}
                  </span>
                  <span>· {pick(s.date)}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 text-sm text-text-muted font-light italic">
          {id ? 'Lebih banyak cerita akan segera hadir.' : 'More stories coming soon.'}
        </p>
      </div>
    </section>
  );
}
