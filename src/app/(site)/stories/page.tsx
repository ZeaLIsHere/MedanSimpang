'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function StoriesPage() {
  const { language } = useLanguage();
  const id = language === 'id';

  return (
    <section className="pt-28 lg:pt-32 pb-20">
      <div className="w-full px-6 lg:px-12 max-w-3xl">
        <h1 className="font-serif text-4xl sm:text-5xl font-black text-accent tracking-tight">{id ? 'Cerita' : 'Stories'}</h1>
        <p className="mt-4 text-base text-accent/85 leading-relaxed">
          {id ? 'Kisah sejarah, budaya, dan kehidupan kota yang kami temukan di lapangan. Saat ini cerita hadir melalui project Medan Simpang.' : 'Histories, cultures, and city life we uncover in the field. Stories currently live through the Medan Simpang project.'}
        </p>

        <Link
          href="/medansimpang/cerita"
          className="group mt-8 flex items-center gap-4 rounded-2xl border border-bone/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
        >
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 shrink-0"><BookOpen className="h-6 w-6 text-secondary" /></div>
          <div className="flex-grow">
            <h2 className="font-serif text-lg font-bold text-accent">{id ? 'Cerita Medan Simpang' : 'Medan Simpang Stories'}</h2>
            <p className="mt-1 text-sm text-accent/80">{id ? 'Baca kisah-kisah kota dari Medan Simpang.' : 'Read city stories from Medan Simpang.'}</p>
          </div>
          <ArrowRight className="h-5 w-5 text-primary-strong shrink-0 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
