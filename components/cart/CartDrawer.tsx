'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/store/useCartStore';
import { useCurrencyStore } from '@/store/useCurrencyStore';
import { COMPLIMENTARY_SAMPLES } from '@/data/products';
import {
  X,
  Plus,
  Minus,
  Trash2,
  Gift,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ShoppingBag,
  Tag,
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    selectedSampleId,
    setSelectedSampleId,
    giftBoxIncluded,
    setGiftBox,
    giftMessage,
    setGiftMessage,
    appliedPromo,
    applyPromo,
    removePromo,
    getSubtotal,
    getDiscountAmount,
    getShippingCost,
    getTotal,
    getItemCount,
  } = useCartStore();

  const { formatPrice } = useCurrencyStore();
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [showGiftOptions, setShowGiftOptions] = useState(false);

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const shipping = getShippingCost();
  const total = getTotal();
  const itemCount = getItemCount();

  const freeShippingThreshold = 200;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCodeInput.trim()) return;
    const success = applyPromo(promoCodeInput);
    if (success) setPromoCodeInput('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0c0d12] border-l border-[#242634] text-[#f0f1f5] flex flex-col shadow-2xl relative">
          {/* Header */}
          <div className="p-6 border-b border-[#1f212d] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-[#c5a880]" />
              <h2 className="font-serif-luxury text-xl tracking-wider text-neutral-100 uppercase">
                Your Flacon Bag ({itemCount})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-2 text-neutral-400 hover:text-white rounded-full hover:bg-neutral-800/60 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-[#12141c] px-6 py-3 border-b border-[#1f212d]">
            <div className="flex items-center justify-between text-xs tracking-wide mb-1.5">
              {remainingForFreeShipping > 0 ? (
                <span className="text-neutral-300">
                  Add <span className="text-[#c5a880] font-semibold">{formatPrice(remainingForFreeShipping)}</span> for Complimentary Express Shipping
                </span>
              ) : (
                <span className="text-[#c5a880] flex items-center gap-1.5 font-medium">
                  <Sparkles className="w-3.5 h-3.5" />
                  Unlocked: Complimentary Worldwide Express Delivery
                </span>
              )}
            </div>
            <div className="w-full bg-[#202230] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#8c6d48] to-[#c5a880] h-full transition-all duration-500 rounded-full"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 divide-y divide-[#1b1c28]">
            {items.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#161722] border border-[#27293a] flex items-center justify-center mx-auto text-[#c5a880]/60">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="font-serif-luxury text-lg text-neutral-300">Your bag is silent and empty.</p>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                  Explore our nocturnal creations and awaken your dark signature aura.
                </p>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="inline-block mt-4 px-6 py-2.5 bg-[#c5a880] hover:bg-[#d8be96] text-black font-semibold tracking-wider uppercase text-xs rounded transition-all shadow-lg"
                >
                  Explore Fragrances
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="pt-6 first:pt-0 flex gap-4">
                  {/* Thumbnail */}
                  <div className="w-20 h-24 bg-[#14151e] border border-[#27293b] rounded relative overflow-hidden shrink-0">
                    <Image
                      src={item.product.images.thumbnail}
                      alt={item.product.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/shop/${item.product.slug}`}
                          onClick={closeCart}
                          className="font-serif-luxury text-base font-semibold text-neutral-100 hover:text-[#c5a880] transition-colors truncate"
                        >
                          {item.product.name}
                        </Link>
                        <span className="text-sm font-semibold text-[#c5a880] shrink-0">
                          {formatPrice(item.volume.price * item.quantity)}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400 mt-0.5">{item.volume.size}</p>
                      <p className="text-[11px] text-[#8c6d48] tracking-wider uppercase mt-0.5">
                        {item.volume.concentration}
                      </p>
                      {item.engraving && (
                        <p className="text-[11px] text-neutral-400 italic mt-1 bg-[#161724] px-2 py-0.5 rounded inline-block border border-neutral-800">
                          Custom Engraving: &quot;{item.engraving}&quot;
                        </p>
                      )}
                    </div>

                    {/* Quantity controls & remove */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-[#2b2d3e] rounded bg-[#111219]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 text-neutral-400 hover:text-white transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-semibold text-neutral-200">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 text-neutral-400 hover:text-white transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-neutral-500 hover:text-red-400 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Complimentary Sample Selection (Active when cart has items) */}
            {items.length > 0 && (
              <div className="pt-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#c5a880]" />
                    Complimentary 2ml Sample Vial
                  </span>
                  <span className="text-[11px] text-[#c5a880] font-medium">Free</span>
                </div>
                <select
                  value={selectedSampleId || ''}
                  onChange={(e) => setSelectedSampleId(e.target.value)}
                  className="w-full bg-[#141620] border border-[#27293a] text-xs text-neutral-200 rounded px-3 py-2 focus:outline-none focus:border-[#c5a880]"
                >
                  {COMPLIMENTARY_SAMPLES.map((sample) => (
                    <option key={sample.id} value={sample.id}>
                      {sample.name} — {sample.notes}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Gift Options Toggle */}
            {items.length > 0 && (
              <div className="pt-6">
                <button
                  onClick={() => setShowGiftOptions(!showGiftOptions)}
                  className="w-full flex items-center justify-between text-xs text-neutral-300 hover:text-[#c5a880] transition-colors py-1"
                >
                  <span className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-[#c5a880]" />
                    Bespoke Wax-Sealed Gift Coffret (+{formatPrice(15)})
                  </span>
                  <span className="text-xs">{showGiftOptions ? '▲' : '▼'}</span>
                </button>

                {showGiftOptions && (
                  <div className="mt-3 p-3 bg-[#131520] border border-[#232637] rounded space-y-3">
                    <label className="flex items-center gap-2 text-xs text-neutral-200 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={giftBoxIncluded}
                        onChange={(e) => setGiftBox(e.target.checked)}
                        className="rounded accent-[#c5a880]"
                      />
                      <span>Include handmade black lacquer box & stamped wax seal</span>
                    </label>
                    {giftBoxIncluded && (
                      <textarea
                        value={giftMessage}
                        onChange={(e) => setGiftMessage(e.target.value)}
                        placeholder="Inscribed handwritten parchment note (optional)..."
                        maxLength={200}
                        rows={2}
                        className="w-full bg-[#0e0f16] border border-[#26283b] text-xs text-neutral-200 rounded p-2 focus:outline-none focus:border-[#c5a880] resize-none"
                      />
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer & Checkout Breakdown */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#1f212d] bg-[#0f1017] space-y-4">
              {/* Promo Code input */}
              {appliedPromo ? (
                <div className="flex items-center justify-between bg-[#171926] px-3 py-2 rounded text-xs border border-[#c5a880]/30">
                  <div className="flex items-center gap-2 text-[#c5a880]">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Code &quot;{appliedPromo.code}&quot; (-{appliedPromo.discountPercent}%)</span>
                  </div>
                  <button
                    onClick={removePromo}
                    className="text-neutral-400 hover:text-red-400 text-xs underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value)}
                    placeholder="Enter Secret Code (e.g. VIP10)"
                    className="flex-1 bg-[#141622] border border-[#272a3e] px-3 py-2 text-xs text-neutral-200 rounded focus:outline-none focus:border-[#c5a880] uppercase tracking-wider"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#202334] hover:bg-[#2b2f46] text-xs font-semibold uppercase tracking-wider text-neutral-200 rounded transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}

              {/* Price calculations */}
              <div className="space-y-1.5 text-xs text-neutral-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-neutral-200">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#c5a880]">
                    <span>Collector Privilege Discount</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                {giftBoxIncluded && (
                  <div className="flex justify-between">
                    <span>Wax-Sealed Luxury Packaging</span>
                    <span className="text-neutral-200">{formatPrice(15)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express Courier Delivery</span>
                  <span className="text-neutral-200">
                    {shipping === 0 ? (
                      <span className="text-[#c5a880] font-medium uppercase text-[11px]">
                        Complimentary
                      </span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#1f212d] flex justify-between text-base font-serif-luxury font-semibold text-neutral-100">
                  <span>Total Due</span>
                  <span className="text-[#c5a880]">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Checkout Action Button - Slim & Elegant */}
              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-[#c5a880] to-[#dfc287] hover:from-[#d5b991] hover:to-[#ebd09b] text-black font-semibold text-[11px] tracking-[0.18em] uppercase rounded-xl shadow-md transition-all duration-300 font-sans-luxury"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              {/* Security reassurance */}
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-500 font-light">
                <ShieldCheck className="w-3 h-3 text-[#c5a880]" />
                <span>Encrypted 256-Bit Checkout • Authenticity Certified</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
