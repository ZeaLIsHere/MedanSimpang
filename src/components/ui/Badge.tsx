import React from 'react';
import { Eye, Utensils, Coffee, Compass } from 'lucide-react';
import { CategoryType } from '@/types';

interface BadgeProps {
  category: CategoryType;
  className?: string;
  lang?: 'id' | 'en';
}

export default function Badge({ category, className = '', lang = 'id' }: BadgeProps) {
  const getCategoryConfig = (cat: CategoryType) => {
    switch (cat) {
      case 'iSee':
        return {
          bg: 'bg-isee/10',
          text: 'text-isee border-isee/30',
          label: lang === 'id' ? 'Situs Heritage' : 'Heritage Site',
          icon: <Eye className="w-3.5 h-3.5 mr-1" />,
        };
      case 'iEat':
        return {
          bg: 'bg-ieat/10',
          text: 'text-ieat border-ieat/30',
          label: lang === 'id' ? 'Kuliner' : 'Culinary',
          icon: <Utensils className="w-3.5 h-3.5 mr-1" />,
        };
      case 'iDrink':
        return {
          bg: 'bg-idrink/10',
          text: 'text-idrink border-idrink/30',
          label: lang === 'id' ? 'Kedai Kopi/Minuman' : 'Drinks & Coffee',
          icon: <Coffee className="w-3.5 h-3.5 mr-1" />,
        };
      case 'iSurprise':
        return {
          bg: 'bg-isurprise/10',
          text: 'text-isurprise border-isurprise/30',
          label: lang === 'id' ? 'Unik & Tersembunyi' : 'Hidden Gem',
          icon: <Compass className="w-3.5 h-3.5 mr-1" />,
        };
    }
  };

  const config = getCategoryConfig(category);

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider border ${config.bg} ${config.text} ${className}`}
    >
      {config.icon}
      {config.label}
    </span>
  );
}
