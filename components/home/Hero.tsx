'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS } from '@/data/products';
import { useCartStore } from '@/store/useCartStore';
import { useCurrencyStore } from '@/store/useCurrencyStore';
import {
  Sparkles,
  ArrowRight,
  ShoppingBag,
  Compass,
} from 'lucide-react';

export const Hero: React.FC = () => {
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const heroProducts = [PRODUCTS[0], PRODUCTS[1]]; // Wolfsbane & Belladonna
  const currentProduct = heroProducts[activeHeroIndex];

  const { addItem } = useCartStore();
  const { formatPrice } = useCurrencyStore();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#09090c] border-b border-white/5 py-20 lg:py-28">
      {/* Soft atmospheric lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#c5a880]/5 rounded-full blur-[140px] animate-ambient-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#9e2a3b]/5 rounded-full blur-[160px] animate-ambient-glow" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Brand Statement */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full gold-badge text-xs uppercase tracking-[0.25em] font-medium backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#c5a880]" />
              <span>Extrait de Parfum • 35% Concentration</span>
            </div>

            <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-neutral-100 leading-[1.18]">
              Haute Parfumerie <br />
              <span className="gold-gradient-text italic font-light">Born In The Shadows</span>
            </h1>

            <p className="text-sm sm:text-base text-neutral-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
              Stygian distills rare nocturnal botanicals, ancient cathedral resins, and smoldering woods into high-concentration extrait formulations encased in obsidian crystal.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                href="/shop"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#c5a880] to-[#dfc287] hover:from-[#d5b991] hover:to-[#ebd09b] text-black font-semibold text-xs tracking-[0.2em] uppercase rounded-xl flex items-center justify-center gap-2 shadow-2xl transition-all duration-300 font-sans-luxury"
              >
                <span>Explore The Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/quiz"
                className="w-full sm:w-auto px-8 py-4 bg-[#12131d] hover:bg-[#1a1b28] text-neutral-200 hover:text-white border border-white/10 hover:border-[#c5a880]/50 rounded-xl text-xs tracking-[0.2em] uppercase font-semibold flex items-center justify-center gap-2 transition-all font-sans-luxury"
              >
                <Compass className="w-4 h-4 text-[#c5a880]" />
                <span>Find Your Scent Aura</span>
              </Link>
            </div>

            {/* Key Quality Assurances */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-6 text-center lg:text-left text-neutral-400">
              <div>
                <span className="font-serif-luxury text-lg font-semibold text-neutral-100 block">
                  35% Extrait
                </span>
                <span className="text-[10px] text-neutral-500 uppercase tracking-widest block mt-0.5 font-light">
                  18h+ Longevity
                </span>
              </div>
              <div>
                <span className="font-serif-luxury text-lg font-semibold text-neutral-100 block">
                  Grasse & London
                </span>
                <span className="text-[10px] text-neutral-500 uppercase tracking-widest block mt-0.5 font-light">
                  Artisanal Atelier
                </span>
              </div>
              <div>
                <span className="font-serif-luxury text-lg font-semibold text-neutral-100 block">
                  2 Free Vials
                </span>
                <span className="text-[10px] text-neutral-500 uppercase tracking-widest block mt-0.5 font-light">
                  With Every Order
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Signature Scent Showcase - Exact match to Shop Card size */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Switcher Buttons */}
            <div className="flex items-center justify-center gap-1 bg-[#0a0b10] p-1 rounded-xl border border-white/5 w-full max-w-[260px] mb-3">
              {heroProducts.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => setActiveHeroIndex(idx)}
                  className={`flex-1 py-1 px-2 rounded-lg text-[10px] font-semibold uppercase tracking-[0.12em] transition-all ${
                    activeHeroIndex === idx
                      ? 'bg-[#c5a880] text-black shadow-md'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>

            {/* Compact Showcase Card */}
            <div className="group relative bg-[#0e0f16] border border-white/5 hover:border-[#c5a880]/50 rounded-xl overflow-hidden transition-all duration-300 flex flex-col hover:shadow-xl w-full max-w-[260px]">
              {/* Badge */}
              <div className="absolute top-2.5 left-2.5 z-20 pointer-events-none">
                <span className="bg-[#09090c]/85 border border-[#c5a880]/40 text-[#c5a880] text-[8px] font-semibold uppercase tracking-[0.15em] px-2 py-0.5 rounded-full backdrop-blur-md">
                  Signature
                </span>
              </div>

              {/* Fitted Image Showcase */}
              <Link
                href={`/shop/${currentProduct.slug}`}
                className="relative aspect-[4/5] w-full overflow-hidden block bg-[#11121a]"
              >
                <Image
                  src={currentProduct.images.primary}
                  alt={currentProduct.name}
                  fill
                  priority
                  sizes="260px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f16] via-transparent to-transparent opacity-60 pointer-events-none" />

                <div className="absolute bottom-2.5 inset-x-3 space-y-0.5">
                  <span className="text-[8px] text-[#c5a880] uppercase tracking-[0.2em] block font-semibold">
                    {currentProduct.fragranceFamily}
                  </span>
                  <h3 className="font-serif-luxury text-sm font-semibold text-white truncate">
                    {currentProduct.name}
                  </h3>
                </div>
              </Link>

              {/* Content Area */}
              <div className="p-3 flex-1 flex flex-col justify-between space-y-2 bg-[#0e0f16]">
                <p className="text-[10px] text-neutral-400 italic font-light line-clamp-1">
                  {currentProduct.tagline}
                </p>

                {/* Notes Tags */}
                <div className="flex flex-wrap gap-1">
                  <span className="text-[8px] bg-[#141520] text-neutral-300 px-2 py-0.5 rounded-full border border-white/5 font-light">
                    {currentProduct.notes.top[0]?.name}
                  </span>
                  <span className="text-[8px] bg-[#1a1520] text-[#c5a880] px-2 py-0.5 rounded-full border border-[#c5a880]/20 font-light">
                    {currentProduct.notes.heart[0]?.name}
                  </span>
                </div>

                {/* Pricing & Actions */}
                <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-[8px] text-neutral-500 uppercase tracking-widest block font-light">
                      From 30ml
                    </span>
                    <span className="font-serif-luxury text-xs font-bold text-[#c5a880]">
                      {formatPrice(currentProduct.volumes[0].price)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Link
                      href={`/shop/${currentProduct.slug}`}
                      className="px-2 py-1 bg-[#141622] hover:bg-[#1d1f2e] text-[9px] font-semibold uppercase tracking-wider text-neutral-300 rounded border border-white/10 transition-colors"
                    >
                      Profile
                    </Link>

                    <button
                      onClick={() => addItem(currentProduct, currentProduct.volumes[0])}
                      className="px-2.5 py-1 bg-[#c5a880] hover:bg-[#d8be96] text-black font-semibold text-[9px] uppercase tracking-wider rounded transition-all shadow flex items-center gap-1 font-sans-luxury"
                    >
                      <ShoppingBag className="w-2.5 h-2.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
