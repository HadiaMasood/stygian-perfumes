'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product, VolumeOption } from '@/data/products';
import { useCartStore } from '@/store/useCartStore';
import { useCurrencyStore } from '@/store/useCurrencyStore';
import { X, ShoppingBag, ArrowRight, Star, ShieldCheck, Sparkles } from 'lucide-react';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const [selectedVolume, setSelectedVolume] = useState<VolumeOption | null>(
    product ? product.volumes[0] : null
  );
  const [quantity, setQuantity] = useState(1);

  const { addItem } = useCartStore();
  const { formatPrice } = useCurrencyStore();

  if (!product) return null;

  const currentVolume = selectedVolume || product.volumes[0];

  const handleAddToCart = () => {
    addItem(product, currentVolume, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative bg-[#0d0e15] border border-[#26293c] text-white rounded-xl max-w-3xl w-full overflow-hidden shadow-2xl z-10 grid grid-cols-1 md:grid-cols-2">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-neutral-400 hover:text-white bg-black/40 hover:bg-black/80 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image */}
        <div className="relative aspect-[4/5] md:aspect-auto md:h-full bg-[#13151f]">
          <Image
            src={product.images.primary}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e15] via-transparent to-transparent md:hidden" />
        </div>

        {/* Details & Action */}
        <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-[#8c6d48] uppercase tracking-wider">
              <span>{product.fragranceFamily}</span>
              <div className="flex items-center gap-1 text-[#c5a880]">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{product.rating}</span>
                <span className="text-neutral-500">({product.reviewsCount})</span>
              </div>
            </div>

            <div>
              <h2 className="font-serif-luxury text-2xl text-neutral-100 font-bold">
                {product.name}
              </h2>
              <p className="text-xs text-[#c5a880] italic mt-0.5">{product.tagline}</p>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed line-clamp-3">
              {product.story}
            </p>

            {/* Olfactory Notes Preview */}
            <div className="bg-[#12131d] p-3 rounded border border-[#212435] space-y-2">
              <div className="text-[11px] font-semibold text-neutral-300 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#c5a880]" />
                Key Scent Notes
              </div>
              <div className="grid grid-cols-3 gap-2 text-[10px] text-neutral-400">
                <div>
                  <span className="text-neutral-500 block uppercase">Top</span>
                  <span className="text-neutral-200">{product.notes.top[0]?.name}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block uppercase">Heart</span>
                  <span className="text-neutral-200">{product.notes.heart[0]?.name}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block uppercase">Base</span>
                  <span className="text-neutral-200">{product.notes.base[0]?.name}</span>
                </div>
              </div>
            </div>

            {/* Volume Selection */}
            <div className="space-y-2">
              <span className="text-xs text-neutral-400 uppercase tracking-wider block">
                Select Flacon Size
              </span>
              <div className="grid grid-cols-3 gap-2">
                {product.volumes.map((vol) => {
                  const isSelected = currentVolume.sku === vol.sku;
                  return (
                    <button
                      key={vol.sku}
                      onClick={() => setSelectedVolume(vol)}
                      className={`p-2 rounded text-left border transition-all ${
                        isSelected
                          ? 'border-[#c5a880] bg-[#1a181e] text-white shadow-md'
                          : 'border-[#222436] bg-[#12131c] text-neutral-400 hover:border-neutral-600'
                      }`}
                    >
                      <span className="text-[11px] block font-medium truncate">{vol.size}</span>
                      <span className="text-xs text-[#c5a880] font-semibold block">
                        {formatPrice(vol.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Pricing & Add to Cart button */}
          <div className="space-y-3 pt-4 border-t border-[#1f212f]">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] text-neutral-400 uppercase">Selected Flacon</span>
                <div className="text-xl font-serif-luxury font-bold text-[#c5a880]">
                  {formatPrice(currentVolume.price * quantity)}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center border border-[#2b2e40] rounded bg-[#11121b]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2.5 py-1 text-neutral-400 hover:text-white"
                >
                  -
                </button>
                <span className="px-2 text-xs font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2.5 py-1 text-neutral-400 hover:text-white"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full py-3 bg-[#c5a880] hover:bg-[#d8be96] text-black font-semibold text-xs tracking-widest uppercase rounded flex items-center justify-center gap-2 transition-all shadow-lg"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add To Flacon Bag</span>
            </button>

            <div className="text-center">
              <Link
                href={`/shop/${product.slug}`}
                onClick={onClose}
                className="text-xs text-neutral-400 hover:text-[#c5a880] inline-flex items-center gap-1 transition-colors underline"
              >
                <span>View Full Olfactory Profile & Lore</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
