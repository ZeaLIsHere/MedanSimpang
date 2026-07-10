'use client';

import React from 'react';
import { Mail, Instagram, Facebook, Youtube } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function LandingFooter() {
  const { language } = useLanguage();

  const t = {
    mission: language === 'id'
      ? 'Wadah bagi project-project urban — heritage walk, riset, dan cerita kota. Melihat kota dari level mata.'
      : 'A home for urban projects — heritage walks, research, and city stories. Seeing cities at eye level.',
    links: language === 'id' ? 'Tautan' : 'Links',
    contact: language === 'id' ? 'Kontak' : 'Contact',
  };

  const nav = [
    { id: 'projects', label: 'Projects' },
    { id: 'stories', label: language === 'id' ? 'Cerita' : 'Stories' },
    { id: 'about', label: language === 'id' ? 'Tentang' : 'About' },
  ];

  return (
    <footer className="bg-accent text-white border-t border-bone/10">
      <div className="w-full px-6 py-12 lg:px-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 pb-8 border-b border-bone/10">
          <div className="space-y-4">
            <p className="font-serif text-2xl font-black tracking-tight">
              Urban<span className="text-primary-light">Morph</span>Soc
            </p>
            <p className="text-sm font-light text-gray-300 leading-relaxed max-w-xs">
              {t.mission}
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://instagram.com/urbanmorphsoc" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-light transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://facebook.com/urbanmorphsoc" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-light transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://youtube.com/@urbanmorphsoc" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-light transition-colors" aria-label="YouTube">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg font-bold text-primary-light mb-4">{t.links}</h4>
            <ul className="space-y-2 text-sm font-light text-gray-300">
              {nav.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="hover:text-primary-light transition-colors">{n.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-bold text-primary-light mb-4">{t.contact}</h4>
            <a href="mailto:urbanmorphsoc@gmail.com" className="flex items-center text-sm font-light text-gray-300 hover:text-primary-light transition-colors">
              <Mail className="mr-2 h-4 w-4 text-primary-light" />
              urbanmorphsoc@gmail.com
            </a>
          </div>
        </div>

        <div className="mt-8 text-xs font-light text-gray-400">
          <p>© 2026 UrbanMorphSoc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
