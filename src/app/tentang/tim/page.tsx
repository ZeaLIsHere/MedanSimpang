'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { useLanguage } from '@/context/LanguageContext';
import { Users } from 'lucide-react';

export default function TimPage() {
  const { language } = useLanguage();

  const breadcrumbsItems = [
    { label: language === 'id' ? 'Tentang' : 'About' },
    { label: language === 'id' ? 'Tim Kami' : 'Our Team' },
  ];

  const team = [
    {
      name: 'Aditya Siregar',
      role: language === 'id' ? 'Pendiri & Koordinator Program' : 'Founder & Program Lead',
      photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80',
      bio: language === 'id'
        ? 'Arsitek dan pemerhati tata kota yang bermimpi mengembalikan budaya jalan kaki di Kota Medan.'
        : 'Architect and urbanist dreaming of revitalizing walking culture in the city of Medan.',
    },
    {
      name: 'Dr. Cut Nyak Mutia',
      role: language === 'id' ? 'Kurator Sejarah & Arsip' : 'Chief Historian & Archivist',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80',
      bio: language === 'id'
        ? 'Akademisi Universitas Sumatera Utara yang berfokus pada perkembangan arsitektur kolonial Deli.'
        : 'Academic at North Sumatra University specializing in Deli colonial architectural evolution.',
    },
    {
      name: 'Rian Sihotang',
      role: language === 'id' ? 'Desainer Grafis & Kartografer' : 'Lead Illustrator & Cartographer',
      photo: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=300&auto=format&fit=crop&q=80',
      bio: language === 'id'
        ? 'Seniman visual yang bertanggung jawab menggambar peta ilustrasi rute secara manual.'
        : 'Visual artist responsible for hand-drawing our signature illustrated trail maps.',
    },
    {
      name: 'Zarah Lubis',
      role: language === 'id' ? 'Pengembang Teknologi' : 'Full Stack Developer',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&auto=format&fit=crop&q=80',
      bio: language === 'id'
        ? 'Software engineer yang memastikan peta interaktif dan navigasi GPS bekerja mulus di jalanan.'
        : 'Software engineer ensuring interactive maps and GPS trails work seamlessly on street level.',
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow pt-24 pb-16">
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
                ? 'Kami adalah sekelompok warga lokal Medan — arsitek, akademisi, desainer, dan programmer — yang memiliki satu kegelisahan sama: melestarikan identitas cagar budaya kota kita.'
                : 'We are a collective of Medan locals — architects, historians, designers, and developers — sharing a single mission: conserving our city\'s heritage identity.'}
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white border border-bone/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col text-center"
              >
                <div className="relative h-60 w-full bg-bone overflow-hidden">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 250px"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-accent">{member.name}</h3>
                    <span className="text-[10px] font-bold text-secondary uppercase tracking-wider block mt-1">
                      {member.role}
                    </span>
                  </div>
                  <p className="text-xs text-text-muted font-light leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
