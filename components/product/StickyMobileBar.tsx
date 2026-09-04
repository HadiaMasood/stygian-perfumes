'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Product } from '@/data/products';
import { useCartStore } from '@/store/useCartStore';
import { useCurrencyStore } from '@/store/useCurrencyStore';
import { ShoppingBag } from 'lucide-react';

interface StickyMobileBarProps {
  product: Product;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({ product }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { addItem } = useCartStore();
  const { formatPrice } = useCurrencyStore();

  const defaultVolume = product.volumes[0];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-[#0c0d14]/95 border-t border-[#232637] p-3 backdrop-blur-xl sm:hidden animate-slide-up shadow-2xl">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-10 h-12 bg-[#161722] rounded relative overflow-hidden shrink-0 border border-[#27293a]">
            <Image
              src={product.images.thumbnail}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <h4 className="font-serif-luxury text-xs font-semibold text-neutral-100 truncate">
              {product.name}
            </h4>
            <span className="text-xs font-bold text-[#c5a880]">
              {formatPrice(defaultVolume.price)}
            </span>
          </div>
        </div>

        <button
          onClick={() => addItem(product, defaultVolume)}
          className="py-2.5 px-4 bg-[#c5a880] text-black font-semibold text-xs tracking-wider uppercase rounded flex items-center gap-1.5 shrink-0 shadow-lg"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Add To Bag</span>
        </button>
      </div>
    </div>
  );
};
