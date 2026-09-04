'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product, VolumeOption } from '@/data/products';
import { useCartStore } from '@/store/useCartStore';
import { useCurrencyStore } from '@/store/useCurrencyStore';
import {
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Truck,
  Gift,
  Check,
  PenTool,
} from 'lucide-react';

interface VolumeSelectorProps {
  product: Product;
}

export const VolumeSelector: React.FC<VolumeSelectorProps> = ({ product }) => {
  const router = useRouter();
  const [selectedVolume, setSelectedVolume] = useState<VolumeOption>(product.volumes[0]);
  const [quantity, setQuantity] = useState(1);
  const [showEngraving, setShowEngraving] = useState(false);
  const [engravingText, setEngravingText] = useState('');

  const { addItem } = useCartStore();
  const { formatPrice } = useCurrencyStore();

  const handleAddBag = () => {
    addItem(product, selectedVolume, quantity, engravingText);
  };

  const handleInstantCheckout = () => {
    addItem(product, selectedVolume, quantity, engravingText);
    router.push('/checkout');
  };

  return (
    <div className="space-y-6 pt-2">
      {/* Flacon Volume Selection */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs tracking-[0.15em] uppercase">
          <span className="text-neutral-300 font-medium">Select Flacon Format</span>
          <span className="text-[#c5a880] text-[11px]">
            {selectedVolume.stockStatus === 'low_stock' ? 'Low Batch Reserve' : 'Available • Hand-Numbered'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {product.volumes.map((vol) => {
            const isSelected = selectedVolume.sku === vol.sku;
            return (
              <button
                key={vol.sku}
                onClick={() => setSelectedVolume(vol)}
                className={`p-4 rounded-xl border text-left transition-all relative ${
                  isSelected
                    ? 'border-[#c5a880] bg-[#1a1722] shadow-[0_0_25px_rgba(197,168,128,0.12)]'
                    : 'border-white/5 bg-[#101118] hover:border-white/20 text-neutral-400'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-[#c5a880] text-black flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                )}
                <span className="font-serif-luxury text-sm font-semibold text-neutral-100 block">
                  {vol.size}
                </span>
                <span className="text-sm text-[#c5a880] font-bold block mt-1">
                  {formatPrice(vol.price)}
                </span>
                <span className="text-[10px] text-neutral-500 uppercase tracking-wider block mt-0.5 font-light">
                  {vol.concentration}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Complimentary Bottle Engraving */}
      <div className="pt-1">
        <button
          type="button"
          onClick={() => setShowEngraving(!showEngraving)}
          className="text-xs text-neutral-400 hover:text-[#c5a880] flex items-center gap-2 transition-colors"
        >
          <PenTool className="w-3.5 h-3.5 text-[#c5a880]" />
          <span>Complimentary Bespoke Flacon Engraving</span>
          <span className="text-neutral-500 text-[10px]">{showEngraving ? '▲' : '▼'}</span>
        </button>

        {showEngraving && (
          <div className="mt-3 p-4 bg-[#11121b] border border-white/10 rounded-xl space-y-2">
            <label className="text-[11px] text-neutral-400 block font-light">
              Inscribe initials or secret words on the obsidian flacon shoulder (Max 18 characters):
            </label>
            <input
              type="text"
              maxLength={18}
              value={engravingText}
              onChange={(e) => setEngravingText(e.target.value)}
              placeholder="e.g. NOCTURNE M.V."
              className="w-full bg-[#08080c] border border-white/10 px-3.5 py-2 text-xs text-neutral-100 rounded focus:outline-none focus:border-[#c5a880] uppercase tracking-widest font-mono"
            />
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-2">
        <div className="flex gap-3">
          {/* Quantity Stepper */}
          <div className="flex items-center border border-white/10 rounded-xl bg-[#101118] px-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-3.5 text-neutral-400 hover:text-white transition-colors"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="px-3 text-xs font-semibold text-neutral-100">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-3.5 text-neutral-400 hover:text-white transition-colors"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* Add to Bag */}
          <button
            onClick={handleAddBag}
            className="flex-1 py-4 px-6 bg-gradient-to-r from-[#c5a880] to-[#dfc287] hover:from-[#d5b991] hover:to-[#ebd09b] text-black font-semibold text-xs tracking-[0.2em] uppercase rounded-xl flex items-center justify-center gap-2 transition-all shadow-xl font-sans-luxury"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>
              Add To Flacon Bag • {formatPrice(selectedVolume.price * quantity)}
            </span>
          </button>
        </div>

        {/* Express Dark Checkout */}
        <button
          onClick={handleInstantCheckout}
          className="w-full py-3.5 bg-[#141520] hover:bg-[#1c1e2d] border border-white/10 text-neutral-300 hover:text-white text-xs uppercase tracking-[0.2em] font-semibold rounded-xl transition-colors font-sans-luxury"
        >
          Express Dark Checkout
        </button>
      </div>

      {/* Commitments Checklist with clean spacing */}
      <div className="p-5 bg-[#101118] border border-white/5 rounded-xl space-y-3 text-xs text-neutral-400 font-light">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-3.5 h-3.5 text-[#c5a880] shrink-0" />
          <span>Includes 2 complimentary 2ml extrait sample vials of your choice</span>
        </div>
        <div className="flex items-center gap-2.5">
          <Gift className="w-3.5 h-3.5 text-[#c5a880] shrink-0" />
          <span>Arrives in signature embossed black velvet coffret with stamped wax seal</span>
        </div>
        <div className="flex items-center gap-2.5">
          <Truck className="w-3.5 h-3.5 text-[#c5a880] shrink-0" />
          <span>Complimentary express courier delivery on orders over {formatPrice(200)}</span>
        </div>
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#c5a880] shrink-0" />
          <span>Numbered certificate of authenticity and batch formula lineage</span>
        </div>
      </div>
    </div>
  );
};
