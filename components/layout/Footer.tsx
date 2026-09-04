'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ArrowRight, ShieldCheck, Mail } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useCartStore();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    showToast('You have been initiated into the Stygian Inner Circle.');
    setEmail('');
  };

  return (
    <footer className="bg-[#060608] border-t border-[#1c1e2b] text-neutral-400 font-sans-luxury">
      {/* Top VIP Invitation Row */}
      <div className="border-b border-[#181924]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-2">
              <div className="flex items-center gap-2 text-[#c5a880] text-xs font-semibold uppercase tracking-[0.2em]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Stygian Inner Circle</span>
              </div>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl text-neutral-100 tracking-wide">
                Initiate Your Senses Into Nocturnal Parfumerie
              </h3>
              <p className="text-xs text-neutral-400 max-w-lg leading-relaxed">
                Receive confidential notifications regarding limited small-batch flacon reserves, private collector events, and private formulation previews.
              </p>
            </div>

            <div className="lg:col-span-6">
              {subscribed ? (
                <div className="bg-[#12141d] border border-[#c5a880]/30 p-4 rounded text-center text-sm text-[#c5a880]">
                  ✦ Welcome. You are now inscribed in the Stygian private registry.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your confidential email..."
                      className="w-full bg-[#10121a] border border-[#27293a] pl-10 pr-4 py-3 text-xs text-neutral-200 placeholder-neutral-500 rounded focus:outline-none focus:border-[#c5a880] transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#c5a880] hover:bg-[#d8be96] text-black font-semibold text-xs tracking-widest uppercase rounded flex items-center justify-center gap-2 transition-all shadow-md shrink-0"
                  >
                    <span>Request Entry</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3.5 group">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#c5a880]/30 shadow-lg group-hover:border-[#c5a880] transition-all shrink-0 bg-[#06070a]">
                <Image
                  src="/images/logo.jpeg"
                  alt="Stygian Perfume Emblem"
                  fill
                  sizes="44px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div>
                <span className="font-serif-luxury text-2xl tracking-[0.25em] font-bold text-neutral-100 group-hover:text-[#c5a880] transition-colors block">
                  STYGIAN
                </span>
                <span className="text-[9px] tracking-[0.35em] uppercase text-[#8c6d48] group-hover:text-[#c5a880] transition-colors block">
                  HAUTE PARFUMERIE
                </span>
              </div>
            </Link>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Crafting dark, immersive olfactory poetry through cold-extracted nocturnal botanicals, precious aged resins, and hand-poured crystalline flacons.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#c5a880] pt-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Certified Cruelty-Free • 100% Artisanal Formulation</span>
            </div>
          </div>

          {/* Fragrances Col */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury text-xs font-semibold text-neutral-200 uppercase tracking-widest">
              Fragrance Lineage
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/shop/wolfsbane" className="hover:text-[#c5a880] transition-colors">
                  Wolfsbane (Extrait)
                </Link>
              </li>
              <li>
                <Link href="/shop/belladonna" className="hover:text-[#c5a880] transition-colors">
                  Belladonna (Eau de Parfum)
                </Link>
              </li>
              <li>
                <Link href="/shop/nox-arcana" className="hover:text-[#c5a880] transition-colors">
                  Nox Arcana (Extrait)
                </Link>
              </li>
              <li>
                <Link href="/shop/obsidian-rose" className="hover:text-[#c5a880] transition-colors">
                  Obsidian Rose (Parfum Intense)
                </Link>
              </li>
              <li>
                <Link href="/shop/thanatos" className="hover:text-[#c5a880] transition-colors">
                  Thanatos (Eau de Parfum)
                </Link>
              </li>
              <li>
                <Link href="/shop/discovery-set" className="text-[#c5a880] hover:underline transition-colors">
                  The Discovery Coffret
                </Link>
              </li>
            </ul>
          </div>

          {/* The House Col */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury text-xs font-semibold text-neutral-200 uppercase tracking-widest">
              The House
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-[#c5a880] transition-colors">
                  Artisanal Alchemy
                </Link>
              </li>
              <li>
                <Link href="/about#botanicals" className="hover:text-[#c5a880] transition-colors">
                  Rare Nocturnal Botanicals
                </Link>
              </li>
              <li>
                <Link href="/quiz" className="hover:text-[#c5a880] transition-colors">
                  Find Your Signature Scent
                </Link>
              </li>
              <li>
                <Link href="/about#sustainability" className="hover:text-[#c5a880] transition-colors">
                  Sustainable Glass & Ethics
                </Link>
              </li>
            </ul>
          </div>

          {/* Concierge Col */}
          <div className="space-y-3">
            <h4 className="font-serif-luxury text-xs font-semibold text-neutral-200 uppercase tracking-widest">
              Client Concierge
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="hover:text-[#c5a880] transition-colors cursor-pointer">
                Private Consultation
              </li>
              <li className="hover:text-[#c5a880] transition-colors cursor-pointer">
                Complimentary Sampling
              </li>
              <li className="hover:text-[#c5a880] transition-colors cursor-pointer">
                Worldwide Express Courier
              </li>
              <li className="hover:text-[#c5a880] transition-colors cursor-pointer">
                Bespoke Bottle Engraving
              </li>
              <li className="hover:text-[#c5a880] transition-colors cursor-pointer">
                Returns & Authenticity
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 mt-12 border-t border-[#181924] flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} STYGIAN HAUTE PARFUMERIE. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-neutral-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-neutral-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-neutral-400 cursor-pointer">Regulatory & IFRA Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
