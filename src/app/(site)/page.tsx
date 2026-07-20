'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, FolderOpen, BookOpen, Info } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { umsDescriptionFor } from '@/data/ums';

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
      {/* Hero — frontpage.webp background, ~50vh */}
      <section className="relative h-[50vh] min-h-[360px] flex items-end">
        <div className="absolute inset-0">
          <Image src="/images/frontpage.webp" alt="" fill priority fetchPriority="high" className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-accent/85 via-accent/45 to-accent/20" />
        </div>
        <div className="relative w-full px-6 lg:px-12 pb-10 lg:pb-14">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none break-words">
            Urban<span className="text-primary-light">Morph</span>Soc
          </h1>
          <p className="mt-3 text-base sm:text-lg md:text-xl font-semibold text-white/90">Urban Morphology and Society</p>
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
          <p className="text-base sm:text-lg font-medium text-accent/90 leading-relaxed">{umsDescriptionFor(language)}</p>
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
