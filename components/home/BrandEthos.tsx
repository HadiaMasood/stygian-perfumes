'use client';

import React from 'react';
import Link from 'next/link';
import { Moon, Flame, Sparkles, Feather, ArrowRight } from 'lucide-react';

export const BrandEthos: React.FC = () => {
  const pillars = [
    {
      icon: Moon,
      title: 'Nocturnal Hydro-Extraction',
      description:
        'Botanicals harvested strictly between dusk and dawn—capturing delicate volatile terpenes before sunlight evaporates their hypnotic magic.',
    },
    {
      icon: Flame,
      title: 'Aged Resins & Ancient Woods',
      description:
        'Wild frankincense tears and Royal Cambodian agarwood aged for over a decade in subterranean stone vaults to achieve smooth balsamic depth.',
    },
    {
      icon: Sparkles,
      title: 'Obsidian Ultraviolet Crystal',
      description:
        'Heavy French crystal engineered to shield high-concentration extraits from light degradation while honoring dark minimalist aesthetics.',
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-[#09090c] border-b border-white/5 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-[#c5a880] text-xs font-semibold uppercase tracking-[0.25em]">
            <Feather className="w-3.5 h-3.5" />
            <span>The Alchemy of the Shadows</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-medium text-neutral-100">
            Artisanal Craftsmanship Beyond Conventional Perfumery
          </h2>

          <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed max-w-xl mx-auto">
            We formulate each creation with up to 38% pure perfume oils, hand-poured in numbered batches with zero synthetic fillers.
          </p>
        </div>

        {/* 3 Pillars Grid with Generous Padding */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl p-8 sm:p-10 space-y-6 glass-card-hover group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#161825] border border-white/10 flex items-center justify-center text-[#c5a880] group-hover:bg-[#c5a880] group-hover:text-black transition-colors">
                  <Icon className="w-5 h-5" />
                </div>

                <div className="space-y-2.5">
                  <h3 className="font-serif-luxury text-xl font-medium text-neutral-100 group-hover:text-[#c5a880] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sensory Quote Box */}
        <div className="glass-card rounded-3xl p-8 sm:p-14 text-center max-w-3xl mx-auto space-y-5 shadow-2xl border-[#c5a880]/20">
          <span className="text-[#c5a880] text-3xl font-serif-luxury block">“</span>
          <p className="font-serif-luxury text-lg sm:text-2xl text-neutral-200 italic font-light leading-relaxed">
            A fragrance should not simply announce your arrival; it should captivate the senses and leave an unforgettable signature long after you depart.
          </p>
          <div className="text-xs uppercase tracking-[0.25em] text-[#8c6d48] font-medium pt-2">
            — Master Parfumeur, Stygian Atelier
          </div>
          <div className="pt-2">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#c5a880] hover:text-white uppercase tracking-[0.15em] transition-colors underline font-sans-luxury"
            >
              <span>Read The Full House Manifest</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
