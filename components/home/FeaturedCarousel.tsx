'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS } from '@/data/products';
import { useCartStore } from '@/store/useCartStore';
import { useCurrencyStore } from '@/store/useCurrencyStore';
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Star,
} from 'lucide-react';

export const FeaturedCarousel: React.FC = () => {
  const featuredProducts = PRODUCTS.filter((p) => p.slug !== 'discovery-set');
  const [currentIndex, setCurrentIndex] = useState(0);

  const { addItem } = useCartStore();
  const { formatPrice } = useCurrencyStore();

  const currentProduct = featuredProducts[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? featuredProducts.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === featuredProducts.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 lg:py-28 bg-[#09090c] border-b border-white/5 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 text-[#c5a880] text-xs font-semibold uppercase tracking-[0.25em]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Signature Extraits</span>
            </div>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl lg:text-4xl font-medium text-neutral-100">
              The Signature Lineage
            </h2>
          </div>

          <div className="flex items-center gap-5">
            <Link
              href="/shop"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c5a880] hover:text-white flex items-center gap-1.5 transition-colors font-sans-luxury"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                className="w-8 h-8 rounded-full border border-white/10 bg-[#12131d] text-neutral-300 hover:text-white hover:border-[#c5a880] flex items-center justify-center transition-all shadow-md"
                aria-label="Previous fragrance"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleNext}
                className="w-8 h-8 rounded-full border border-white/10 bg-[#12131d] text-neutral-300 hover:text-white hover:border-[#c5a880] flex items-center justify-center transition-all shadow-md"
                aria-label="Next fragrance"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Featured Product Card - Compact & Balanced */}
        <div className="glass-card rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xl items-center p-6 lg:p-8 gap-8">
          {/* Visual Showcase (4 Cols) - Exact same compact scale */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="group relative bg-[#0e0f16] border border-white/5 hover:border-[#c5a880]/50 rounded-xl overflow-hidden transition-all duration-300 flex flex-col hover:shadow-xl w-full max-w-[260px]">
              {/* Badge */}
              <div className="absolute top-2.5 left-2.5 z-20 pointer-events-none">
                <span className="bg-[#09090c]/85 border border-[#c5a880]/40 text-[#c5a880] text-[8px] font-semibold uppercase tracking-[0.15em] px-2 py-0.5 rounded-full backdrop-blur-md">
                  {currentProduct.fragranceFamily}
                </span>
              </div>

              <div className="absolute top-2.5 right-2.5 z-20 bg-black/60 border border-white/10 backdrop-blur-md px-2 py-0.5 rounded-full flex items-center gap-1 text-[10px] text-[#c5a880]">
                <Star className="w-2.5 h-2.5 fill-current" />
                <span className="font-semibold text-neutral-100">{currentProduct.rating}</span>
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
              </Link>
            </div>
          </div>

          {/* Details Column (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#8c6d48] font-semibold block">
                  {currentProduct.concentration} • {currentProduct.volumes[0].size}
                </span>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-neutral-100 mt-1">
                  {currentProduct.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#c5a880] italic font-serif-luxury font-light mt-0.5">
                  {currentProduct.tagline}
                </p>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed font-light line-clamp-3">
                {currentProduct.story}
              </p>

              {/* Scent Structure Notes */}
              <div className="space-y-2 pt-1">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400 block">
                  Harmonic Note Structure
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div className="bg-[#12131d] border border-white/5 p-3 rounded-xl space-y-0.5">
                    <span className="text-[9px] text-neutral-500 uppercase tracking-widest block font-light">
                      Top
                    </span>
                    <span className="font-serif-luxury text-xs font-semibold text-neutral-200 block truncate">
                      {currentProduct.notes.top[0]?.name}
                    </span>
                  </div>

                  <div className="bg-[#14121c] border border-white/5 p-3 rounded-xl space-y-0.5">
                    <span className="text-[9px] text-[#9d6381] uppercase tracking-widest block font-light">
                      Heart
                    </span>
                    <span className="font-serif-luxury text-xs font-semibold text-neutral-200 block truncate">
                      {currentProduct.notes.heart[0]?.name}
                    </span>
                  </div>

                  <div className="bg-[#141318] border border-white/5 p-3 rounded-xl space-y-0.5">
                    <span className="text-[9px] text-[#8c6d48] uppercase tracking-widest block font-light">
                      Base
                    </span>
                    <span className="font-serif-luxury text-xs font-semibold text-neutral-200 block truncate">
                      {currentProduct.notes.base[0]?.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Price & Action Row */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[9px] text-neutral-500 uppercase tracking-widest block font-light">
                  Flacon Format: {currentProduct.volumes[0].size}
                </span>
                <span className="font-serif-luxury text-xl font-bold text-[#c5a880]">
                  {formatPrice(currentProduct.volumes[0].price)}
                </span>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <Link
                  href={`/shop/${currentProduct.slug}`}
                  className="flex-1 sm:flex-initial px-4 py-2 bg-[#141520] hover:bg-[#1c1e2d] border border-white/10 text-[10px] font-semibold uppercase tracking-[0.15em] text-neutral-200 rounded-lg text-center transition-colors font-sans-luxury"
                >
                  Full Profile
                </Link>

                <button
                  onClick={() => addItem(currentProduct, currentProduct.volumes[0])}
                  className="flex-1 sm:flex-initial px-4 py-2 bg-[#c5a880] hover:bg-[#d8be96] text-black font-semibold text-[10px] uppercase tracking-[0.15em] rounded-lg flex items-center justify-center gap-1.5 transition-all shadow font-sans-luxury"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add To Bag</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Selector Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
          {featuredProducts.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setCurrentIndex(idx)}
              className={`px-3 py-1.5 rounded-full border transition-all text-[11px] tracking-wider ${
                currentIndex === idx
                  ? 'border-[#c5a880] bg-[#1a1722] text-[#c5a880] font-semibold shadow'
                  : 'border-white/5 bg-[#101118] text-neutral-400 hover:text-white'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
