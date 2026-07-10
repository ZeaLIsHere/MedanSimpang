'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Eye, Map, BookOpen } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import LandingHeader from '@/components/landing/LandingHeader';
import LandingFooter from '@/components/landing/LandingFooter';

export default function Landing() {
  const { language } = useLanguage();
  const id = language === 'id';

  const pillars = [
    {
      icon: <Eye className="h-6 w-6 text-secondary" />,
      title: id ? 'Level Mata' : 'Eye Level',
      body: id
        ? 'Kami membaca kota dari sudut pandang pejalan kaki — ruang, jalan, dan kehidupan sehari-hari.'
        : 'We read the city from the pedestrian’s view — its spaces, streets, and everyday life.',
    },
    {
      icon: <Map className="h-6 w-6 text-secondary" />,
      title: id ? 'Riset Ruang' : 'Spatial Research',
      body: id
        ? 'Mendokumentasikan bentuk dan morfologi kawasan urban lewat pemetaan dan penelusuran lapangan.'
        : 'Documenting the form and morphology of urban areas through mapping and fieldwork.',
    },
    {
      icon: <BookOpen className="h-6 w-6 text-secondary" />,
      title: id ? 'Cerita Kota' : 'City Stories',
      body: id
        ? 'Menceritakan sejarah, budaya, dan warga di balik setiap simpang dan gang.'
        : 'Telling the history, culture, and people behind every intersection and alley.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <LandingHeader />

      <main className="flex-grow">
        {/* Hero */}
        <section className="pt-36 pb-20 lg:pt-44 lg:pb-28">
          <div className="w-full px-6 lg:px-12 max-w-4xl">
            <p className="text-sm font-bold uppercase tracking-widest text-primary-strong mb-4">
              {id ? 'Kolektif Urban' : 'Urban Collective'}
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-black text-accent tracking-tight leading-none">
              Urban<span className="text-primary-strong">Morph</span>Soc
            </h1>
            <p className="mt-6 text-xl sm:text-2xl font-bold text-secondary">
              Seeing cities at eye level
            </p>
            <p className="mt-6 text-base sm:text-lg font-medium text-accent/90 leading-relaxed max-w-2xl">
              {id
                ? 'UrbanMorphSoc adalah wadah bagi project-project yang menjelajahi kota — dari heritage walk hingga riset ruang dan cerita warga. Setiap project mengajak Anda melihat kota lebih dekat.'
                : 'UrbanMorphSoc is a home for projects that explore the city — from heritage walks to spatial research and residents’ stories. Each project invites you to see the city up close.'}
            </p>
            <a
              href="#projects"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent/90 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              {id ? 'Lihat Project' : 'View Projects'}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-16 lg:py-20 bg-bone/25 border-y border-bone/40">
          <div className="w-full px-6 lg:px-12">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="font-serif text-3xl sm:text-4xl font-black text-accent tracking-tight">
                  {id ? 'Project' : 'Projects'}
                </h2>
                <p className="mt-2 text-sm text-text-muted font-light">
                  {id ? 'Karya yang sedang berjalan.' : 'Work currently underway.'}
                </p>
              </div>
            </div>

            <Link
              href="/medansimpang"
              className="group grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-2xl border border-bone/60 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md max-w-4xl"
            >
              <div className="relative h-56 md:h-auto md:min-h-[260px]">
                <Image
                  src="/images/silalas.jpg"
                  alt="Medan Simpang"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-2">
                  {id ? 'Heritage Walk · Medan' : 'Heritage Walk · Medan'}
                </p>
                <h3 className="font-serif text-2xl font-black text-accent">Medan Simpang</h3>
                <p className="mt-3 text-sm text-accent/80 leading-relaxed">
                  {id
                    ? 'Menjelajahi Kota Medan sebagai persimpangan budaya, etnis, dan kepercayaan — selangkah demi selangkah dari level mata.'
                    : 'Exploring Medan as an intersection of cultures, ethnicities, and beliefs — step by step, at eye level.'}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary-strong group-hover:gap-2.5 transition-all">
                  {id ? 'Jelajahi' : 'Explore'}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>

            <p className="mt-6 text-sm text-text-muted font-light italic">
              {id ? 'Lebih banyak project segera hadir.' : 'More projects coming soon.'}
            </p>
          </div>
        </section>

        {/* Stories */}
        <section id="stories" className="py-16 lg:py-24">
          <div className="w-full px-6 lg:px-12 max-w-3xl">
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-accent tracking-tight">
              {id ? 'Cerita' : 'Stories'}
            </h2>
            <p className="mt-4 text-base text-accent/85 leading-relaxed">
              {id
                ? 'Kisah sejarah, budaya, dan kehidupan kota yang kami temukan di lapangan. Mulai dari cerita-cerita Medan Simpang.'
                : 'Histories, cultures, and city life we uncover in the field. Start with the stories from Medan Simpang.'}
            </p>
            <Link
              href="/medansimpang/cerita"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent px-6 py-3 text-sm font-semibold text-accent hover:bg-accent hover:text-white transition-all"
            >
              {id ? 'Baca cerita kota kami' : 'Read our city stories'}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-16 lg:py-24 bg-bone/25 border-y border-bone/40">
          <div className="w-full px-6 lg:px-12">
            <div className="max-w-3xl">
              <h2 className="font-serif text-3xl sm:text-4xl font-black text-accent tracking-tight">
                {id ? 'Tentang' : 'About'}
              </h2>
              <p className="mt-4 text-base text-accent/85 leading-relaxed">
                {id
                  ? 'UrbanMorphSoc adalah kolektif yang mempelajari bagaimana kota terbentuk dan dihidupi. Kami menggabungkan riset morfologi urban, penelusuran lapangan, dan storytelling untuk membuat kota lebih mudah dibaca oleh siapa saja.'
                  : 'UrbanMorphSoc is a collective studying how cities take shape and are lived in. We combine urban morphology research, fieldwork, and storytelling to make the city legible to everyone.'}
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
              {pillars.map((p) => (
                <div key={p.title} className="rounded-2xl border border-bone/60 bg-white p-6 shadow-sm">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10">
                    {p.icon}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-accent">{p.title}</h3>
                  <p className="mt-2 text-sm text-accent/80 leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
