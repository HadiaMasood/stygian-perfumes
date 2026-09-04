'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS } from '@/data/products';
import { useCartStore } from '@/store/useCartStore';
import { useCurrencyStore } from '@/store/useCurrencyStore';
import { Sparkles, ShoppingBag, ShieldCheck } from 'lucide-react';

export const DiscoverySection: React.FC = () => {
  const discoveryProduct = PRODUCTS.find((p) => p.slug === 'discovery-set') || PRODUCTS[0];
  const { addItem } = useCartStore();
  const { formatPrice } = useCurrencyStore();

  const handleAddDiscovery = () => {
    addItem(discoveryProduct, discoveryProduct.volumes[0]);
  };

  return (
    <section className="py-20 lg:py-28 bg-[#09090c] border-b border-white/5 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-card rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xl border-[#c5a880]/20 items-center p-6 lg:p-8 gap-8">
          {/* Visual Left - Exact same compact card scale */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="group relative bg-[#0e0f16] border border-white/5 hover:border-[#c5a880]/50 rounded-xl overflow-hidden transition-all duration-300 flex flex-col hover:shadow-xl w-full max-w-[260px]">
              <div className="absolute top-2.5 left-2.5 z-20 pointer-events-none">
                <span className="bg-[#09090c]/85 border border-[#c5a880]/40 text-[#c5a880] text-[8px] font-semibold uppercase tracking-[0.15em] px-2 py-0.5 rounded-full backdrop-blur-md">
                  $95 Credit Voucher
                </span>
              </div>

              {/* Fitted Image Showcase */}
              <Link
                href="/shop/discovery-set"
                className="relative aspect-[4/5] w-full overflow-hidden block bg-[#11121a]"
              >
                <Image
                  src={discoveryProduct.images.primary}
                  alt="The Alchemist's Discovery Coffret"
                  fill
                  priority
                  sizes="260px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f16] via-transparent to-transparent opacity-60 pointer-events-none" />
              </Link>
            </div>
          </div>

          {/* Content Right (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-[#c5a880] text-xs font-semibold uppercase tracking-[0.25em]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Initiation Ritual</span>
              </div>

              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-neutral-100 leading-tight">
                The Alchemist&apos;s Discovery Coffret
              </h2>

              <p className="text-xs text-neutral-300 leading-relaxed font-light">
                Experience all six signature Stygian extraits in the sanctuary of your home. Each coffret contains six hand-numbered 5ml glass flacons nestled in black velvet, with tasting blotters and an embossed wax seal.
              </p>

              {/* Voucher Proposition Callout */}
              <div className="bg-[#12131d] border border-white/5 rounded-xl p-3.5 space-y-1">
                <span className="font-serif-luxury text-xs font-semibold text-[#e4caa4] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#c5a880]" />
                  100% Risk-Free Olfactory Exploration
                </span>
                <p className="text-[11px] text-neutral-400 font-light leading-relaxed">
                  Your coffret arrives with a <span className="text-[#c5a880] font-medium">{formatPrice(95)} credit voucher</span> valid toward your subsequent purchase of any full-size flacon.
                </p>
              </div>

              {/* Included Scents List */}
              <div className="space-y-1.5">
                <span className="text-[9px] text-neutral-500 uppercase tracking-[0.2em] block font-light">
                  Contains 6 x 5ml Miniature Flacons:
                </span>
                <div className="flex flex-wrap gap-1 text-xs text-neutral-300">
                  {['Wolfsbane', 'Belladonna', 'Nox Arcana', 'Obsidian Rose', 'Thanatos', "Hecate's Veil"].map((scent) => (
                    <span
                      key={scent}
                      className="bg-[#151722] border border-white/5 px-2.5 py-0.5 rounded-full text-[10px] font-light"
                    >
                      {scent}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Pricing and Action */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[9px] text-neutral-500 uppercase tracking-widest block font-light">
                  Complete Set + $95 Voucher
                </span>
                <span className="font-serif-luxury text-xl font-bold text-[#c5a880]">
                  {formatPrice(discoveryProduct.volumes[0].price)}
                </span>
              </div>

              <button
                onClick={handleAddDiscovery}
                className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-[#c5a880] to-[#dfc287] hover:from-[#d5b991] hover:to-[#ebd09b] text-black font-semibold text-[10px] tracking-[0.18em] uppercase rounded-lg flex items-center justify-center gap-1.5 shadow font-sans-luxury transition-all"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Acquire Discovery Coffret</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
