'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const { language } = useLanguage();

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 text-xs md:text-sm font-medium">
        <li className="inline-flex items-center">
          <Link
            href="/"
            className="inline-flex items-center text-text-muted hover:text-secondary transition-colors"
          >
            <Home className="mr-1.5 h-3.5 w-3.5" />
            {language === 'id' ? 'Jelajah Kota' : 'Explore City'}
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="inline-flex items-center">
              <ChevronRight className="h-4 w-4 text-gray-400 mx-1 md:mx-2" />
              {isLast || !item.path ? (
                <span className="text-accent font-bold truncate max-w-[150px] sm:max-w-xs">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.path}
                  className="text-text-muted hover:text-secondary transition-colors truncate max-w-[150px] sm:max-w-xs"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
