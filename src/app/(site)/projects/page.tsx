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
