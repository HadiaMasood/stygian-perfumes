'use client';

import React from 'react';
import { Product } from '@/data/products';
import { Flame, Clock, Radio, Calendar } from 'lucide-react';

interface ScentMetricsProps {
  product: Product;
}

export const ScentMetrics: React.FC<ScentMetricsProps> = ({ product }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* Scent Intensity */}
      <div className="p-5 rounded-xl bg-[#11121a] border border-white/5 space-y-2.5">
        <div className="flex items-center gap-2 text-xs text-[#c5a880] uppercase tracking-[0.2em] font-semibold">
          <Flame className="w-3.5 h-3.5" />
          <span>Intensity</span>
        </div>
        <div className="flex items-center gap-1 py-1">
          {[1, 2, 3, 4, 5].map((level) => (
            <div
              key={level}
              className={`h-1.5 flex-1 rounded-full ${
                level <= product.intensity
                  ? 'bg-gradient-to-r from-[#8c6d48] to-[#c5a880]'
                  : 'bg-white/10'
              }`}
            />
          ))}
        </div>
        <p className="text-[11px] text-neutral-400 font-light">
          {product.intensity === 5
            ? 'Potent & Deeply Brooding'
            : product.intensity === 4
            ? 'Rich & Enveloping'
            : 'Subtle & Contemplative'}
        </p>
      </div>

      {/* Longevity */}
      <div className="p-5 rounded-xl bg-[#11121a] border border-white/5 space-y-2">
        <div className="flex items-center gap-2 text-xs text-[#c5a880] uppercase tracking-[0.2em] font-semibold">
          <Clock className="w-3.5 h-3.5" />
          <span>Longevity</span>
        </div>
        <div className="font-serif-luxury text-base font-semibold text-neutral-100">
          {product.longevity}
        </div>
        <p className="text-[11px] text-neutral-400 font-light">Pure Extrait Persistence</p>
      </div>

      {/* Sillage */}
      <div className="p-5 rounded-xl bg-[#11121a] border border-white/5 space-y-2">
        <div className="flex items-center gap-2 text-xs text-[#c5a880] uppercase tracking-[0.2em] font-semibold">
          <Radio className="w-3.5 h-3.5" />
          <span>Sillage Aura</span>
        </div>
        <div className="font-serif-luxury text-base font-semibold text-neutral-100">
          {product.sillage}
        </div>
        <p className="text-[11px] text-neutral-400 font-light">Hypnotic Scent Projection</p>
      </div>

      {/* Seasonality */}
      <div className="p-5 rounded-xl bg-[#11121a] border border-white/5 space-y-2">
        <div className="flex items-center gap-2 text-xs text-[#c5a880] uppercase tracking-[0.2em] font-semibold">
          <Calendar className="w-3.5 h-3.5" />
          <span>Optimal Aura</span>
        </div>
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {product.seasonality.map((season, idx) => (
            <span
              key={idx}
              className="text-[10px] bg-[#181926] text-neutral-300 px-2.5 py-0.5 rounded-full border border-white/5 font-light"
            >
              {season}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
