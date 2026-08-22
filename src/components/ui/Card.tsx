'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, Navigation } from 'lucide-react';
import { Kawasan, Walk, Cerita } from '@/types';
import { useLanguage } from '@/context/LanguageContext';

interface KawasanCardProps {
  kawasan: Kawasan;
}

export function KawasanCard({ kawasan }: KawasanCardProps) {
  const { language } = useLanguage();
  const tagline = language === 'id' ? kawasan.tagline_id : kawasan.tagline_en;

  return (
    <Link href={`/medansimpang/${kawasan.slug}`} className="group relative block overflow-hidden rounded-xl bg-white shadow-sm transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-secondary">
      <div className="relative h-44 w-full overflow-hidden bg-bone sm:h-48 lg:h-52">
        <Image
          src={kawasan.coverImage}
          alt={`${kawasan.name} — ${tagline}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 z-10 p-4 text-white sm:p-5">
          <div className="flex items-end justify-between gap-4">
            <h3 className="font-serif text-xl font-bold tracking-wide sm:text-2xl">{kawasan.name}</h3>
            <ArrowRight className="mb-1 h-5 w-5 shrink-0 text-primary-light transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </div>
          <p className="mt-1.5 line-clamp-2 max-w-xl text-sm font-medium leading-snug text-white/90">
            {tagline}
          </p>
        </div>
      </div>
    </Link>
  );
}

interface WalkCardProps {
  walk: Walk;
}

export function WalkCard({ walk }: WalkCardProps) {
  const { language } = useLanguage();
  const title = language === 'id' ? walk.title_id : walk.title_en;
  const description = language === 'id' ? walk.description_id : walk.description_en;
  const durationText = language === 'id' 
    ? `${walk.durationMinutes >= 60 ? `${(walk.durationMinutes / 60).toFixed(1)} jam` : `${walk.durationMinutes} menit`}`
    : `${walk.durationMinutes >= 60 ? `${(walk.durationMinutes / 60).toFixed(1)} hrs` : `${walk.durationMinutes} mins`}`;
  
  const distanceKm = (walk.distanceMeters / 1000).toFixed(1);
  const distanceText = language === 'id'
    ? `~${distanceKm} km (${walk.stepsCount} langkah)`
    : `~${distanceKm} km (${walk.stepsCount} steps)`;

  return (
    <Link href={`/medansimpang/walks/${walk.slug}`} className="group flex h-full flex-col overflow-hidden rounded-xl border border-bone/70 bg-white transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-secondary">
      <div className="relative h-36 w-full overflow-hidden bg-bone sm:h-40">
        <Image
          src={walk.heroImage}
          alt={`${title}, rute jalan kaki Medan Simpang`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="font-serif text-lg font-bold leading-snug text-accent transition-colors group-hover:text-secondary">
          {title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-accent/75">
          {description}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-bone/70 pt-3 text-xs font-semibold text-accent/70">
          <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-secondary" />{durationText}</span>
          <span className="inline-flex items-center gap-1.5"><Navigation className="h-3.5 w-3.5 text-secondary" />{distanceText}</span>
        </div>
      </div>
    </Link>
  );
}

interface CeritaCardProps {
  cerita: Cerita;
}

export function CeritaCard({ cerita }: CeritaCardProps) {
  const { language } = useLanguage();
  const title = language === 'id' ? cerita.title_id : cerita.title_en;
  const excerpt = language === 'id' ? cerita.excerpt_id : cerita.excerpt_en;
  const formattedDate = new Date(cerita.publishedDate).toLocaleDateString(
    language === 'id' ? 'id-ID' : 'en-US',
    { day: 'numeric', month: 'long', year: 'numeric' }
  );

  return (
    <Link href={`/medansimpang/cerita/${cerita.slug}`} className="group flex flex-col md:flex-row overflow-hidden rounded-xl border border-bone/60 bg-white transition-all duration-300 hover:shadow-md">
      <div className="relative h-48 w-full md:h-auto md:w-2/5 min-h-[192px] overflow-hidden bg-bone">
        <Image
          src={cerita.coverImage}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-103"
          sizes="(max-width: 768px) 100vw, 40vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {cerita.categories.map((cat, idx) => (
            <span key={idx} className="rounded-md bg-bone px-2 py-0.5 text-xs font-semibold text-accent/80 tracking-wide">
              {cat}
            </span>
          ))}
          <span className="text-xs text-gray-400 ml-auto">{formattedDate}</span>
        </div>
        
        <h3 className="font-serif text-lg md:text-xl font-bold text-accent group-hover:text-secondary transition-colors line-clamp-2">
          {title}
        </h3>
        
        <p className="mt-3 text-sm text-text-muted line-clamp-3 font-light leading-relaxed flex-1">
          {excerpt}
        </p>

        <div className="mt-4 text-xs font-bold text-secondary uppercase tracking-wider flex items-center group-hover:translate-x-1 transition-transform duration-300">
          {language === 'id' ? 'Baca cerita lengkap' : 'Read full story'} &rarr;
        </div>
      </div>
    </Link>
  );
}
