'use client';

import React from 'react';
import { FRAGRANCE_FAMILIES } from '@/data/products';
import { Filter, X, RotateCcw, Flame } from 'lucide-react';

interface FilterSidebarProps {
  selectedFamily: string;
  setSelectedFamily: (family: string) => void;
  selectedConcentration: string;
  setSelectedConcentration: (conc: string) => void;
  selectedIntensity: number | null;
  setSelectedIntensity: (intensity: number | null) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  onReset: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedFamily,
  setSelectedFamily,
  selectedConcentration,
  setSelectedConcentration,
  selectedIntensity,
  setSelectedIntensity,
  sortBy,
  setSortBy,
  onReset,
}) => {
  const concentrations = [
    { label: 'All Concentrations', value: 'all' },
    { label: 'Extrait de Parfum (32-38%)', value: 'Extrait de Parfum' },
    { label: 'Eau de Parfum (24-26%)', value: 'Eau de Parfum' },
    { label: 'Parfum Intense (30%)', value: 'Parfum Intense' },
  ];

  return (
    <div className="bg-[#0b0c13] border border-[#1f212f] rounded-xl p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#1b1c28] pb-4">
        <div className="flex items-center gap-2 text-neutral-100 font-serif-luxury text-base font-semibold">
          <Filter className="w-4 h-4 text-[#c5a880]" />
          <span>Filter & Refine</span>
        </div>
        <button
          onClick={onReset}
          className="text-[11px] text-neutral-400 hover:text-[#c5a880] flex items-center gap-1 transition-colors uppercase tracking-wider"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Fragrance Family */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
          Olfactory Family
        </h4>
        <div className="space-y-1.5">
          {FRAGRANCE_FAMILIES.map((family) => {
            const isSelected = selectedFamily === family.slug;
            return (
              <button
                key={family.slug}
                onClick={() => setSelectedFamily(family.slug)}
                className={`w-full text-left px-3 py-2 rounded text-xs transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-[#191724] text-[#c5a880] font-semibold border border-[#c5a880]/30'
                    : 'text-neutral-400 hover:text-white hover:bg-[#12141e]'
                }`}
              >
                <span>{family.name}</span>
                {isSelected && <span className="text-[#c5a880] text-xs">●</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Concentration */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
          Concentration
        </h4>
        <div className="space-y-1.5">
          {concentrations.map((conc) => {
            const isSelected = selectedConcentration === conc.value;
            return (
              <button
                key={conc.value}
                onClick={() => setSelectedConcentration(conc.value)}
                className={`w-full text-left px-3 py-2 rounded text-xs transition-all ${
                  isSelected
                    ? 'bg-[#191724] text-[#c5a880] font-semibold border border-[#c5a880]/30'
                    : 'text-neutral-400 hover:text-white hover:bg-[#12141e]'
                }`}
              >
                {conc.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Scent Intensity */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
          Scent Intensity
        </h4>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'All', value: null },
            { label: 'Moderate', value: 3 },
            { label: 'Potent (5/5)', value: 5 },
          ].map((item, idx) => {
            const isSelected = selectedIntensity === item.value;
            return (
              <button
                key={idx}
                onClick={() => setSelectedIntensity(item.value)}
                className={`p-2 rounded text-center text-xs border transition-all ${
                  isSelected
                    ? 'border-[#c5a880] bg-[#1a1720] text-[#c5a880] font-semibold'
                    : 'border-[#222435] bg-[#12131d] text-neutral-400 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sorting */}
      <div className="space-y-3 pt-2 border-t border-[#1b1c28]">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
          Sort Order
        </h4>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full bg-[#12131d] border border-[#242738] text-xs text-neutral-200 rounded px-3 py-2.5 focus:outline-none focus:border-[#c5a880]"
        >
          <option value="featured">Featured / Artisanal Roster</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Collector Rating</option>
        </select>
      </div>
    </div>
  );
};
