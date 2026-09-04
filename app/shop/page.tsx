'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS, Product, FRAGRANCE_FAMILIES } from '@/data/products';
import { ProductCard } from '@/components/shop/ProductCard';
import { FilterSidebar } from '@/components/shop/FilterSidebar';
import { QuickViewModal } from '@/components/ui/QuickViewModal';
import { useWishlistStore } from '@/store/useWishlistStore';
import { Search, SlidersHorizontal, Sparkles, X } from 'lucide-react';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialFamily = searchParams.get('family') || 'all';
  const filterParam = searchParams.get('filter') || '';

  const [selectedFamily, setSelectedFamily] = useState<string>(initialFamily);
  const [selectedConcentration, setSelectedConcentration] = useState<string>('all');
  const [selectedIntensity, setSelectedIntensity] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const { items: wishlistItems } = useWishlistStore();
  const isWishlistOnly = filterParam === 'wishlist';

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (isWishlistOnly) {
      list = list.filter((p) => wishlistItems.includes(p.slug));
    }

    if (selectedFamily !== 'all') {
      const familyMap: Record<string, string> = {
        'woody-smoky': 'Woody Smoky',
        'floral-noir': 'Floral Noir',
        'dark-resinous': 'Dark Resinous',
        'oriental-amber': 'Oriental Amber',
        'discovery-coffret': 'Discovery Coffret',
      };
      const mapped = familyMap[selectedFamily];
      if (mapped) {
        list = list.filter((p) => p.fragranceFamily === mapped);
      }
    }

    if (selectedConcentration !== 'all') {
      list = list.filter((p) => p.concentration === selectedConcentration);
    }

    if (selectedIntensity !== null) {
      list = list.filter((p) => p.intensity === selectedIntensity);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.fragranceFamily.toLowerCase().includes(q) ||
          p.notes.top.some((n) => n.name.toLowerCase().includes(q)) ||
          p.notes.heart.some((n) => n.name.toLowerCase().includes(q)) ||
          p.notes.base.some((n) => n.name.toLowerCase().includes(q))
      );
    }

    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.volumes[0].price - b.volumes[0].price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.volumes[0].price - a.volumes[0].price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [
    selectedFamily,
    selectedConcentration,
    selectedIntensity,
    sortBy,
    searchQuery,
    isWishlistOnly,
    wishlistItems,
  ]);

  const handleResetFilters = () => {
    setSelectedFamily('all');
    setSelectedConcentration('all');
    setSelectedIntensity(null);
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="min-h-screen bg-[#09090c] py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Header with Generous Whitespace */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-[#c5a880] text-xs font-semibold uppercase tracking-[0.25em]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {isWishlistOnly ? 'Your Private Scent Sanctuary' : 'The Haute Parfumerie Codex'}
            </span>
          </div>

          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-medium tracking-tight text-neutral-100">
            {isWishlistOnly ? 'Saved Fragrance Registry' : 'The Stygian Collection'}
          </h1>

          <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
            {isWishlistOnly
              ? 'Your personally reserved nocturnal extrait selections.'
              : 'Six signature extrait formulations and the complete Discovery Coffret.'}
          </p>
        </div>

        {/* Quick Family Filter Pills Bar */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
          {FRAGRANCE_FAMILIES.map((fam) => {
            const isSelected = selectedFamily === fam.slug;
            return (
              <button
                key={fam.slug}
                onClick={() => setSelectedFamily(fam.slug)}
                className={`px-4 py-2 rounded-full text-xs tracking-wider transition-all whitespace-nowrap ${
                  isSelected
                    ? 'border border-[#c5a880] bg-[#1a1722] text-[#c5a880] font-medium shadow-md'
                    : 'border border-white/5 bg-[#101118] text-neutral-400 hover:text-white'
                }`}
              >
                {fam.name}
              </button>
            );
          })}
        </div>

        {/* Search Bar & Mobile Trigger Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-card p-4 rounded-2xl">
          <div className="relative w-full sm:w-88">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by note or name (e.g. Wolfsbane, Cedar, Plum)..."
              className="w-full bg-[#0a0b10] border border-white/10 pl-10 pr-4 py-2.5 text-xs text-neutral-200 placeholder-neutral-500 rounded-xl focus:outline-none focus:border-[#c5a880] font-light"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
            <span className="text-xs text-neutral-400 font-light">
              Showing <span className="text-neutral-100 font-medium">{filteredProducts.length}</span>{' '}
              {filteredProducts.length === 1 ? 'Creation' : 'Creations'}
            </span>

            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="lg:hidden px-4 py-2.5 bg-[#141522] border border-white/10 text-xs font-semibold uppercase tracking-wider text-neutral-200 rounded-xl flex items-center gap-2"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#c5a880]" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Catalog Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Desktop Filter Sidebar (3 Cols) */}
          <div className="hidden lg:block lg:col-span-3">
            <FilterSidebar
              selectedFamily={selectedFamily}
              setSelectedFamily={setSelectedFamily}
              selectedConcentration={selectedConcentration}
              setSelectedConcentration={setSelectedConcentration}
              selectedIntensity={selectedIntensity}
              setSelectedIntensity={setSelectedIntensity}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onReset={handleResetFilters}
            />
          </div>

          {/* Mobile Filter Modal */}
          {showMobileFilters && (
            <div className="fixed inset-0 z-50 lg:hidden flex">
              <div
                onClick={() => setShowMobileFilters(false)}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm"
              />
              <div className="relative ml-auto w-full max-w-xs bg-[#0c0d14] h-full p-6 overflow-y-auto z-10 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif-luxury text-lg text-white">Refine Catalog</h3>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="p-1 text-neutral-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <FilterSidebar
                  selectedFamily={selectedFamily}
                  setSelectedFamily={setSelectedFamily}
                  selectedConcentration={selectedConcentration}
                  setSelectedConcentration={setSelectedConcentration}
                  selectedIntensity={selectedIntensity}
                  setSelectedIntensity={setSelectedIntensity}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  onReset={handleResetFilters}
                />
              </div>
            </div>
          )}

          {/* Product Grid (9 Cols) with Generous Gaps */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="glass-card rounded-2xl p-16 text-center space-y-4">
                <p className="font-serif-luxury text-xl text-neutral-200">
                  No matching fragrances found.
                </p>
                <p className="text-xs text-neutral-400 font-light max-w-sm mx-auto">
                  Try adjusting your filters or clearing your search query to explore the complete archives.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-3 bg-[#c5a880] text-black font-semibold uppercase text-xs rounded-xl tracking-widest shadow font-sans-luxury"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={setQuickViewProduct}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#09090c] py-24 text-center text-neutral-400">Loading fragrance codex...</div>}>
      <ShopContent />
    </Suspense>
  );
}
