'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen, FolderOpen, Info } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { umsDescriptionFor } from '@/data/ums';
import VisitorAnalytics from '@/components/analytics/VisitorAnalytics';

export default function Landing() {
  const { language } = useLanguage();
  const id = language === 'id';

  const teasers = [
    {
      href: '/projects',
      icon: FolderOpen,
      title: id ? 'Project' : 'Projects',
      body: id ? 'Karya dan inisiatif riset kami, dimulai dari Medan Simpang.' : 'Our research work and initiatives, beginning with Medan Simpang.',
    },
    {
      href: '/stories',
      icon: BookOpen,
      title: id ? 'Cerita' : 'Stories',
      body: id ? 'Catatan lapangan tentang kota, ruang, dan kehidupan masyarakat.' : 'Field notes on cities, spaces, and everyday social life.',
    },
    {
      href: '/about',
      icon: Info,
      title: id ? 'Tentang' : 'About',
      body: id ? 'Kenali klaster riset, anggota, dan jejaring kolaborasi kami.' : 'Meet our research cluster, members, and collaborative network.',
    },
  ];

  return (
    <>
      <section className="relative flex min-h-[540px] items-end overflow-hidden sm:min-h-[620px] lg:h-[72vh] lg:max-h-[760px]">
        <div className="absolute inset-0">
          <Image
            src="/images/frontpage.webp"
            alt="Peta morfologi kawasan perkotaan"
            fill
            priority
            fetchPriority="high"
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-accent/55" />
          <div className="absolute inset-0 bg-linear-to-t from-accent/95 via-accent/35 to-transparent" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-6 pb-12 sm:pb-16 lg:px-12 lg:pb-20">
          <div className="max-w-4xl">
            <h1 className="max-w-full break-words font-serif text-5xl font-black leading-[0.95] tracking-[-0.035em] text-white sm:text-6xl md:text-7xl lg:text-8xl">
              <span className="block sm:inline">Urban </span>
              <span className="block text-primary-light sm:inline">Morphology</span>
              <span className="block">and Society</span>
            </h1>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-accent transition-all duration-200 hover:bg-primary-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-accent active:scale-[0.98]"
              >
                {id ? 'Jelajahi project' : 'Explore projects'}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex min-h-11 items-center rounded-full border border-white/45 px-6 py-3 text-sm font-bold text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {id ? 'Tentang kami' : 'About us'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-18 sm:py-22 lg:py-26">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[0.78fr_1.22fr] lg:gap-18 lg:px-12">
          <div className="min-w-0">
            <h2 className="text-balance font-serif text-3xl font-black leading-tight tracking-[-0.025em] text-accent sm:text-4xl lg:text-5xl">
              {id ? 'Kota selalu menyimpan jejak masyarakatnya.' : 'Every city carries the traces of its society.'}
            </h2>
          </div>
          <div className="min-w-0 lg:pt-2">
            <p className="max-w-3xl text-pretty text-base font-medium leading-8 text-accent/90 sm:text-lg">
              {umsDescriptionFor(language)}
            </p>
            <Link
              href="/about"
              className="group mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-secondary transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-4"
            >
              {id ? 'Selengkapnya tentang kami' : 'Learn more about us'}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <VisitorAnalytics />

      <section className="border-y border-bone/60 bg-bone/25 py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-bone/70 bg-bone/70 md:grid-cols-3">
            {teasers.map((teaser) => {
              const Icon = teaser.icon;
              return (
                <Link
                  key={teaser.href}
                  href={teaser.href}
                  className="group flex min-h-64 flex-col bg-white p-7 transition-colors duration-200 hover:bg-background focus-visible:relative focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary sm:p-8"
                >
                  <Icon className="h-7 w-7 text-secondary" />
                  <h3 className="mt-8 font-serif text-2xl font-bold text-accent">{teaser.title}</h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-accent/80">{teaser.body}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-bold text-primary-strong">
                    {id ? 'Buka halaman' : 'Open page'}
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
