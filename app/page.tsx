import React from 'react';
import { Hero } from '@/components/home/Hero';
import { BrandEthos } from '@/components/home/BrandEthos';
import { FeaturedCarousel } from '@/components/home/FeaturedCarousel';
import { FragranceFamilies } from '@/components/home/FragranceFamilies';
import { DiscoverySection } from '@/components/home/DiscoverySection';
import { REVIEWS } from '@/data/products';
import { Star, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#09090c]">
      {/* 1. Cinematic Hero Section */}
      <Hero />

      {/* 2. Brand Ethos & Narrative Alchemy */}
      <BrandEthos />

      {/* 3. Featured Signature Scents Carousel */}
      <FeaturedCarousel />

      {/* 4. Olfactory Taxonomy & Fragrance Families */}
      <FragranceFamilies />

      {/* 5. The Alchemist's Discovery Coffret Ritual */}
      <DiscoverySection />

      {/* 6. Collector Testimonials & Dark Impressions */}
      <section className="py-24 lg:py-32 bg-[#09090c] border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 text-[#c5a880] text-xs font-semibold uppercase tracking-[0.25em]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Collector Chronicles</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-medium text-neutral-100">
              Echoes From The Initiates
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
              Unfiltered sensory impressions from haute perfumery collectors worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map((review) => (
              <div
                key={review.id}
                className="glass-card rounded-2xl p-8 space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex text-[#c5a880]">
                      {Array.from({ length: review.rating }).map((_, idx) => (
                        <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-[10px] text-[#c5a880] font-mono bg-[#181926] px-3 py-0.5 rounded-full border border-white/5">
                      {review.scent}
                    </span>
                  </div>

                  <h3 className="font-serif-luxury text-base font-semibold text-neutral-100">
                    &ldquo;{review.title}&rdquo;
                  </h3>

                  <p className="text-xs text-neutral-300 leading-relaxed font-light italic">
                    &ldquo;{review.content}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px]">
                  <span className="text-neutral-200 font-medium flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#c5a880]" />
                    {review.author}
                  </span>
                  <span className="text-neutral-500 font-light">{review.date}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Scent Diagnostic Callout */}
          <div className="glass-card rounded-3xl p-10 sm:p-14 text-center max-w-3xl mx-auto space-y-5 border-[#c5a880]/20">
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-neutral-100">
              Uncertain Which Aura Belongs To You?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-lg mx-auto leading-relaxed">
              Take our 60-second interactive diagnostic quiz and let the noctuary match your natural body chemistry.
            </p>
            <div className="pt-2">
              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#c5a880] hover:bg-[#d8be96] text-black font-semibold text-xs tracking-[0.2em] uppercase rounded-xl shadow-xl transition-all font-sans-luxury"
              >
                <span>Begin Scent Diagnostic</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
