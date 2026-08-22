'use client';
/* eslint-disable @next/next/no-img-element -- static export needs raw image URLs with the deployment base path */

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { assetPath } from '@/lib/paths';
import {
  ArrowUpRight,
  Clock3,
  Newspaper,
  Play,
  Presentation,
  Smartphone,
} from 'lucide-react';

const presentationSlots = [
  {
    titleId: 'Presentasi Medan Simpang',
    titleEn: 'Medan Simpang Presentation',
    descriptionId: 'Ruang untuk video presentasi utama tentang gagasan, proses, dan hasil kegiatan Medan Simpang.',
    descriptionEn: 'A space for the main presentation video about the ideas, process, and outcomes of Medan Simpang.',
    image: '/images/frontpage.webp',
  },
  {
    titleId: 'Presentasi Heritage Trail Silalas',
    titleEn: 'Silalas Heritage Trail Presentation',
    descriptionId: 'Ruang untuk presentasi rute, temuan lapangan, dan pengalaman membaca kawasan Silalas.',
    descriptionEn: 'A space for the route presentation, field findings, and the experience of reading Silalas.',
    image: '/images/silalas.webp',
  },
];

const shortVideoSlots = [
  {
    titleId: 'Membaca kota dari level mata',
    titleEn: 'Reading the city at eye level',
    image: '/images/cover-trail-2.webp',
  },
  {
    titleId: 'Jejak keseharian di Silalas',
    titleEn: 'Everyday traces in Silalas',
    image: '/images/cover-trail-3.webp',
  },
  {
    titleId: 'Cerita dari perjalanan',
    titleEn: 'Stories from the walk',
    image: '/images/locations/smp-negeri-7-medan/gallery-1.jpg',
  },
];

const newsItems = [
  {
    source: 'Analisa Daily',
    date: '22 Agustus 2026',
    title: 'Tim USU dan Pakar Arsitektur Dunia Ajak Siswa SMP Kristen Kalam Kudus Membaca Kota',
    descriptionId: 'Kegiatan membaca kota bersama siswa SMP Kristen Kalam Kudus melalui pengamatan langsung terhadap ruang dan kehidupan perkotaan.',
    descriptionEn: 'An urban-reading activity with Kalam Kudus Christian Junior High School students through direct observation of city spaces and everyday life.',
    href: 'https://analisadaily.com/berita/baca/2026/08/22/1076850/tim-usu-dan-pakar-arsitektur-dunia-ajak-siswa-smp-kristen-kalam-kudus-membaca-kota/',
    image: 'https://analisadaily.com/imagesfile/202608/20260822-121625_tim-usu-dan-pakar-arsitektur-dunia-ajak-siswa-smp-kristen-kalam-kudus-membaca-kota.jpeg',
    fallbackImage: '/images/locations/smp-sma-kalam-kudus/gallery-1.jpg',
  },
  {
    source: 'Fakultas Teknik USU',
    date: 'Agustus 2026',
    title: 'Tim Pengabdian Lintas Disiplin FT USU Ajak Siswa SMPN 7 Medan Jelajahi Warisan Kota melalui Medan Simpang',
    descriptionId: 'Kolaborasi lintas disiplin yang mengajak siswa SMPN 7 Medan mengenali warisan kota melalui rute dan pengalaman Medan Simpang.',
    descriptionEn: 'A cross-disciplinary collaboration inviting SMPN 7 Medan students to discover urban heritage through the Medan Simpang routes and experience.',
    href: 'https://ft.usu.ac.id/id/berita/tim-pengabdian-lintas-disiplin-ft-usu-ajak-siswa-smpn-7-medan-jelajahi-warisan-kota-melalui-medan-simpang',
    image: 'https://konten.usu.ac.id/storage/posts/Aug-2026/66856/WhatsApp%20Image%202026-08-11%20at%2018.11.48.webp',
    fallbackImage: '/images/locations/smp-negeri-7-medan/thumbnail.jpg',
  },
];

function SectionTitle({
  eyebrow,
  title,
  description,
  inverted = false,
}: {
  eyebrow: React.ReactNode;
  title: string;
  description: string;
  inverted?: boolean;
}) {
  return (
    <div className="mb-7 max-w-2xl">
      <div className={`mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] ${inverted ? 'text-primary-light' : 'text-secondary'}`}>
        {eyebrow}
      </div>
      <h2 className={`font-serif text-3xl font-black tracking-tight sm:text-4xl ${inverted ? 'text-white' : 'text-accent'}`}>{title}</h2>
      <p className={`mt-3 text-base font-light leading-relaxed ${inverted ? 'text-white/75' : 'text-text-muted'}`}>{description}</p>
    </div>
  );
}

function NewsThumbnail({ src, fallback, alt }: { src: string; fallback: string; alt: string }) {
  const [imageSrc, setImageSrc] = React.useState(src);

  return (
    <img
      src={imageSrc}
      alt={alt}
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      onError={() => setImageSrc(assetPath(fallback))}
    />
  );
}

export default function CeritaListing() {
  const { language } = useLanguage();
  const id = language === 'id';

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="grow pb-20 pt-32">
        <section className="border-b border-bone/50 bg-bone/20 py-12 sm:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="max-w-4xl font-serif text-4xl font-black leading-tight tracking-tight text-accent sm:text-5xl lg:text-6xl">
              {id ? 'Cerita Medan Simpang dalam gambar dan suara' : 'Medan Simpang stories in pictures and sound'}
            </h1>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <SectionTitle
            eyebrow={<><Newspaper className="h-4 w-4" /> {id ? 'Liputan media' : 'Media coverage'}</>}
            title={id ? 'Medan Simpang dalam berita' : 'Medan Simpang in the news'}
            description={id
              ? 'Ikuti liputan kegiatan kami melalui media dan kanal resmi Universitas Sumatera Utara.'
              : 'Read coverage of our activities through the media and official Universitas Sumatera Utara channels.'}
          />

          <div className="grid gap-6 lg:grid-cols-2">
            {newsItems.map((news) => (
              <a
                key={news.href}
                href={news.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group overflow-hidden rounded-xl border border-bone/70 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-4"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-bone">
                  <NewsThumbnail
                    src={news.image}
                    fallback={news.fallbackImage}
                    alt={news.title}
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold uppercase tracking-wider">
                    <span className="text-secondary">{news.source}</span>
                    <span aria-hidden className="h-1 w-1 rounded-full bg-primary" />
                    <span className="text-text-muted">{news.date}</span>
                  </div>
                  <h3 className="text-balance font-serif text-xl font-bold leading-snug text-accent sm:text-2xl">{news.title}</h3>
                  <p className="mt-3 text-sm font-light leading-relaxed text-text-muted">
                    {id ? news.descriptionId : news.descriptionEn}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary-strong">
                    {id ? 'Baca berita' : 'Read article'}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow={<><Presentation className="h-4 w-4" /> {id ? 'Video presentasi' : 'Presentation videos'}</>}
            title={id ? 'Presentasi kegiatan' : 'Project presentations'}
            description={id
              ? 'Bagian ini telah disiapkan untuk video presentasi yang akan dimasukkan setelah materi final tersedia.'
              : 'This section is ready for presentation videos once the final materials are available.'}
          />

          <div className="grid gap-6 lg:grid-cols-2">
            {presentationSlots.map((slot) => (
              <article key={slot.titleId} className="group overflow-hidden rounded-3xl border border-bone/70 bg-white shadow-sm">
                <div className="relative aspect-video overflow-hidden bg-accent">
                  <img
                    src={assetPath(slot.image)}
                    alt={id ? slot.titleId : slot.titleEn}
                    className="h-full w-full object-cover opacity-55 transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-accent via-accent/20 to-transparent" />
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="grid h-14 w-14 place-items-center rounded-full border border-white/40 bg-white/15 text-white backdrop-blur-sm">
                      <Play className="h-6 w-6 translate-x-0.5" fill="currentColor" />
                    </span>
                  </div>
                  <span className="absolute left-5 top-5 rounded-full bg-background/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-accent shadow-sm">
                    {id ? 'Segera hadir' : 'Coming soon'}
                  </span>
                </div>
                <div className="p-6 sm:p-7">
                  <h3 className="font-serif text-2xl font-bold text-accent">{id ? slot.titleId : slot.titleEn}</h3>
                  <p className="mt-2 text-sm font-light leading-relaxed text-text-muted">
                    {id ? slot.descriptionId : slot.descriptionEn}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-bone/55 bg-accent py-16 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTitle
              eyebrow={<><Smartphone className="h-4 w-4" /> {id ? 'Video pendek' : 'Short videos'}</>}
              title={id ? 'Potongan perjalanan' : 'Moments from the journey'}
              description={id
                ? 'Slot video vertikal untuk cuplikan rute, suasana kawasan, dan cerita singkat dari lapangan.'
                : 'Vertical-video slots for route highlights, neighbourhood atmosphere, and short stories from the field.'}
              inverted
            />

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {shortVideoSlots.map((slot, index) => (
                <article key={slot.titleId} className="group relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/15 bg-white/5">
                  <img
                    src={assetPath(slot.image)}
                    alt={id ? slot.titleId : slot.titleEn}
                    className="h-full w-full object-cover opacity-55 transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-accent via-accent/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary-light">
                        0{index + 1}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                        <Clock3 className="h-3.5 w-3.5" /> {id ? 'Segera hadir' : 'Coming soon'}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl font-bold leading-tight">{id ? slot.titleId : slot.titleEn}</h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
