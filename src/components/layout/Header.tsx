'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, Globe, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { getAllKawasan, getAllCeritaCategories } from '@/data/db';

export default function Header() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // States to keep track of desktop rendered dropdowns for exit animation
  const [exploreRendered, setExploreRendered] = useState(false);
  const [storiesRendered, setStoriesRendered] = useState(false);
  const [aboutRendered, setAboutRendered] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const kawasanList = getAllKawasan();
  const categories = getAllCeritaCategories();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'id' ? 'en' : 'id');
  };

  const handleDropdownToggle = (menu: string) => {
    if (menu === 'explore') setExploreRendered(true);
    if (menu === 'stories') setStoriesRendered(true);
    if (menu === 'about') setAboutRendered(true);

    if (activeDropdown === menu) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(menu);
    }
  };

  const navTranslations = {
    explore: language === 'id' ? 'Jelajah Kota' : 'Explore City',
    stories: language === 'id' ? 'Cerita' : 'Stories',
    academy: language === 'id' ? 'Akademi' : 'Academy',
    about: language === 'id' ? 'Tentang' : 'About',
    allStories: language === 'id' ? 'Semua Cerita' : 'All Stories',
  };

  const aboutSubLinks = [
    { label: language === 'id' ? 'Visi Kami' : 'Our Vision', path: '/medansimpang/tentang/visi' },
    { label: language === 'id' ? 'Mitra' : 'Partners', path: '/medansimpang/tentang/mitra' },
    { label: language === 'id' ? 'Tim' : 'Our Team', path: '/medansimpang/tentang/tim' },
    { label: language === 'id' ? 'Perjalanan' : 'Our Journey', path: '/medansimpang/tentang/perjalanan' },
    { label: language === 'id' ? 'Metodologi' : 'Methodology', path: '/medansimpang/tentang/metodologi' },
  ];

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isOpen
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-bone/45'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      {/* Umbrella parent bar — persistent way back to the UrbanMorphSoc site */}
      <div className="bg-accent text-white/90">
        <div className="w-full px-6 lg:px-12">
          <div className="flex h-8 items-center justify-between text-xs">
            <Link
              href="/"
              className="group inline-flex min-w-0 items-center gap-1.5 font-medium text-white/90 hover:text-primary-light transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:-translate-x-0.5" />
              <span className="truncate font-serif font-bold tracking-tight">Urban Morphology and Society</span>
            </Link>
          </div>
        </div>
      </div>

      <div
        className={`w-full px-6 lg:px-12 transition-all duration-300 ${
          scrolled || isOpen ? 'py-3' : 'py-4'
        }`}
      >
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/medansimpang" className="flex items-center group">
            <Image
              src="/images/logo.png"
              alt="Medan Simpang — Seen at Eye Level"
              width={200}
              height={59}
              className="h-12 md:h-16 w-auto transition-opacity group-hover:opacity-80"
              priority
            />
          </Link>

          {/* Desktop Navigation & Actions (Right Aligned) */}
          <div className="hidden lg:flex items-center space-x-8">
            <nav className="flex items-center space-x-8">
              {/* Jelajah Kota Dropdown */}
              <div className="relative">
                <button
                  onClick={() => handleDropdownToggle('explore')}
                  className="relative flex items-center text-sm font-semibold text-accent hover:text-secondary transition-colors py-2 after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:w-0 after:bg-secondary after:transition-all after:duration-300 hover:after:w-full hover:after:left-0"
                >
                  {navTranslations.explore}
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${activeDropdown === 'explore' ? 'rotate-180' : ''}`} />
                </button>
                {exploreRendered && (
                  <div
                    className={`absolute left-0 mt-2 w-56 origin-top-left rounded-xl bg-white p-2 shadow-lg border border-bone/60 ring-1 ring-black/5 ${
                      activeDropdown === 'explore'
                        ? 'animate-dropdown-enter visible'
                        : 'animate-dropdown-exit pointer-events-none'
                    }`}
                  >
                    {kawasanList.map((kawasan) => (
                      <Link
                        key={kawasan.slug}
                        href={`/medansimpang/${kawasan.slug}`}
                        onClick={() => setActiveDropdown(null)}
                        className="block rounded-lg px-4 py-2.5 text-sm font-medium text-text-main hover:bg-bone/40 hover:text-secondary transition-colors"
                      >
                        {kawasan.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Cerita Dropdown */}
              <div className="relative">
                <button
                  onClick={() => handleDropdownToggle('stories')}
                  className="relative flex items-center text-sm font-semibold text-accent hover:text-secondary transition-colors py-2 after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:w-0 after:bg-secondary after:transition-all after:duration-300 hover:after:w-full hover:after:left-0"
                >
                  {navTranslations.stories}
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${activeDropdown === 'stories' ? 'rotate-180' : ''}`} />
                </button>
                {storiesRendered && (
                  <div
                    className={`absolute left-0 mt-2 w-64 origin-top-left rounded-xl bg-white p-2 shadow-lg border border-bone/60 ring-1 ring-black/5 ${
                      activeDropdown === 'stories'
                        ? 'animate-dropdown-enter visible'
                        : 'animate-dropdown-exit pointer-events-none'
                    }`}
                  >
                    <Link
                      href="/medansimpang/cerita"
                      onClick={() => setActiveDropdown(null)}
                      className="block rounded-lg px-4 py-2.5 text-sm font-bold text-accent hover:bg-bone/40 hover:text-secondary border-b border-bone/20 pb-2 mb-1"
                    >
                      {navTranslations.allStories}
                    </Link>
                    {categories.map((cat) => (
                      <Link
                        key={cat}
                        href={`/medansimpang/cerita?kategori=${encodeURIComponent(cat.toLowerCase())}`}
                        onClick={() => setActiveDropdown(null)}
                        className="block rounded-lg px-4 py-2 text-sm font-medium text-text-main hover:bg-bone/40 hover:text-secondary transition-colors"
                      >
                        {cat}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Akademi (direct link placeholder) */}
              <Link
                href="/medansimpang/tentang/metodologi"
                className="relative text-sm font-semibold text-accent hover:text-secondary transition-colors py-2 after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:w-0 after:bg-secondary after:transition-all after:duration-300 hover:after:w-full hover:after:left-0"
              >
                {navTranslations.academy}
              </Link>

              {/* Tentang Dropdown */}
              <div className="relative">
                <button
                  onClick={() => handleDropdownToggle('about')}
                  className="relative flex items-center text-sm font-semibold text-accent hover:text-secondary transition-colors py-2 after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:w-0 after:bg-secondary after:transition-all after:duration-300 hover:after:w-full hover:after:left-0"
                >
                  {navTranslations.about}
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${activeDropdown === 'about' ? 'rotate-180' : ''}`} />
                </button>
                {aboutRendered && (
                  <div
                    className={`absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-white p-2 shadow-lg border border-bone/60 ring-1 ring-black/5 ${
                      activeDropdown === 'about'
                        ? 'animate-dropdown-enter visible'
                        : 'animate-dropdown-exit pointer-events-none'
                    }`}
                  >
                    {aboutSubLinks.map((link, idx) => (
                      <Link
                        key={idx}
                        href={link.path}
                        onClick={() => setActiveDropdown(null)}
                        className="block rounded-lg px-4 py-2.5 text-sm font-medium text-text-main hover:bg-bone/40 hover:text-secondary transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center rounded-lg border border-bone px-3 py-1.5 text-xs font-bold text-accent hover:bg-bone/30 transition-colors uppercase tracking-wider"
            >
              <Globe className="mr-1.5 h-3.5 w-3.5 text-secondary" />
              {language === 'id' ? 'EN' : 'ID'}
            </button>
          </div>

          {/* Mobile Menu & Language Toggle Row */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={toggleLanguage}
              className="flex items-center rounded-lg border border-bone px-2 py-1 text-xs font-bold text-accent hover:bg-bone/30 transition-colors uppercase tracking-wider"
            >
              {language === 'id' ? 'EN' : 'ID'}
            </button>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-accent hover:bg-bone/40 focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="lg:hidden absolute top-[112px] left-0 right-0 bg-white border-b border-bone/60 shadow-lg max-h-[calc(100vh-112px)] overflow-y-auto z-40 animate-fade-in">
          <div className="space-y-1 px-4 py-6">
            {/* Explore Section Accordion */}
            <div className="border-b border-bone/30 pb-3">
              <button
                onClick={() => handleDropdownToggle('explore')}
                className="flex w-full items-center justify-between py-2 text-base font-bold text-accent"
              >
                <span>{navTranslations.explore}</span>
                <ChevronDown
                  className={`h-5 w-5 text-text-muted transition-transform ${
                    activeDropdown === 'explore' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {activeDropdown === 'explore' && (
                <div className="mt-2 pl-4 space-y-2">
                  {kawasanList.map((k) => (
                    <Link
                      key={k.slug}
                      href={`/medansimpang/${k.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="block py-1.5 text-sm font-medium text-text-muted hover:text-secondary"
                    >
                      {k.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Stories Section Accordion */}
            <div className="border-b border-bone/30 py-3">
              <button
                onClick={() => handleDropdownToggle('stories')}
                className="flex w-full items-center justify-between py-2 text-base font-bold text-accent"
              >
                <span>{navTranslations.stories}</span>
                <ChevronDown
                  className={`h-5 w-5 text-text-muted transition-transform ${
                    activeDropdown === 'stories' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {activeDropdown === 'stories' && (
                <div className="mt-2 pl-4 space-y-2">
                  <Link
                    href="/medansimpang/cerita"
                    onClick={() => setIsOpen(false)}
                    className="block py-1.5 text-sm font-bold text-secondary"
                  >
                    {navTranslations.allStories}
                  </Link>
                  {categories.map((cat) => (
                    <Link
                      key={cat}
                      href={`/medansimpang/cerita?kategori=${encodeURIComponent(cat.toLowerCase())}`}
                      onClick={() => setIsOpen(false)}
                      className="block py-1.5 text-sm font-medium text-text-muted hover:text-secondary"
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Academy (direct) */}
            <div className="border-b border-bone/30 py-3">
              <Link
                href="/medansimpang/tentang/metodologi"
                onClick={() => setIsOpen(false)}
                className="block py-2 text-base font-bold text-accent"
              >
                {navTranslations.academy}
              </Link>
            </div>

            {/* About Section Accordion */}
            <div className="pb-3 py-3">
              <button
                onClick={() => handleDropdownToggle('about')}
                className="flex w-full items-center justify-between py-2 text-base font-bold text-accent"
              >
                <span>{navTranslations.about}</span>
                <ChevronDown
                  className={`h-5 w-5 text-text-muted transition-transform ${
                    activeDropdown === 'about' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {activeDropdown === 'about' && (
                <div className="mt-2 pl-4 space-y-2">
                  {aboutSubLinks.map((link, idx) => (
                    <Link
                      key={idx}
                      href={link.path}
                      onClick={() => setIsOpen(false)}
                      className="block py-1.5 text-sm font-medium text-text-muted hover:text-secondary"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
