'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { initials, type Person } from '@/data/ums';
import { assetPath } from '@/lib/paths';

// On-brand avatar themes — rotated so a roster reads as a set, not a wall of
// identical circles. Each entry pairs a gradient ring with a matching tint.
const avatarThemes = [
  { ring: 'from-secondary to-secondary/30', tint: 'bg-secondary/10 text-secondary' },
  { ring: 'from-isurprise to-isurprise/30', tint: 'bg-isurprise/10 text-isurprise' },
  { ring: 'from-ieat to-ieat/30', tint: 'bg-ieat/10 text-ieat' },
  { ring: 'from-isee to-isee/30', tint: 'bg-isee/10 text-isee' },
] as const;

const headTheme = { ring: 'from-primary to-primary-strong', tint: 'bg-primary/15 text-primary-strong' };

export default function PersonCard({
  person,
  index = 0,
  featured = false,
}: {
  person: Person;
  index?: number;
  featured?: boolean;
}) {
  const theme = featured ? headTheme : avatarThemes[index % avatarThemes.length];
  const clickable = Boolean(person.link);

  const avatarSize = featured
    ? 'h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32'
    : 'h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28';
  const nameSize = featured ? 'text-base sm:text-lg md:text-xl font-bold' : 'text-sm sm:text-base font-semibold';
  const fontInitials = featured ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl';

  const inner = (
    <>
      {/* Clickable link indicator top right */}
      {clickable && (
        <span
          aria-hidden
          className="absolute top-3 right-3 rounded-full border border-bone/70 p-1.5 text-text-muted transition-all duration-300 group-hover:border-secondary/50 group-hover:bg-secondary/10 group-hover:text-secondary group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        >
          <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </span>
      )}

      {/* Gradient-ring avatar */}
      <div className={`bg-gradient-to-br ${theme.ring} rounded-full p-[3px] shrink-0 transition-transform duration-300 group-hover:scale-105 shadow-sm`}>
        <div className={`relative inline-flex ${avatarSize} items-center justify-center rounded-full ${theme.tint} font-serif ${fontInitials} ring-2 ring-white overflow-hidden shadow-inner`}>
          {person.photo ? (
            <img
              src={assetPath(person.photo)}
              alt={person.name}
              className="h-full w-full object-cover rounded-full"
            />
          ) : (
            initials(person.name)
          )}
        </div>
      </div>

      {/* Name + meta (Centered) */}
      <div className="w-full min-w-0 text-center flex flex-col items-center">
        <p className={`font-serif text-accent leading-snug ${nameSize} line-clamp-2`}>{person.name}</p>
        {person.role && (
          <p className="text-[10px] sm:text-[11px] text-primary-strong font-bold uppercase tracking-widest mt-1">
            {person.role}
          </p>
        )}
        {person.affiliation && (
          <span className="mt-2 inline-block rounded-md bg-bone/70 px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-accent/80">
            {person.affiliation}
          </span>
        )}
      </div>
    </>
  );

  const base = `group relative flex flex-col items-center text-center gap-3 rounded-2xl border bg-white shadow-sm transition-all duration-300 ${
    featured ? 'p-5 sm:p-6 md:p-8 border-primary/30' : 'p-4 sm:p-5 md:p-6 border-bone/60'
  }`;

  if (clickable) {
    return (
      <a
        href={person.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${person.name} — buka profil${person.affiliation ? ` di ${person.affiliation}` : ''} (tautan baru)`}
        className={`${base} cursor-pointer hover:-translate-y-1 hover:shadow-md hover:border-secondary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background`}
      >
        {inner}
      </a>
    );
  }

  return <div className={`${base} hover:shadow-md`}>{inner}</div>;
}
