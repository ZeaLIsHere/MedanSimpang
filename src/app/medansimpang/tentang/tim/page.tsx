'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { useLanguage } from '@/context/LanguageContext';
import { Users, ArrowUpRight } from 'lucide-react';
import { umsHead, umsMembers, umsStudents, initials, type Person } from '@/data/ums';

// On-brand avatar themes — rotated so the roster reads as a set, not a wall of
// identical circles. Each entry pairs a gradient ring with a matching tint.
const avatarThemes = [
  { ring: 'from-secondary to-secondary/30', tint: 'bg-secondary/10 text-secondary' },
  { ring: 'from-isurprise to-isurprise/30', tint: 'bg-isurprise/10 text-isurprise' },
  { ring: 'from-ieat to-ieat/30', tint: 'bg-ieat/10 text-ieat' },
  { ring: 'from-isee to-isee/30', tint: 'bg-isee/10 text-isee' },
] as const;

const headTheme = { ring: 'from-primary to-primary-strong', tint: 'bg-primary/15 text-primary-strong' };

function PersonCard({
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

function SectionHeading({ label, count }: { label: string; count?: number }) {
  return (
    <div className="flex items-center gap-3">
      <h3 className="text-xs font-bold uppercase tracking-widest text-primary-strong whitespace-nowrap">
        {label}
      </h3>
      {typeof count === 'number' && count > 0 && (
        <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-secondary/10 px-1.5 text-[11px] font-bold text-secondary">
          {count}
        </span>
      )}
      <span className="h-px flex-1 bg-bone/60" />
    </div>
  );
}

export default function TimPage() {
  const { language } = useLanguage();
  const id = language === 'id';

  const breadcrumbsItems = [
    { label: language === 'id' ? 'Tentang' : 'About' },
    { label: language === 'id' ? 'Tim Kami' : 'Our Team' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow pt-32 pb-20">
        <div className="bg-bone/30 border-b border-bone/40 py-3 mb-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={breadcrumbsItems} />
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center space-y-4 mb-14 animate-fade-up">
            <span className="inline-flex items-center gap-1.5 bg-secondary/15 px-3 py-1 rounded-full text-xs font-bold text-secondary uppercase tracking-wider">
              <Users className="w-4 h-4" />
              People
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-black text-accent">
              {language === 'id' ? 'Tim Medan Simpang' : 'The Team behind Medan Simpang'}
            </h1>
            <p className="text-base sm:text-lg text-text-muted font-light max-w-2xl mx-auto leading-relaxed">
              {language === 'id'
                ? 'Orang-orang di balik pembuatan website Medan Simpang. Klik tiap nama untuk membuka profil mereka.'
                : 'The people behind the making of the Medan Simpang website. Click any name to open their profile.'}
            </p>
          </div>

          {/* Head */}
          <div className="space-y-3 animate-fade-up" style={{ animationDelay: '60ms' }}>
            <SectionHeading label={id ? 'Ketua' : 'Head'} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <PersonCard person={umsHead} featured />
            </div>
          </div>

          {/* Members */}
          <div className="mt-12 space-y-3 animate-fade-up" style={{ animationDelay: '120ms' }}>
            <SectionHeading label={id ? 'Anggota' : 'Members'} count={umsMembers.length} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {umsMembers.map((m, i) => (
                <div key={m.name} className="animate-fade-up" style={{ animationDelay: `${160 + i * 45}ms` }}>
                  <PersonCard person={m} index={i} />
                </div>
              ))}
            </div>
          </div>

          {/* Students */}
          <div className="mt-12 space-y-3 animate-fade-up" style={{ animationDelay: '200ms' }}>
            <SectionHeading label={id ? 'Mahasiswa' : 'Students'} count={umsStudents.length} />
            {umsStudents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {umsStudents.map((s, i) => (
                  <div key={s.name} className="animate-fade-up" style={{ animationDelay: `${i * 45}ms` }}>
                    <PersonCard person={s} index={i} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-bone/70 bg-bone/20 px-6 py-8 text-center">
                <p className="text-sm text-text-muted font-light italic">
                  {id ? 'Daftar mahasiswa akan segera ditambahkan.' : 'Student list coming soon.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
