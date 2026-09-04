'use client';

import React from 'react';
import Link from 'next/link';
import { FRAGRANCE_FAMILIES } from '@/data/products';
import { ArrowRight, Compass } from 'lucide-react';

export const FragranceFamilies: React.FC = () => {
  const families = FRAGRANCE_FAMILIES.filter((f) => f.slug !== 'all' && f.slug !== 'discovery-coffret');

  const familyVisuals: Record<string, { bg: string; border: string; accent: string; example: string }> = {
    'woody-smoky': {
      bg: 'from-[#191410] to-[#0c0d12]',
      border: 'hover:border-[#c5a880]/50',
      accent: 'text-[#c5a880]',
      example: 'Wolfsbane & Thanatos',
    },
    'floral-noir': {
      bg: 'from-[#1a1017] to-[#0c0d12]',
      border: 'hover:border-[#9d6381]/50',
      accent: 'text-[#9d6381]',
      example: 'Belladonna & Obsidian Rose',
    },
    'dark-resinous': {
      bg: 'from-[#1c140e] to-[#0c0d12]',
      border: 'hover:border-[#e6a15c]/50',
      accent: 'text-[#e6a15c]',
      example: 'Nox Arcana',
    },
    'oriental-amber': {
      bg: 'from-[#0e1713] to-[#0c0d12]',
      border: 'hover:border-[#6ea684]/50',
      accent: 'text-[#6ea684]',
      example: "Hecate's Veil",
    },
  };

  return (
    <section className="py-24 bg-[#08080c] border-b border-[#1b1c28]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 text-[#c5a880] text-xs font-semibold uppercase tracking-[0.25em]">
            <Compass className="w-3.5 h-3.5" />
            <span>Olfactory Taxonomy</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-neutral-100">
            Explore By Fragrance Family
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400">
            Find the dark harmonic family that mirrors your temperament and desires.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {families.map((fam) => {
            const visual = familyVisuals[fam.slug] || {
              bg: 'from-[#141520] to-[#0c0d12]',
              border: 'hover:border-[#c5a880]/50',
              accent: 'text-[#c5a880]',
              example: 'Signature Blends',
            };

            return (
              <Link
                key={fam.slug}
                href={`/shop?family=${fam.slug}`}
                className={`group bg-gradient-to-b ${visual.bg} border border-[#212334] ${visual.border} rounded-xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-xl min-h-[260px]`}
              >
                <div className="space-y-3">
                  <span className={`text-[11px] font-semibold uppercase tracking-widest ${visual.accent} block`}>
                    {visual.example}
                  </span>
                  <h3 className="font-serif-luxury text-xl font-bold text-neutral-100 group-hover:text-white transition-colors">
                    {fam.name}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {fam.description}
                  </p>
                </div>

                <div className="pt-6 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-neutral-300 group-hover:text-white transition-colors">
                  <span>Browse Collection</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
