'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { useLanguage } from '@/context/LanguageContext';
import { Handshake } from 'lucide-react';

export default function MitraPage() {
  const { language } = useLanguage();

  const breadcrumbsItems = [
    { label: language === 'id' ? 'Tentang' : 'About' },
    { label: language === 'id' ? 'Mitra & Kontributor' : 'Partners & Contributors' },
  ];

  const partners = [
    {
      name: 'Tip Top Restaurant',
      category: language === 'id' ? 'Mitra Kuliner Legendaris' : 'Legendary Culinary Partner',
      logo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200&auto=format&fit=crop&q=80',
      description: language === 'id' 
        ? 'Restoran bersejarah di Kesawan yang membantu validasi resep jadul dan dokumentasi foto kuno.' 
        : 'Historic restaurant in Kesawan aiding in old recipes validation and archival photos sharing.',
    },
    {
      name: 'Medan Heritage Society',
      category: language === 'id' ? 'Komunitas Arsip & Sejarah' : 'Historical & Archival Group',
      logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&auto=format&fit=crop&q=80',
      description: language === 'id' 
        ? 'Kelompok riset independen yang menyediakan dokumen sejarah autentik untuk rute Kesawan.' 
        : 'Independent research group providing authentic historical documents for Kesawan route.',
    },
    {
      name: 'Dinas Kebudayaan Kota Medan',
      category: language === 'id' ? 'Instansi Pemerintah' : 'Government Agency',
      logo: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=200&auto=format&fit=crop&q=80',
      description: language === 'id' 
        ? 'Dukungan perizinan dan publikasi program pelestarian cagar budaya di kawasan Kesawan.' 
        : 'Providing permit support and publication of cultural heritage preservation in Kesawan.',
    },
    {
      name: 'Kopi Apek Hindu',
      category: language === 'id' ? 'Mitra UMKM Legendaris' : 'Legendary Coffee Shop Partner',
      logo: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?w=200&auto=format&fit=crop&q=80',
      description: language === 'id'
        ? 'Kedai kopi tertua di Medan yang menjadi tempat titik kumpul pemandu rute jalan kaki.'
        : 'Medan\'s oldest coffee shop serving as a meeting spot for walking trail guides.',
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
              <Handshake className="w-4 h-4" />
              Collaboration
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-black text-accent">
              {language === 'id' ? 'Mitra & Kontributor' : 'Partners & Contributors'}
            </h1>
            <p className="text-base sm:text-lg text-text-muted font-light max-w-2xl mx-auto leading-relaxed">
              {language === 'id'
                ? 'Kami bekerja sama dengan bisnis lokal legendaris, sejarawan independen, dan instansi kota untuk menyajikan peta rute yang akurat dan berdampak nyata.'
                : 'We collaborate with legendary local businesses, independent historians, and city bodies to bring you highly accurate and impactful trail guides.'}
            </p>
          </div>

          {/* Partners Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row gap-6 bg-white p-6 rounded-2xl border border-bone/60 shadow-sm items-center sm:items-start text-center sm:text-left hover:-translate-y-1 hover:shadow-md transition-all duration-300"
              >
                <div className="relative w-20 h-20 rounded-full overflow-hidden bg-bone flex-shrink-0 border border-bone">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-secondary uppercase tracking-wider block">
                    {partner.category}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-accent">{partner.name}</h3>
                  <p className="text-xs md:text-sm text-text-muted font-light leading-relaxed">
                    {partner.description}
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
