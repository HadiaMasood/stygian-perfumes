'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/data/products';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useCurrencyStore } from '@/store/useCurrencyStore';
import { Heart, Eye, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const { formatPrice } = useCurrencyStore();

  const isFavorited = isInWishlist(product.slug);
  const defaultVolume = product.volumes[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, defaultVolume);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.slug);
  };

  return (
    <div
      className="group relative bg-[#0e0f16] border border-white/5 hover:border-[#c5a880]/50 rounded-xl overflow-hidden transition-all duration-300 flex flex-col hover:shadow-xl w-full max-w-[260px] mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Badges */}
      <div className="absolute top-2.5 left-2.5 z-20 flex flex-col gap-1 pointer-events-none">
        {product.bestSeller && (
          <span className="bg-[#09090c]/85 border border-[#c5a880]/40 text-[#c5a880] text-[8px] font-semibold uppercase tracking-[0.15em] px-2 py-0.5 rounded-full backdrop-blur-md">
            Signature
          </span>
        )}
        {product.isNew && (
          <span className="bg-[#09090c]/85 border border-[#6ea684]/50 text-[#6ea684] text-[8px] font-semibold uppercase tracking-[0.15em] px-2 py-0.5 rounded-full backdrop-blur-md">
            New
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={handleWishlistToggle}
        className={`absolute top-2.5 right-2.5 z-20 p-1.5 rounded-full backdrop-blur-md transition-all ${
          isFavorited
            ? 'bg-[#9e2a3b] text-white'
            : 'bg-black/60 text-neutral-300 hover:text-white hover:bg-black/90'
        }`}
        aria-label="Add to wishlist"
      >
        <Heart className="w-3 h-3 fill-current" />
      </button>

      {/* Flacon Image Showcase - Fitted & Compact */}
      <Link
        href={`/shop/${product.slug}`}
        className="relative aspect-[4/5] w-full overflow-hidden block bg-[#11121a]"
      >
        <Image
          src={isHovered ? product.images.lifestyle : product.images.primary}
          alt={product.name}
          fill
          sizes="260px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0f16] via-transparent to-transparent opacity-60 pointer-events-none" />

        {/* Quick View Button */}
        {onQuickView && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView(product);
            }}
            className="absolute bottom-2.5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 px-3 py-1 bg-black/85 hover:bg-[#c5a880] text-white hover:text-black border border-[#c5a880]/40 rounded-full text-[9px] font-semibold tracking-[0.15em] uppercase flex items-center gap-1 shadow-xl backdrop-blur-md font-sans-luxury"
          >
            <Eye className="w-2.5 h-2.5" />
            <span>Quick View</span>
          </button>
        )}
      </Link>

      {/* Content Area - Compact Card Details */}
      <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2.5 bg-[#0e0f16]">
        <div className="space-y-1">
          {/* Family & Concentration */}
          <div className="flex items-center justify-between text-[8px] text-[#8c6d48] uppercase tracking-[0.15em]">
            <span>{product.fragranceFamily}</span>
            <span>{product.concentration.includes('Extrait') ? 'Extrait 35%' : 'Parfum'}</span>
          </div>

          {/* Title */}
          <Link href={`/shop/${product.slug}`} className="block group/title">
            <h3 className="font-serif-luxury text-sm font-semibold text-neutral-100 group-hover/title:text-[#c5a880] transition-colors leading-tight truncate">
              {product.name}
            </h3>
          </Link>
          <p className="text-[10px] text-neutral-400 italic font-light line-clamp-1">
            {product.tagline}
          </p>

          {/* Scent Notes Preview Tags */}
          <div className="pt-1 flex flex-wrap gap-1">
            {product.notes.top.slice(0, 2).map((note, idx) => (
              <span
                key={idx}
                className="text-[8px] bg-[#141520] text-neutral-300 px-2 py-0.5 rounded-full border border-white/5 font-light"
              >
                {note.name}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing & Add To Bag */}
        <div className="pt-2.5 border-t border-white/5 flex items-center justify-between">
          <div>
            <span className="text-[8px] text-neutral-500 uppercase tracking-widest block font-light">
              From {defaultVolume.size}
            </span>
            <span className="font-serif-luxury text-xs font-bold text-[#c5a880]">
              {formatPrice(defaultVolume.price)}
            </span>
          </div>

          <button
            onClick={handleQuickAdd}
            className="px-2.5 py-1 bg-[#171824] hover:bg-[#c5a880] text-neutral-200 hover:text-black border border-white/10 hover:border-[#c5a880] rounded-md text-[9px] font-semibold uppercase tracking-[0.12em] transition-all flex items-center gap-1 font-sans-luxury"
            aria-label={`Add ${product.name} to bag`}
          >
            <ShoppingBag className="w-2.5 h-2.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
