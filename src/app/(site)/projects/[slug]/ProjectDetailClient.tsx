'use client';
/* eslint-disable @next/next/no-img-element -- local imagery is reliable in the static Hostinger export */

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, BookOpen, FileText, MapPin, Play } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { assetPath } from '@/lib/paths';
import type { ResearchProject, ResearchProjectSource } from '@/data/researchProjects';

function SourceIcon({ type }: { type: ResearchProjectSource['type'] }) {
  if (type === 'video') return <Play className="h-5 w-5 fill-current" aria-hidden="true" />;
  if (type === 'document') return <FileText className="h-5 w-5" aria-hidden="true" />;
  return <BookOpen className="h-5 w-5" aria-hidden="true" />;
}

export default function ProjectDetailClient({ project }: { project: ResearchProject }) {
  const { language } = useLanguage();
  const id = language === 'id';
  const descriptions = id ? project.descriptionId : project.descriptionEn;

  return (
    <article className="pb-20 pt-28 lg:pb-28 lg:pt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <Link
          href="/projects"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-accent transition-colors hover:text-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {id ? 'Semua project' : 'All projects'}
        </Link>

        <section className="mt-5 grid overflow-hidden rounded-2xl bg-accent text-white lg:grid-cols-[1.08fr_0.92fr]">
          <div className="relative min-h-[360px] overflow-hidden sm:min-h-[500px] lg:min-h-[620px]">
            <img
              src={assetPath(project.image)}
              alt={id ? project.imageAltId : project.imageAltEn}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-accent/75 via-transparent to-transparent lg:bg-linear-to-r lg:from-transparent lg:to-accent/30" />
          </div>

          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
            <div className="text-xs font-bold uppercase tracking-[0.12em] text-primary-light">
              <span>{id ? project.categoryId : project.categoryEn}</span>
            </div>
            <h1 className="mt-5 text-balance font-serif text-3xl font-black leading-tight tracking-[-0.03em] sm:text-4xl lg:text-5xl">
              {project.title}
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/85 sm:text-lg">
              {id ? project.summaryId : project.summaryEn}
            </p>
            <p className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white/75">
              <MapPin className="h-4 w-4 text-primary-light" aria-hidden="true" />
              {project.location}
            </p>
          </div>
        </section>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <section>
            <h2 className="font-serif text-3xl font-black tracking-[-0.025em] text-accent sm:text-4xl">
              {id ? 'Tentang project' : 'About the project'}
            </h2>
            <div className="mt-6 max-w-3xl space-y-5 text-base leading-relaxed text-accent/85 sm:text-lg">
              {descriptions.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </section>

          <aside className="self-start border-y border-bone py-2">
            {project.facts.map((fact) => (
              <div key={fact.labelEn} className="grid gap-1 border-b border-bone/75 py-5 last:border-b-0 sm:grid-cols-[140px_1fr] sm:gap-5">
                <dt className="text-sm text-accent/65">{id ? fact.labelId : fact.labelEn}</dt>
                <dd className="text-sm font-bold leading-relaxed text-accent">{fact.value}</dd>
              </div>
            ))}
          </aside>
        </div>

        <section className="mt-16 border-t border-bone pt-10">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <h2 className="font-serif text-3xl font-black tracking-[-0.025em] text-accent">
              {id ? 'Cerita dan sumber' : 'Stories and sources'}
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-accent/70">
              {id ? 'Baca dokumentasi dan sumber resmi yang mendasari project ini.' : 'Explore the documentation and official sources behind this project.'}
            </p>
          </div>

          <div className="mt-7 divide-y divide-bone border-y border-bone">
            {project.sources.map((source) => (
              <a
                key={source.href}
                href={assetPath(source.href)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-20 items-center justify-between gap-5 py-5 text-accent transition-colors hover:text-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
              >
                <span className="flex items-center gap-4 font-bold">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-bone/70 text-secondary">
                    <SourceIcon type={source.type} />
                  </span>
                  {id ? source.labelId : source.labelEn}
                </span>
                <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
              </a>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
