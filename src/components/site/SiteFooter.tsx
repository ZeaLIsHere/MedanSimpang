'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { umsAddress } from '@/data/ums';

export default function SiteFooter() {
  const { language } = useLanguage();
  const id = language === 'id';

  const t = {
    mission: id
      ? 'Klaster riset yang mempelajari bagaimana masyarakat membentuk lingkungan binaan, dan sebaliknya.'
      : 'A research cluster studying how society shapes the built environment, and vice versa.',
    links: id ? 'Tautan' : 'Links',
    contact: id ? 'Kontak' : 'Contact',
  };

  const nav = [
    { href: '/', label: id ? 'Beranda' : 'Home' },
    { href: '/projects', label: id ? 'Project' : 'Projects' },
    { href: '/stories', label: id ? 'Cerita' : 'Stories' },
    { href: '/about', label: id ? 'Tentang' : 'About' },
  ];

  return (
    <footer className="bg-accent text-white border-t border-bone/10">
      <div className="w-full px-6 py-12 lg:px-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 pb-8 border-b border-bone/10">
          <div className="space-y-4">
            <p className="font-serif text-xl font-black tracking-tight leading-tight">
              Urban Morphology <span className="text-primary-light">and Society</span>
            </p>
            <p className="text-sm font-light text-gray-300 leading-relaxed max-w-xs">{t.mission}</p>
            <div className="flex space-x-4 pt-2">
              <a href="https://instagram.com/urbanmorphsoc" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-light transition-colors" aria-label="Instagram"><Instagram className="h-5 w-5" /></a>
              <a href="https://facebook.com/urbanmorphsoc" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-light transition-colors" aria-label="Facebook"><Facebook className="h-5 w-5" /></a>
              <a href="https://youtube.com/@urbanmorphsoc" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-light transition-colors" aria-label="YouTube"><Youtube className="h-5 w-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg font-bold text-primary-light mb-4">{t.links}</h4>
            <ul className="space-y-2 text-sm font-light text-gray-300">
              {nav.map((n) => (
                <li key={n.href}><Link href={n.href} className="hover:text-primary-light transition-colors">{n.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-bold text-primary-light mb-4">{t.contact}</h4>
            <div className="flex items-start text-sm font-light text-gray-300 mb-3">
              <MapPin className="mr-2 mt-0.5 h-4 w-4 shrink-0 text-primary-light" />
              <span>{umsAddress.dept}<br />{umsAddress.street}<br />{umsAddress.city}</span>
            </div>
            <a href={`mailto:${umsAddress.email}`} className="flex items-center text-sm font-light text-gray-300 hover:text-primary-light transition-colors">
              <Mail className="mr-2 h-4 w-4 text-primary-light" />{umsAddress.email}
            </a>
          </div>
        </div>

        <div className="mt-8 text-xs font-light text-gray-400">
          <p>© 2026 Urban Morphology and Society. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
