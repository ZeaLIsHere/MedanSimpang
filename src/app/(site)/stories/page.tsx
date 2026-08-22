'use client';

import Image from 'next/image';
import { ArrowUpRight, BookOpen, FileText, Play, Users } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { assetPath } from '@/lib/paths';

const ARTICLE_URL = 'https://www.iplbijournals.id/index.php/jlbi/article/view/429/332';
const VIDEO_URL = 'https://www.youtube.com/watch?v=YjoI0tpAdoc';
const RAJA_BILAH_STORY_URL = 'https://ft.usu.ac.id/id/berita/pengabdian-kepada-masyarakat-abdimas-revitalisasi-rumah-besar-raja-bilah';
const DECREE_URL = '/documents/equity-project-usu-2023.pdf';

export default function StoriesPage() {
  const { language } = useLanguage();
  const id = language === 'id';

  return (
    <section className="pb-20 pt-28 lg:pb-28 lg:pt-32">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        <header>
          <h1 className="font-serif text-5xl font-black tracking-[-0.03em] text-accent sm:text-6xl">
            {id ? 'Cerita' : 'Stories'}
          </h1>
          <p className="mt-2 max-w-3xl text-base font-medium leading-relaxed text-accent/80 sm:text-lg">
            {id
              ? 'Jejak penelitian, publikasi, dan kolaborasi Urban Morphology and Society.'
              : 'Research, publications, and collaborations by Urban Morphology and Society.'}
          </p>
        </header>

        <div className="mt-10 grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          <article className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-bone/70 bg-white shadow-[0_4px_8px_rgba(38,70,83,0.08)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(38,70,83,0.12)] motion-reduce:transition-none">
            <a
              href={ARTICLE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative block aspect-[4/3] overflow-hidden bg-accent focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-secondary"
              aria-label={id ? 'Baca artikel ilmiah tentang kampung Melayu di Medan' : 'Read the journal article about Malay kampung in Medan'}
            >
              <Image
                src="/images/frontpage.webp"
                alt={id ? 'Peta Kota Medan sebagai konteks penelitian morfologi kota' : 'Map of Medan as the context for urban morphology research'}
                fill
                priority
                className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-[1.025] motion-reduce:transition-none"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <span className="absolute inset-0 bg-linear-to-t from-accent/75 via-accent/15 to-transparent" aria-hidden="true" />
              <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-white backdrop-blur-sm">
                <BookOpen className="h-4 w-4" aria-hidden="true" />
                {id ? 'Artikel jurnal · 2025' : 'Journal article · 2025'}
              </span>
            </a>

            <div className="flex grow flex-col p-6 sm:p-7">
              <h2 className="text-balance font-serif text-2xl font-black leading-tight text-accent">
                The Change and Continuity in the Morphology of Traditional Malay Kampung
              </h2>
              <p className="mt-4 grow text-sm leading-relaxed text-accent/80 sm:text-base">
                {id
                  ? 'Kajian perubahan jalan, bangunan, dan ruang terbuka kampung Melayu tradisional di Medan dari 1913 hingga 2024.'
                  : 'A study of changes to streets, buildings, and open spaces in Medan’s traditional Malay kampung from 1913 to 2024.'}
              </p>
              <p className="mt-5 text-xs font-semibold leading-relaxed text-accent/60">
                Sri Elfina Panjaitan · Salmina Wati Ginting · Dwi Lindarto Hadinugroho
              </p>
              <a
                href={ARTICLE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex min-h-11 items-center justify-between gap-4 border-t border-bone pt-5 font-bold text-primary-strong transition-colors hover:text-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
              >
                {id ? 'Baca artikel' : 'Read article'}
                <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
              </a>
            </div>
          </article>

          <article className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-bone/70 bg-white shadow-[0_4px_8px_rgba(38,70,83,0.08)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(38,70,83,0.12)] motion-reduce:transition-none">
            <div className="relative flex aspect-[4/3] items-end overflow-hidden bg-bone/65 p-6 sm:p-7">
              <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full border border-secondary/15" aria-hidden="true" />
              <div className="absolute -right-4 -top-8 h-40 w-40 rounded-full border border-secondary/20" aria-hidden="true" />
              <div className="relative">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-secondary text-white">
                  <Users className="h-6 w-6" aria-hidden="true" />
                </span>
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.1em] text-primary-strong">
                  Equity Project USU · 2023
                </p>
              </div>
            </div>

            <div className="flex grow flex-col p-6 sm:p-7">
              <h2 className="text-balance font-serif text-2xl font-black leading-tight text-accent">
                The Morphology of Medan Multi-Ethnics
              </h2>
              <p className="mt-4 grow text-sm leading-relaxed text-accent/80 sm:text-base">
                {id
                  ? 'Proposal kluster keilmuan tentang konservasi, modifikasi, dan perubahan karakter kawasan multi-etnis Kota Medan.'
                  : 'A scientific-cluster proposal on conservation, modification, and change in Medan’s multi-ethnic neighbourhoods.'}
              </p>
              <dl className="mt-5 grid gap-3 border-t border-bone pt-4 text-xs sm:grid-cols-2">
                <div>
                  <dt className="text-accent/55">{id ? 'Ketua peneliti' : 'Lead researcher'}</dt>
                  <dd className="mt-1 font-bold text-accent">Salmina Wati Ginting</dd>
                </div>
                <div>
                  <dt className="text-accent/55">{id ? 'Mitra' : 'Partner'}</dt>
                  <dd className="mt-1 font-bold text-accent">Ulrike Herbig · TU Wien</dd>
                </div>
              </dl>
              <a
                href={assetPath(DECREE_URL)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex min-h-11 items-center justify-between gap-4 border-t border-bone pt-5 font-bold text-primary-strong transition-colors hover:text-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
              >
                <span className="inline-flex items-center gap-2">
                  <FileText className="h-5 w-5" aria-hidden="true" />
                  {id ? 'Lihat keputusan USU' : 'View USU decree'}
                </span>
                <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
              </a>
            </div>
          </article>

          <article className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-bone/70 bg-white shadow-[0_4px_8px_rgba(38,70,83,0.08)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(38,70,83,0.12)] motion-reduce:transition-none">
            <a
              href={VIDEO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative block aspect-[4/3] overflow-hidden bg-accent focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-secondary"
              aria-label={id ? 'Tonton video revitalisasi Rumah Besar Raja Bilah' : 'Watch the Rumah Besar Raja Bilah revitalisation video'}
            >
              <Image
                src="/images/community-service-malaysia-2025.jpg"
                alt={id ? 'Tim program pengabdian internasional di Rumah Besar Raja Bilah' : 'International community service team at Rumah Besar Raja Bilah'}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.025] motion-reduce:transition-none"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <span className="absolute inset-0 bg-linear-to-t from-accent/55 via-transparent to-transparent" aria-hidden="true" />
              <span className="absolute bottom-5 left-5 grid h-12 w-12 place-items-center rounded-full bg-primary text-accent shadow-md">
                <Play className="ml-0.5 h-5 w-5 fill-current" aria-hidden="true" />
              </span>
            </a>

            <div className="flex grow flex-col p-6 sm:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-secondary">
                {id ? 'Pengabdian internasional · 2025' : 'International community service · 2025'}
              </p>
              <h2 className="mt-3 text-balance font-serif text-2xl font-black leading-tight text-accent">
                {id ? 'Revitalisasi Rumah Besar Raja Bilah' : 'Revitalising Rumah Besar Raja Bilah'}
              </h2>
              <p className="mt-4 grow text-sm leading-relaxed text-accent/80 sm:text-base">
                {id
                  ? 'Kolaborasi USU, UiTM, dan Perak Heritage Society untuk menghubungkan kembali sejarah Indonesia–Malaysia.'
                  : 'A collaboration between USU, UiTM, and the Perak Heritage Society reconnecting Indonesian–Malaysian history.'}
              </p>
              <div className="mt-5 flex min-h-11 items-center justify-between gap-4 border-t border-bone pt-5">
                <a
                  href={RAJA_BILAH_STORY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 font-bold text-primary-strong transition-colors hover:text-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                >
                  {id ? 'Baca cerita' : 'Read story'}
                  <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                </a>
                <a
                  href={VIDEO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent text-white transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                  aria-label={id ? 'Tonton video' : 'Watch video'}
                >
                  <Play className="ml-0.5 h-4 w-4 fill-current" aria-hidden="true" />
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
