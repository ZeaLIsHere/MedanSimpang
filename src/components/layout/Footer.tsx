'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Instagram, Facebook, Youtube, Send } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getAllKawasan } from '@/data/db';

export default function Footer() {
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const currentYear = new Date().getFullYear();
  const kawasanList = getAllKawasan();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000); // Reset toast
    }
  };

  const translations = {
    tagline: language === 'id' ? 'Seen at eye level' : 'Seen at eye level',
    mission: language === 'id' 
      ? 'Melestarikan dan menampilkan kawasan bersejarah Kota Medan dari sudut pandang warganya sendiri. Menjelajahi setiap simpang dan gang kaki secara mendalam.'
      : 'Preserving and showcasing Medan\'s historical neighbourhoods from the perspective of its residents. Discovering every alleyway and intersection on foot.',
    explore: language === 'id' ? 'Jelajah Kota' : 'Explore City',
    stories: language === 'id' ? 'Cerita' : 'Stories',
    about: language === 'id' ? 'Tentang' : 'About',
    newsletterTitle: language === 'id' ? 'Berlangganan Warta' : 'Subscribe to Newsletter',
    newsletterDesc: language === 'id' 
      ? 'Dapatkan rute baru, kisah sejarah, dan info kuliner Medan langsung di pos-el Anda.'
      : 'Get new walks, historical stories, and Medan culinary recommendations directly in your inbox.',
    placeholder: language === 'id' ? 'Alamat email Anda' : 'Your email address',
    submit: language === 'id' ? 'Kirim' : 'Submit',
    success: language === 'id' ? 'Terima kasih telah berlangganan!' : 'Thank you for subscribing!',
    contact: language === 'id' ? 'Kontak' : 'Contact',
  };

  const aboutSubLinks = [
    { label: language === 'id' ? 'Visi Kami' : 'Our Vision', path: '/tentang/visi' },
    { label: language === 'id' ? 'Mitra' : 'Partners', path: '/tentang/mitra' },
    { label: language === 'id' ? 'Tim' : 'Our Team', path: '/tentang/tim' },
    { label: language === 'id' ? 'Perjalanan' : 'Our Journey', path: '/tentang/perjalanan' },
    { label: language === 'id' ? 'Metodologi' : 'Methodology', path: '/tentang/metodologi' },
  ];

  return (
    <footer className="bg-accent text-white border-t border-bone/10">
      <div className="w-full px-6 py-12 lg:px-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pb-8 border-b border-bone/10">
          
          {/* Column 1: Brand & Mission */}
          <div className="space-y-4">
            <Link href="/" className="inline-block flex flex-col">
              <span className="font-serif text-2xl font-black tracking-wider">
                MEDAN <span className="text-primary">SIMPANG</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-primary/80 mt-0.5 font-sans">
                {translations.tagline}
              </span>
            </Link>
            <p className="text-sm font-light text-gray-300 leading-relaxed max-w-xs">
              {translations.mission}
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="https://instagram.com/medansimpang"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com/medansimpang"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com/medansimpang"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Sitemap - Jelajah Kota */}
          <div>
            <h4 className="font-serif text-lg font-bold text-primary mb-4">{translations.explore}</h4>
            <ul className="space-y-2 text-sm font-light text-gray-300">
              {kawasanList.map((k) => (
                <li key={k.slug}>
                  <Link href={`/kawasan/${k.slug}`} className="hover:text-primary transition-colors">
                    {k.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Sitemap - Tentang & Kontak */}
          <div>
            <h4 className="font-serif text-lg font-bold text-primary mb-4">{translations.about}</h4>
            <ul className="space-y-2 text-sm font-light text-gray-300 mb-6">
              {aboutSubLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.path} className="hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="font-serif text-sm font-bold text-primary uppercase tracking-wider mb-2">{translations.contact}</h4>
            <a
              href="mailto:halo@medansimpang.com"
              className="flex items-center text-sm font-light text-gray-300 hover:text-primary transition-colors"
            >
              <Mail className="mr-2 h-4 w-4 text-primary" />
              halo@medansimpang.com
            </a>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-primary">{translations.newsletterTitle}</h4>
            <p className="text-sm font-light text-gray-300 leading-relaxed">
              {translations.newsletterDesc}
            </p>
            {subscribed ? (
              <div className="rounded-lg bg-primary/20 border border-primary/40 p-3 text-sm text-primary">
                {translations.success}
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  placeholder={translations.placeholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 rounded-lg bg-white/10 px-4 py-2 text-sm text-white placeholder-gray-400 border border-white/10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-accent hover:bg-primary/95 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
                >
                  <span>{translations.submit}</span>
                  <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-light text-gray-400 gap-4">
          <p>© {currentYear} Medan Simpang. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Powered by</span>
            <span className="font-semibold text-gray-300">Sumatra Heritage Community</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
