'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { useLanguage } from '@/context/LanguageContext';
import { Users } from 'lucide-react';
import { umsHead, umsMembers, umsStudents } from '@/data/ums';
import PersonCard from '@/components/ui/PersonCard';

function SectionHeading({ label, count }: { label: string; count?: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px flex-1 bg-bone/60" />
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

      <main className="grow pt-32 pb-20">
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
          <div className="space-y-4 animate-fade-up flex flex-col items-center" style={{ animationDelay: '60ms' }}>
            <div className="w-full">
              <SectionHeading label={id ? 'Ketua' : 'Head'} />
            </div>
            <div className="w-full max-w-xs sm:max-w-md">
              <PersonCard person={umsHead} featured />
            </div>
          </div>

          {/* Members */}
          <div className="mt-12 space-y-3 animate-fade-up" style={{ animationDelay: '120ms' }}>
            <SectionHeading label={id ? 'Anggota' : 'Members'} count={umsMembers.length} />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
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
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
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
