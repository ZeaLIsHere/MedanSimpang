'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { useLanguage } from '@/context/LanguageContext';
import { BookOpen, Eye, Users, ShieldAlert } from 'lucide-react';

export default function VisiPage() {
  const { language } = useLanguage();

  const breadcrumbsItems = [
    { label: language === 'id' ? 'Tentang' : 'About' },
    { label: language === 'id' ? 'Visi' : 'Vision' },
  ];

  const translations = {
    title: language === 'id' ? 'Visi & Misi Kami' : 'Our Vision & Mission',
    subtitle: language === 'id'
      ? 'Mengenal filosofi di balik tagline "Seen at eye level" dalam mendokumentasikan sudut Kota Medan.'
      : 'Understanding the philosophy behind our tagline "Seen at eye level" in documenting Medan.',
    philosophyTitle: language === 'id' ? 'Filosofi: "Seen at eye level"' : 'Philosophy: "Seen at eye level"',
    philosophyDesc1: language === 'id'
      ? 'Nama "Medan Simpang" terinspirasi dari banyaknya persimpangan jalan bersejarah di kota ini. Bagi kami, cara terbaik menikmati Medan bukanlah dari balik kaca mobil ber-AC yang melaju cepat, melainkan dengan berjalan kaki di level mata (eye level).'
      : 'The name "Medan Simpang" is inspired by the city\'s numerous historical intersections. For us, the best way to experience Medan is not from inside a fast, air-conditioned car, but on foot, at eye level.',
    philosophyDesc2: language === 'id'
      ? 'Dengan berjalan kaki, kita bisa melihat detail kecil yang biasanya terabaikan: ornamen ukiran kayu ruko tua yang memudar, aroma seduhan kopi robusta dari kedai kopi legendaris, senyuman hangat pedagang kaki lima, dan ritme kehidupan warga lokal. Jalan kaki memanusiakan kembali hubungan kita dengan ruang kota.'
      : 'By walking, we notice the small details that are otherwise forgotten: the fading wood carvings of old shophouses, the rich aroma of robusta brewing in legendary kopitiams, the warm smiles of street vendors, and the pace of local life. Walking humanizes our relationship with urban spaces.',
    missionTitle: language === 'id' ? 'Tiga Pilar Misi Kami' : 'Three Pillars of Our Mission',
    pilar1Title: language === 'id' ? 'Preservasi Digital Heritage' : 'Digital Heritage Preservation',
    pilar1Desc: language === 'id'
      ? 'Mendokumentasikan sejarah lisan, arsitektur, dan warisan budaya kawasan bersejarah Medan sebelum tergerus modernisasi.'
      : 'Documenting oral history, architecture, and cultural heritage of Medan\'s historic areas before they are lost to modernization.',
    pilar2Title: language === 'id' ? 'Dukungan Ekonomi Lokal' : 'Empowering Local Businesses',
    pilar2Desc: language === 'id'
      ? 'Mengarahkan langkah turis dan warga lokal ke UMKM kuliner klasik dan usaha warga setempat untuk menjaga keberlangsungan ekonomi lokal.'
      : 'Guiding tourists and locals to classic culinary small businesses and local shops to support the community economy.',
    pilar3Title: language === 'id' ? 'Edukasi & Komunitas' : 'Education & Community Outreach',
    pilar3Desc: language === 'id'
      ? 'Membangun kesadaran kolektif warga akan nilai sejarah kota mereka sendiri melalui peta rute fisik dan digital yang gratis diakses.'
      : 'Building collective citizen awareness of their city\'s history through free, accessible physical and digital maps.',
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow pt-24 pb-16">
        <div className="bg-bone/30 border-b border-bone/40 py-3 mb-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={breadcrumbsItems} />
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <h1 className="font-serif text-4xl sm:text-5xl font-black text-accent">{translations.title}</h1>
            <p className="text-base sm:text-lg text-text-muted font-light max-w-2xl mx-auto">
              {translations.subtitle}
            </p>
          </div>

          {/* Philosophy Section */}
          <section className="bg-white border border-bone/60 rounded-2xl p-6 sm:p-10 shadow-sm space-y-6 mb-12">
            <div className="flex items-center gap-3 border-b border-bone pb-4">
              <Eye className="w-6 h-6 text-secondary" />
              <h2 className="font-serif text-2xl font-bold text-accent">{translations.philosophyTitle}</h2>
            </div>
            <div className="space-y-4 text-base text-text-main font-light leading-relaxed">
              <p>{translations.philosophyDesc1}</p>
              <p>{translations.philosophyDesc2}</p>
            </div>
          </section>

          {/* Pillars Section */}
          <section className="space-y-6">
            <h2 className="font-serif text-2xl font-bold text-accent text-center mb-8">{translations.missionTitle}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-bone/20 border border-bone/50 rounded-xl p-6 space-y-3">
                <div className="w-10 h-10 rounded-full bg-secondary/15 flex items-center justify-center text-secondary">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-accent text-base">{translations.pilar1Title}</h3>
                <p className="text-xs text-text-muted font-light leading-relaxed">{translations.pilar1Desc}</p>
              </div>

              <div className="bg-bone/20 border border-bone/50 rounded-xl p-6 space-y-3">
                <div className="w-10 h-10 rounded-full bg-secondary/15 flex items-center justify-center text-secondary">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-accent text-base">{translations.pilar2Title}</h3>
                <p className="text-xs text-text-muted font-light leading-relaxed">{translations.pilar2Desc}</p>
              </div>

              <div className="bg-bone/20 border border-bone/50 rounded-xl p-6 space-y-3">
                <div className="w-10 h-10 rounded-full bg-secondary/15 flex items-center justify-center text-secondary">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-accent text-base">{translations.pilar3Title}</h3>
                <p className="text-xs text-text-muted font-light leading-relaxed">{translations.pilar3Desc}</p>
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
