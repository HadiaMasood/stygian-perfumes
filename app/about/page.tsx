import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, ShieldCheck, Feather, Moon, Flame } from 'lucide-react';

export const metadata: Metadata = {
  title: 'The House & Artisanal Alchemy | Stygian Haute Parfumerie',
  description: 'The philosophy, rare nocturnal botanicals, and hand-poured crystalline craftsmanship behind Stygian.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#07080c] py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-[#c5a880] text-xs font-semibold uppercase tracking-[0.25em]">
            <Feather className="w-3.5 h-3.5" />
            <span>The House Manifest</span>
          </div>

          <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-100 leading-tight">
            The Philosophy of <br />
            <span className="gold-gradient-text italic font-normal">Haute Parfumerie</span>
          </h1>

          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-2xl mx-auto">
            Founded in the subterranean studios of London and formulated in the botanical fields of Grasse, Stygian was created to subvert the commercial banality of modern synthetic perfumery.
          </p>
        </div>

        {/* Narrative Block 1: The Alchemy of Shadows */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#12131d] border border-[#232637] shadow-2xl">
            <Image
              src="/images/stygian-marble-lifestyle.jpg"
              alt="Artisanal distillation and apothecary tinctures"
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover"
            />
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-[#c5a880] text-xs font-semibold uppercase tracking-widest">
              <Moon className="w-4 h-4" />
              <span>Chapter I: Nocturnal Foraging</span>
            </div>

            <h2 className="font-serif-luxury text-3xl font-bold text-neutral-100">
              Botanicals Harvested in Total Starlight
            </h2>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Certain poisonous and aromatic flora—such as Atropa belladonna, midnight tuberose, and wild aconite—retain their delicate indole terpenes only while the sun is beneath the horizon. Our harvesters work strictly under celestial light to capture these volatile essences before dawn evaporates their magic.
            </p>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              We employ centuries-old cold enfleurage and low-temperature hydro-distillation methods, preserving the fragile soul of every bloom without chemical solvents.
            </p>
          </div>
        </div>

        {/* Narrative Block 2: The Sacred Woods & Aged Resins */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1 space-y-6">
            <div className="inline-flex items-center gap-2 text-[#e6a15c] text-xs font-semibold uppercase tracking-widest">
              <Flame className="w-4 h-4" />
              <span>Chapter II: Resins & Agarwood</span>
            </div>

            <h2 className="font-serif-luxury text-3xl font-bold text-neutral-100">
              Resins Aged for Decades in Cold Stone Vaults
            </h2>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Our frankincense tears are gathered from wild Boswellia sacra trees in the Dhofar mountains of Oman, while our Royal Cambodian oud is matured in dark oak barrels for over ten years to develop a smooth, balsmic, non-animalic richness that vibrates on the skin like temple bells.
            </p>

            <div className="bg-[#10121a] border-l-2 border-[#c5a880] p-4 rounded-r-lg">
              <p className="text-xs text-neutral-300 italic">
                &ldquo;We formulate at 25% to 38% pure perfume oil concentration. No compromise, no water diluents, and no synthetic shortcuts.&rdquo;
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#12131d] border border-[#232637] shadow-2xl">
            <Image
              src="/images/stygian-nocturne-duo.jpg"
              alt="Sacred resins and hand-poured perfume bottles"
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover"
            />
          </div>
        </div>

        {/* Narrative Block 3: The Flacon Craftsmanship */}
        <div className="bg-gradient-to-r from-[#12141f] via-[#161726] to-[#12141f] border border-[#2b2e42] rounded-3xl p-8 sm:p-14 text-center space-y-6 shadow-2xl">
          <span className="font-serif-luxury text-xs text-[#c5a880] uppercase tracking-[0.3em] font-semibold block">
            Chapter III: Obsidian Glass Architecture
          </span>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-white max-w-2xl mx-auto">
            French Ultraviolet Glass & Hand-Stamped Wax Seals
          </h2>

          <p className="text-xs sm:text-sm text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            Every Stygian flacon is blown from heavy ultraviolet crystal that blocks the visible light spectrum while allowing beneficial infrared frequencies to permeate. Each bottle is hand-numbered, sealed with black botanical sealing wax, and presented in a velvet-lined coffret.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-8 text-xs text-neutral-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#c5a880]" />
              <span>100% Cruelty Free</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#c5a880]" />
              <span>Zero Phthalates & Parabens</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#c5a880]" />
              <span>Certified Sustainable Grasse Botanicals</span>
            </div>
          </div>

          <div className="pt-6">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#c5a880] hover:bg-[#d8be96] text-black font-semibold text-xs tracking-widest uppercase rounded-lg shadow-xl transition-all font-sans-luxury"
            >
              <span>Explore The Fragrance Lineage</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
