'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const NAV = [
  { href: '/', id_label: 'Beranda', en_label: 'Home' },
  { href: '/projects', id_label: 'Project', en_label: 'Projects' },
  { href: '/stories', id_label: 'Cerita', en_label: 'Stories' },
  { href: '/about', id_label: 'Tentang', en_label: 'About' },
];

export default function SiteHeader() {
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const toggleLang = () => setLanguage(language === 'id' ? 'en' : 'id');
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-bone/45 py-3'
          : 'bg-white/80 backdrop-blur-sm py-4'
      }`}
    >
      <div className="w-full px-6 lg:px-12">
        <div className="flex h-14 items-center justify-between gap-4">
          <Link
            href="/"
            className="font-serif text-sm sm:text-base lg:text-lg font-black tracking-tight text-accent leading-tight max-w-[60%] lg:max-w-none"
          >
            Urban Morphology <span className="text-primary-strong">and Society</span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`relative text-sm font-semibold transition-colors py-2 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-secondary after:transition-all after:duration-300 ${
                  isActive(n.href)
                    ? 'text-secondary after:w-full'
                    : 'text-accent hover:text-secondary after:w-0 hover:after:w-full'
                }`}
              >
                {language === 'id' ? n.id_label : n.en_label}
              </Link>
            ))}
            <button
              onClick={toggleLang}
              className="flex items-center rounded-lg border border-bone px-3 py-1.5 text-xs font-bold text-accent hover:bg-bone/30 transition-colors uppercase tracking-wider"
            >
              <Globe className="mr-1.5 h-3.5 w-3.5 text-secondary" />
              {language === 'id' ? 'EN' : 'ID'}
            </button>
          </nav>

          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={toggleLang}
              className="flex items-center rounded-lg border border-bone px-2.5 py-1 text-xs font-bold text-accent hover:bg-bone/30 transition-colors uppercase tracking-wider"
            >
              {language === 'id' ? 'EN' : 'ID'}
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-accent hover:bg-bone/40 focus:outline-none"
              aria-expanded={open}
            >
              <span className="sr-only">Menu</span>
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div
          className="lg:hidden fixed inset-0 top-[70px] z-40 bg-black/40 backdrop-blur-sm animate-fade-in"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white border-b border-bone/60 shadow-2xl animate-drawer-enter rounded-b-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-6 space-y-2">
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center min-h-[44px] px-3 py-2 rounded-xl text-base font-bold transition-colors ${
                    isActive(n.href)
                      ? 'text-secondary bg-secondary/10'
                      : 'text-accent hover:bg-bone/40 hover:text-secondary'
                  }`}
                >
                  {language === 'id' ? n.id_label : n.en_label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
