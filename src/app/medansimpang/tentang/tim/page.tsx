'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { useLanguage } from '@/context/LanguageContext';
import { Users } from 'lucide-react';
import { umsHead, umsMembers, umsStudents, initials, type Person } from '@/data/ums';

function PersonCard({ person }: { person: Person }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-bone/60 bg-white p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-secondary/10 text-secondary font-serif font-bold text-lg shrink-0">
        {initials(person.name)}
      </div>
      <div>
        <p className="font-semibold text-accent leading-tight">{person.name}</p>
        {person.role && <p className="text-xs text-text-muted uppercase tracking-wider mt-0.5">{person.role}</p>}
      </div>
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

      <main className="flex-grow pt-32 pb-16">
        <div className="bg-bone/30 border-b border-bone/40 py-3 mb-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={breadcrumbsItems} />
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <span className="inline-flex items-center gap-1 bg-secondary/15 px-3 py-1 rounded-full text-xs font-bold text-secondary uppercase tracking-wider">
              <Users className="w-4 h-4" />
              People
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-black text-accent">
              {language === 'id' ? 'Tim Medan Simpang' : 'The Team behind Medan Simpang'}
            </h1>
            <p className="text-base sm:text-lg text-text-muted font-light max-w-2xl mx-auto leading-relaxed">
              {language === 'id'
                ? 'Orang-orang di balik pembuatan website Medan Simpang.'
                : 'The people behind the making of the Medan Simpang website.'}
            </p>
          </div>

          {/* Team */}
          <h3 className="text-xs font-bold uppercase tracking-widest text-primary-strong">{id ? 'Ketua' : 'Head'}</h3>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
            <PersonCard person={umsHead} />
          </div>

          <h3 className="mt-10 text-xs font-bold uppercase tracking-widest text-primary-strong">{id ? 'Anggota' : 'Members'}</h3>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {umsMembers.map((m) => <PersonCard key={m.name} person={m} />)}
          </div>

          <h3 className="mt-10 text-xs font-bold uppercase tracking-widest text-primary-strong">{id ? 'Mahasiswa' : 'Students'}</h3>
          {umsStudents.length > 0 ? (
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {umsStudents.map((s) => <PersonCard key={s.name} person={s} />)}
            </div>
          ) : (
            <p className="mt-3 text-sm text-text-muted font-light italic">
              {id ? 'Daftar mahasiswa akan segera ditambahkan.' : 'Student list coming soon.'}
            </p>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
