'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { RESEARCH_PROJECTS } from '@/data/researchProjects';

const PROJECTS = [
  {
    slug: 'medan-simpang',
    href: '/medansimpang',
    title: 'Medan Simpang',
    categoryId: 'Jelajah warisan · Medan',
    categoryEn: 'Heritage walk · Medan',
    image: '/images/silalas.webp',
    imageAltId: 'Rumah tradisional di kawasan Silalas, Medan',
    imageAltEn: 'Traditional houses in the Silalas neighbourhood of Medan',
    summaryId: 'Menjelajahi Kota Medan sebagai persimpangan budaya, etnis, dan kepercayaan—selangkah demi selangkah, dari level mata.',
    summaryEn: 'Exploring Medan as an intersection of cultures, ethnicities, and beliefs—step by step, at eye level.',
  },
  ...RESEARCH_PROJECTS.map((project) => ({
    ...project,
    href: `/projects/${project.slug}`,
  })),
];

export default function ProjectsPage() {
  const { language } = useLanguage();
  const id = language === 'id';

  return (
    <section className="pb-20 pt-28 lg:pb-28 lg:pt-32">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
        <header>
          <h1 className="font-serif text-5xl font-black tracking-[-0.03em] text-accent sm:text-6xl">
            {id ? 'Project' : 'Projects'}
          </h1>
          <p className="mt-2 max-w-2xl text-base font-medium leading-relaxed text-accent/80 sm:text-lg">
            {id
              ? 'Karya dan inisiatif Urban Morphology and Society.'
              : 'Work and initiatives by Urban Morphology and Society.'}
          </p>
        </header>

        <div className="mt-10 grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, index) => (
            <article
              key={project.slug}
              className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-bone/70 bg-white shadow-[0_4px_8px_rgba(38,70,83,0.08)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(38,70,83,0.12)] motion-reduce:transition-none"
            >
              <Link href={project.href} className="relative block aspect-[4/3] overflow-hidden bg-accent">
                <Image
                  src={project.image}
                  alt={id ? project.imageAltId : project.imageAltEn}
                  fill
                  priority={index === 0}
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.025] motion-reduce:transition-none"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <span className="sr-only">
                  {id ? `Buka project ${project.title}` : `Open ${project.title} project`}
                </span>
              </Link>

              <div className="flex grow flex-col p-6 sm:p-7">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-secondary">
                  {id ? project.categoryId : project.categoryEn}
                </p>
                <h2 className="mt-3 text-balance font-serif text-2xl font-black leading-tight text-accent sm:text-3xl">
                  <Link href={project.href} className="transition-colors hover:text-secondary">
                    {project.title}
                  </Link>
                </h2>
                <p className="mt-4 grow text-sm leading-relaxed text-accent/80 sm:text-base">
                  {id ? project.summaryId : project.summaryEn}
                </p>
                <Link
                  href={project.href}
                  className="mt-6 inline-flex min-h-11 items-center justify-between gap-4 border-t border-bone pt-5 font-bold text-primary-strong transition-colors hover:text-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                >
                  {id ? 'Jelajahi project' : 'Explore project'}
                  <ArrowUpRight
                    className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
