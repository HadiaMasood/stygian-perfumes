'use client';

import React, { useState } from 'react';
import { Product, ScentNote } from '@/data/products';
import { Sparkles, Wind, Flame, Compass } from 'lucide-react';

interface OlfactoryPyramidProps {
  product: Product;
}

export const OlfactoryPyramid: React.FC<OlfactoryPyramidProps> = ({ product }) => {
  const [activeNote, setActiveNote] = useState<ScentNote | null>(product.notes.top[0] || null);

  return (
    <div className="glass-card rounded-2xl p-8 sm:p-12 space-y-10">
      {/* Header */}
      <div className="space-y-2 border-b border-white/10 pb-6">
        <div className="inline-flex items-center gap-2 text-[#c5a880] text-xs font-semibold uppercase tracking-[0.25em]">
          <Compass className="w-3.5 h-3.5" />
          <span>Harmonic Olfactory Architecture</span>
        </div>
        <h3 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-neutral-100">
          The Scent Evolution & Note Pyramid
        </h3>
        <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-2xl leading-relaxed">
          Fragrance is a temporal ritual. Click any note below to reveal its botanical origin and sensory transformation over time.
        </p>
      </div>

      {/* Grid: 3 Tiers Left, Spotlight Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Note Tiers (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Top Notes */}
          <div className="p-5 rounded-xl bg-[#12131d] border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-serif-luxury text-xs font-semibold text-[#e4caa4] uppercase tracking-[0.2em] flex items-center gap-2">
                <Wind className="w-3.5 h-3.5 text-[#c5a880]" />
                Top Notes (Head)
              </span>
              <span className="text-[11px] text-neutral-500 font-light">0 — 20 Minutes • The First Impression</span>
            </div>
            <div className="flex flex-wrap gap-2.5 pt-1">
              {product.notes.top.map((note, idx) => {
                const isSelected = activeNote?.name === note.name;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveNote(note)}
                    className={`text-xs px-3.5 py-1.5 rounded-full border transition-all ${
                      isSelected
                        ? 'bg-[#c5a880] text-black font-semibold border-[#c5a880] shadow-lg scale-105'
                        : 'bg-[#181926] text-neutral-300 border-white/10 hover:border-[#c5a880]/60'
                    }`}
                  >
                    {note.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Heart Notes */}
          <div className="p-5 rounded-xl bg-[#14121c] border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-serif-luxury text-xs font-semibold text-[#e8a3b8] uppercase tracking-[0.2em] flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#9d6381]" />
                Heart Notes (Core Scent)
              </span>
              <span className="text-[11px] text-neutral-500 font-light">20 Mins — 4 Hours • The True Soul</span>
            </div>
            <div className="flex flex-wrap gap-2.5 pt-1">
              {product.notes.heart.map((note, idx) => {
                const isSelected = activeNote?.name === note.name;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveNote(note)}
                    className={`text-xs px-3.5 py-1.5 rounded-full border transition-all ${
                      isSelected
                        ? 'bg-[#9d6381] text-white font-semibold border-[#9d6381] shadow-lg scale-105'
                        : 'bg-[#1c1826] text-neutral-300 border-white/10 hover:border-[#9d6381]/60'
                    }`}
                  >
                    {note.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Base Notes */}
          <div className="p-5 rounded-xl bg-[#141318] border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-serif-luxury text-xs font-semibold text-[#e8b584] uppercase tracking-[0.2em] flex items-center gap-2">
                <Flame className="w-3.5 h-3.5 text-[#8c6d48]" />
                Base Notes (Soul & Sillage)
              </span>
              <span className="text-[11px] text-neutral-500 font-light">4 — 18+ Hours • The Lingering Memory</span>
            </div>
            <div className="flex flex-wrap gap-2.5 pt-1">
              {product.notes.base.map((note, idx) => {
                const isSelected = activeNote?.name === note.name;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveNote(note)}
                    className={`text-xs px-3.5 py-1.5 rounded-full border transition-all ${
                      isSelected
                        ? 'bg-[#8c6d48] text-white font-semibold border-[#8c6d48] shadow-lg scale-105'
                        : 'bg-[#1c1714] text-neutral-300 border-white/10 hover:border-[#8c6d48]/60'
                    }`}
                  >
                    {note.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Botanical Spotlight Panel (5 Cols) */}
        <div className="lg:col-span-5 bg-[#12131d] border border-white/10 rounded-xl p-7 flex flex-col justify-between min-h-[280px] shadow-xl">
          {activeNote ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a880] font-semibold">
                  Botanical Spotlight
                </span>
                <span className="text-[10px] px-3 py-1 rounded-full bg-[#1b1c2b] border border-white/10 text-neutral-300 uppercase tracking-widest">
                  {activeNote.category} Note
                </span>
              </div>

              <div className="space-y-2">
                <h4 className="font-serif-luxury text-2xl font-medium text-neutral-100">
                  {activeNote.name}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                  {activeNote.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 text-[11px] text-neutral-500 italic font-light">
                Cold-extracted in Grasse & London using low-temperature hydro-distillation.
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-xs text-neutral-500 italic">
              Select any note to examine its botanical character.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
