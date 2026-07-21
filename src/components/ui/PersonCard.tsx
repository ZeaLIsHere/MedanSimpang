'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { initials, type Person } from '@/data/ums';

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

  const avatarSize = featured ? 'h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]' : 'h-14 w-14';
  const nameSize = featured ? 'text-lg sm:text-xl' : 'text-base';

  const inner = (
    <>
      {/* Gradient-ring avatar */}
      <div className={`bg-gradient-to-br ${theme.ring} rounded-full p-[2px] shrink-0 transition-transform duration-300 group-hover:scale-105`}>
        <div className={`inline-flex ${avatarSize} items-center justify-center rounded-full ${theme.tint} font-serif font-bold ${featured ? 'text-2xl' : 'text-lg'} ring-2 ring-white`}>
          {initials(person.name)}
        </div>
      </div>

      {/* Name + meta */}
      <div className="min-w-0 flex-1">
        <p className={`font-semibold text-accent leading-tight ${nameSize} truncate`}>{person.name}</p>
        {person.role && (
          <p className="text-[11px] text-primary-strong font-bold uppercase tracking-widest mt-1">
            {person.role}
          </p>
        )}
        {person.affiliation && (
          <span className="mt-2 inline-block rounded-md bg-bone/70 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent/70">
            {person.affiliation}
          </span>
        )}
      </div>

      {/* Link affordance */}
      {clickable && (
        <span
          aria-hidden
          className="shrink-0 self-start rounded-full border border-bone/70 p-1.5 text-text-muted transition-all duration-300 group-hover:border-secondary/50 group-hover:bg-secondary/10 group-hover:text-secondary group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        >
          <ArrowUpRight className="h-4 w-4" />
        </span>
      )}
    </>
  );

  const base = `group relative flex items-center gap-4 rounded-2xl border bg-white shadow-sm transition-all duration-300 ${
    featured ? 'p-5 sm:p-6 border-primary/30' : 'p-4 border-bone/60'
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
