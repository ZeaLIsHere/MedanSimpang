'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Gamepad2 } from 'lucide-react';
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

        <article className="mt-10 grid max-w-4xl grid-cols-1 overflow-hidden rounded-2xl border border-bone/60 bg-white shadow-sm md:grid-cols-2">
          <Link href="/medansimpang" className="group relative h-56 overflow-hidden md:h-auto md:min-h-65">
            <Image src="/images/silalas.webp" alt="Medan Simpang" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            <span className="sr-only">{id ? 'Jelajahi Medan Simpang' : 'Explore Medan Simpang'}</span>
          </Link>
          <div className="p-8 flex flex-col justify-center">
            <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">Heritage Walk · Medan</p>
            <h2 className="font-serif text-2xl font-black text-accent">
              <Link href="/medansimpang" className="transition-colors hover:text-secondary">Medan Simpang</Link>
            </h2>
            <p className="mt-3 text-sm text-accent/80 leading-relaxed">
              {id ? 'Menjelajahi Kota Medan sebagai persimpangan budaya, etnis, dan kepercayaan — selangkah demi selangkah dari level mata.' : 'Exploring Medan as an intersection of cultures, ethnicities, and beliefs — step by step, at eye level.'}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/medansimpang"
                className="group inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-bone px-4 py-2.5 text-sm font-bold text-primary-strong transition-colors hover:border-primary hover:bg-bone/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-strong"
              >
                {id ? 'Jelajahi' : 'Explore'}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/medansimpang/game"
                className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-secondary px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-isee focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
              >
                <Gamepad2 className="h-4 w-4" />
                {id ? 'Main Game' : 'Play Game'}
              </Link>
            </div>
          </div>
        </article>

        <p className="mt-6 text-sm text-text-muted font-light italic">
          {id ? 'Lebih banyak project segera hadir.' : 'More projects coming soon.'}
        </p>
      </div>
    </section>
  );
}
