'use client';

import React from 'react';
import { Mail, MapPin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import {
  umsDescriptionFor,
  umsEstablishment,
  umsAddress,
  umsHead,
  umsMembers,
  umsStudents,
} from '@/data/ums';
import PersonCard from '@/components/ui/PersonCard';

export default function AboutPage() {
  const { language } = useLanguage();
  const id = language === 'id';

  return (
    <section className="pt-28 lg:pt-32 pb-20">
      <div className="w-full px-6 lg:px-12 max-w-4xl">
        <h1 className="font-serif text-4xl sm:text-5xl font-black text-accent tracking-tight">Urban Morphology and Society</h1>

        <p className="mt-6 text-base sm:text-lg font-medium text-accent/90 leading-relaxed">{umsDescriptionFor(language)}</p>

        <p className="mt-6 text-sm text-text-muted">
          <span className="font-bold text-accent">{id ? 'Pendirian resmi: ' : 'Officially established: '}</span>
          {id
            ? `Berdasarkan SK Rektor Universitas Sumatera Utara No. ${umsEstablishment.decree}, ${umsEstablishment.date}.`
            : `By Rector of Universitas Sumatera Utara decree No. ${umsEstablishment.decree}, ${umsEstablishment.date}.`}
        </p>

        {/* Address */}
        <div className="mt-10 max-w-xl">
          <div className="rounded-2xl border border-bone/60 bg-white p-6 shadow-sm">
            <h2 className="font-serif text-lg font-bold text-accent mb-3">{id ? 'Alamat' : 'Address'}</h2>
            <div className="flex items-start text-sm text-accent/80">
              <MapPin className="mr-2 mt-0.5 h-4 w-4 shrink-0 text-secondary" />
              <span>{umsAddress.dept}<br />{umsAddress.street}<br />{umsAddress.city}</span>
            </div>
            <a href={`mailto:${umsAddress.email}`} className="mt-3 flex items-center text-sm font-semibold text-secondary hover:text-primary-strong transition-colors">
              <Mail className="mr-2 h-4 w-4" />{umsAddress.email}
            </a>
          </div>
        </div>

        {/* People */}
        <div className="mt-14">
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-accent tracking-tight">{id ? 'Tim' : 'People'}</h2>

          <h3 className="mt-6 text-xs font-bold uppercase tracking-widest text-primary-strong">{id ? 'Ketua' : 'Head'}</h3>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
            <PersonCard person={umsHead} featured />
          </div>

          <h3 className="mt-8 text-xs font-bold uppercase tracking-widest text-primary-strong">{id ? 'Anggota' : 'Members'}</h3>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {umsMembers.map((m, i) => <PersonCard key={m.name} person={m} index={i} />)}
          </div>

          <h3 className="mt-8 text-xs font-bold uppercase tracking-widest text-primary-strong">{id ? 'Mahasiswa' : 'Students'}</h3>
          {umsStudents.length > 0 ? (
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {umsStudents.map((s, i) => <PersonCard key={s.name} person={s} index={i} />)}
            </div>
          ) : (
            <p className="mt-3 text-sm text-text-muted font-light italic">
              {id ? 'Daftar mahasiswa akan segera ditambahkan.' : 'Student list coming soon.'}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
