'use client';

import React from 'react';
import Image from 'next/image';
import { ContentBlock } from '@/types';
import { Quote } from 'lucide-react';

interface ContentBlocksProps {
  blocks: ContentBlock[];
  language: 'id' | 'en';
}

export default function ContentBlocks({ blocks, language }: ContentBlocksProps) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="space-y-8">
      {blocks.map((block, index) => {
        const text = language === 'id' ? (block.text_id || block.text_en) : (block.text_en || block.text_id);
        const caption = language === 'id' ? (block.caption_id || block.caption_en) : (block.caption_en || block.caption_id);
        const author = language === 'id' ? (block.author_id || block.author_en) : (block.author_en || block.author_id);

        switch (block.type) {
          case 'heading':
            return (
              <h2
                key={index}
                className="font-serif text-2xl md:text-3xl font-bold text-accent tracking-wide mt-10 mb-4 border-b border-bone pb-2"
              >
                {text}
              </h2>
            );

          case 'paragraph':
            return (
              <p
                key={index}
                className="text-base md:text-lg text-text-main font-light leading-relaxed mb-6"
              >
                {text}
              </p>
            );

          case 'circle-image':
            return (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center gap-6 my-8 bg-bone/20 p-5 rounded-2xl border border-bone/40"
              >
                {block.imageUrl && (
                  <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-primary flex-shrink-0 shadow-sm">
                    <Image
                      src={block.imageUrl}
                      alt={caption || 'Content Image'}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 128px, 144px"
                    />
                  </div>
                )}
                <div className="flex-1 text-center sm:text-left">
                  <p className="text-sm md:text-base text-text-muted italic leading-relaxed font-light">
                    {caption}
                  </p>
                </div>
              </div>
            );

          case 'pull-quote':
            return (
              <div
                key={index}
                className="relative my-10 p-6 md:p-8 bg-bone/30 rounded-r-2xl border-l-8 border-primary shadow-sm"
              >
                <Quote className="absolute top-4 right-4 w-12 h-12 text-primary/10 -scale-x-100" />
                <blockquote className="font-serif text-lg md:text-xl italic text-accent font-semibold leading-relaxed">
                  {text}
                </blockquote>
                {author && (
                  <cite className="block mt-4 text-xs md:text-sm font-bold uppercase tracking-wider text-secondary not-italic">
                    — {author}
                  </cite>
                )}
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
