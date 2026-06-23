'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Navigation, MapPin } from 'lucide-react';
import { Kawasan, Walk, Cerita } from '@/types';
import { useLanguage } from '@/context/LanguageContext';

interface KawasanCardProps {
  kawasan: Kawasan;
}

export function KawasanCard({ kawasan }: KawasanCardProps) {
  const { language } = useLanguage();
  const tagline = language === 'id' ? kawasan.tagline_id : kawasan.tagline_en;

  return (
    <Link href={`/kawasan/${kawasan.slug}`} className="group block relative overflow-hidden rounded-xl border border-bone/60 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="relative h-64 w-full overflow-hidden bg-bone">
        <Image
          src={kawasan.coverImage}
          alt={kawasan.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl font-bold tracking-wide">{kawasan.name}</h3>
            <span className="rounded-full bg-primary/20 border border-primary/40 px-3 py-1 text-xs font-semibold text-primary uppercase tracking-wider backdrop-blur-sm">
              {kawasan.walkCount} {language === 'id' ? 'Walk' : 'Walks'}
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-200 line-clamp-2 font-light">
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
    <Link href={`/walks/${walk.slug}`} className="group flex flex-col overflow-hidden rounded-xl border border-bone/60 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="relative h-48 w-full overflow-hidden bg-bone">
        <Image
          src={walk.heroImage}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
        />
        <div className="absolute top-4 left-4 rounded-md bg-accent/90 px-2.5 py-1 text-xs font-semibold text-white tracking-wider uppercase z-10">
          {walk.walkType}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-xl font-bold text-accent transition-colors group-hover:text-secondary">
          {title}
        </h3>
        <p className="mt-2 text-sm text-text-muted line-clamp-3 font-light leading-relaxed flex-1">
          {description}
        </p>
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
    <Link href={`/cerita/${cerita.slug}`} className="group flex flex-col md:flex-row overflow-hidden rounded-xl border border-bone/60 bg-white transition-all duration-300 hover:shadow-md">
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
