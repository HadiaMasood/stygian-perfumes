'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/store/useCartStore';
import { useCurrencyStore } from '@/store/useCurrencyStore';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  Lock,
  Gift,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  ShoppingBag,
  ArrowLeft,
} from 'lucide-react';

export default function CheckoutPage() {
  const {
    items,
    giftBoxIncluded,
    appliedPromo,
    getSubtotal,
    getDiscountAmount,
    getShippingCost,
    getTotal,
    clearCart,
  } = useCartStore();

  const { formatPrice } = useCurrencyStore();

  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');

  // Form State
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    suite: '',
    city: '',
    country: 'United States',
    postalCode: '',
    phone: '',
    shippingMethod: 'express', // standard vs express
    paymentMethod: 'card',
    cardNumber: '4242 •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '888',
    cardName: '',
  });

  const [orderId, setOrderId] = useState('');

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const shipping = getShippingCost();
  const total = getTotal();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.firstName || !formData.address || !formData.city) {
      alert('Please complete all essential shipping fields.');
      return;
    }
    setStep('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `STY-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setStep('confirmation');
    clearCart();

    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#c5a880', '#e4caa4', '#9d6381', '#ffffff'],
      });
    } catch {
      // ignore
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (items.length === 0 && step !== 'confirmation') {
    return (
      <div className="min-h-[70vh] bg-[#07080c] flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full bg-[#0c0d15] border border-[#202232] rounded-2xl p-8 text-center space-y-4 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-[#151724] border border-[#272a3e] flex items-center justify-center mx-auto text-[#c5a880]">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="font-serif-luxury text-2xl text-neutral-100 font-bold">
            Your Bag is Empty
          </h2>
          <p className="text-xs text-neutral-400">
            Please add your desired extraits before initiating checkout.
          </p>
          <Link
            href="/shop"
            className="inline-block mt-4 px-6 py-3 bg-[#c5a880] text-black font-semibold uppercase text-xs tracking-widest rounded transition-all shadow-lg"
          >
            Explore Fragrances
          </Link>
        </div>
      </div>
    );
  }

  // Confirmation View
  if (step === 'confirmation') {
    return (
      <div className="min-h-screen bg-[#07080c] py-20 px-4">
        <div className="max-w-2xl mx-auto bg-[#0c0d15] border border-[#c5a880]/40 rounded-3xl p-8 sm:p-12 text-center space-y-8 shadow-2xl animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-[#181926] border border-[#c5a880] flex items-center justify-center mx-auto text-[#c5a880]">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c5a880] block">
              Sacred Transaction Inscribed
            </span>
            <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-neutral-100">
              Order Confirmed & Sealed
            </h1>
            <p className="text-xs text-neutral-400">
              Your flacons are now being hand-numbered and prepared for expedited shipment.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-[#11121d] border border-[#232537] rounded-xl p-6 text-left space-y-4">
            <div className="flex items-center justify-between border-b border-[#1f212f] pb-3 text-xs">
              <span className="text-neutral-400">Order Registry Identifier:</span>
              <span className="font-mono text-[#c5a880] font-bold">{orderId}</span>
            </div>

            <div className="flex items-center justify-between border-b border-[#1f212f] pb-3 text-xs">
              <span className="text-neutral-400">Initiate Email:</span>
              <span className="text-neutral-200">{formData.email || 'collector@stygian.com'}</span>
            </div>

            <div className="flex items-center justify-between border-b border-[#1f212f] pb-3 text-xs">
              <span className="text-neutral-400">Destination:</span>
              <span className="text-neutral-200">{formData.address}, {formData.city}</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-400">Estimated Delivery:</span>
              <span className="text-[#c5a880] font-semibold">2 — 3 Business Days (Express Courier)</span>
            </div>
          </div>

          <div className="p-4 bg-[#141624] rounded-lg border border-[#292d42] text-xs text-neutral-400 space-y-1">
            <p className="text-neutral-200 font-medium">Bespoke Preparation Note</p>
            <p>
              Each bottle cap is hand-sealed with Stygian black sealing wax. A tracking dispatch link has been transmitted to your email.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-block px-8 py-3.5 bg-[#c5a880] hover:bg-[#d8be96] text-black font-semibold text-xs uppercase tracking-widest rounded-lg shadow-xl transition-all"
          >
            Return to the Fragrance Codex
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07080c] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1a1b26] pb-6 mb-8">
          <Link href="/" className="inline-block">
            <span className="font-serif-luxury text-2xl tracking-[0.25em] font-bold text-neutral-100 block">
              STYGIAN
            </span>
            <span className="text-[9px] tracking-[0.35em] uppercase text-[#8c6d48] block">
              SECURE CHECKOUT
            </span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <Lock className="w-3.5 h-3.5 text-[#c5a880]" />
            <span>256-Bit Encrypted Portal</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Checkout Form (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step Navigation Tabs */}
            <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider">
              <span
                className={step === 'shipping' ? 'text-[#c5a880]' : 'text-neutral-500'}
              >
                1. Shipping & Logistics
              </span>
              <span className="text-neutral-700">→</span>
              <span
                className={step === 'payment' ? 'text-[#c5a880]' : 'text-neutral-500'}
              >
                2. Bespoke Packaging & Payment
              </span>
            </div>

            {/* STEP 1: SHIPPING FORM */}
            {step === 'shipping' && (
              <form onSubmit={handleProceedToPayment} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-serif-luxury text-lg text-white font-semibold">
                    Contact Information
                  </h3>
                  <div>
                    <label className="text-[11px] text-neutral-400 uppercase tracking-wider block mb-1">
                      Email Address for Tracking
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="collector@domain.com"
                      className="w-full bg-[#11121d] border border-[#25283c] px-4 py-2.5 text-xs text-white rounded focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-[#1a1c29]">
                  <h3 className="font-serif-luxury text-lg text-white font-semibold">
                    Shipping Destination
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] text-neutral-400 uppercase tracking-wider block mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full bg-[#11121d] border border-[#25283c] px-4 py-2.5 text-xs text-white rounded focus:outline-none focus:border-[#c5a880]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-neutral-400 uppercase tracking-wider block mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full bg-[#11121d] border border-[#25283c] px-4 py-2.5 text-xs text-white rounded focus:outline-none focus:border-[#c5a880]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-neutral-400 uppercase tracking-wider block mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="e.g. 742 Evergreen Terrace"
                      className="w-full bg-[#11121d] border border-[#25283c] px-4 py-2.5 text-xs text-white rounded focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-[11px] text-neutral-400 uppercase tracking-wider block mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full bg-[#11121d] border border-[#25283c] px-4 py-2.5 text-xs text-white rounded focus:outline-none focus:border-[#c5a880]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-neutral-400 uppercase tracking-wider block mb-1">
                        Country
                      </label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full bg-[#11121d] border border-[#25283c] px-3 py-2.5 text-xs text-white rounded focus:outline-none focus:border-[#c5a880]"
                      >
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="France">France</option>
                        <option value="Germany">Germany</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] text-neutral-400 uppercase tracking-wider block mb-1">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        required
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="w-full bg-[#11121d] border border-[#25283c] px-4 py-2.5 text-xs text-white rounded focus:outline-none focus:border-[#c5a880]"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-4 bg-[#c5a880] hover:bg-[#d8be96] text-black font-semibold text-xs tracking-widest uppercase rounded flex items-center justify-center gap-2 transition-all shadow-xl font-sans-luxury"
                  >
                    <span>Proceed to Packaging & Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: PAYMENT & PACKAGING */}
            {step === 'payment' && (
              <form onSubmit={handleCompleteOrder} className="space-y-6">
                <div className="bg-[#10121d] border border-[#24263a] rounded-xl p-5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-400">Delivering To:</span>
                    <button
                      type="button"
                      onClick={() => setStep('shipping')}
                      className="text-[#c5a880] hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                  <p className="text-xs text-neutral-200">
                    {formData.firstName} {formData.lastName} • {formData.address}, {formData.city}, {formData.country}
                  </p>
                </div>

                {/* Packaging confirmation */}
                <div className="bg-[#12141f] border border-[#272a3e] rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-200">
                    <Gift className="w-4 h-4 text-[#c5a880]" />
                    <span>Presentation & Sample Flacons</span>
                  </div>
                  <p className="text-xs text-neutral-400">
                    ✓ Arrives in custom embossed black velvet coffret with wax-stamped seal.
                  </p>
                  <p className="text-xs text-neutral-400">
                    ✓ Selected 2ml sample vial included at zero charge.
                  </p>
                </div>

                {/* Simulated Payment Gateways */}
                <div className="space-y-4 pt-2">
                  <h3 className="font-serif-luxury text-lg text-white font-semibold">
                    Payment Instrument
                  </h3>

                  <div className="space-y-3">
                    <div className="border border-[#c5a880] bg-[#161725] rounded-xl p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-semibold text-white">
                          <CreditCard className="w-4 h-4 text-[#c5a880]" />
                          <span>Credit or Charge Card</span>
                        </div>
                        <span className="text-[10px] text-[#c5a880] uppercase tracking-wider">
                          Instant Authorization
                        </span>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="text-[10px] text-neutral-400 uppercase block mb-1">
                            Card Number
                          </label>
                          <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            className="w-full bg-[#0d0e17] border border-[#27293d] px-3 py-2 text-xs text-white rounded font-mono"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[10px] text-neutral-400 uppercase block mb-1">
                              Expires
                            </label>
                            <input
                              type="text"
                              name="cardExp"
                              value={formData.cardExp}
                              onChange={handleInputChange}
                              className="w-full bg-[#0d0e17] border border-[#27293d] px-3 py-2 text-xs text-white rounded font-mono"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-neutral-400 uppercase block mb-1">
                              Security CVC
                            </label>
                            <input
                              type="text"
                              name="cardCvc"
                              value={formData.cardCvc}
                              onChange={handleInputChange}
                              className="w-full bg-[#0d0e17] border border-[#27293d] px-3 py-2 text-xs text-white rounded font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep('shipping')}
                    className="px-6 py-4 bg-[#141520] hover:bg-[#1e202f] border border-[#282a3c] text-xs font-semibold uppercase tracking-wider text-neutral-300 rounded flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="submit"
                    className="flex-1 py-4 bg-gradient-to-r from-[#c5a880] to-[#dfc287] hover:from-[#d5b991] hover:to-[#ebd09b] text-black font-semibold text-xs tracking-widest uppercase rounded flex items-center justify-center gap-2 shadow-2xl font-sans-luxury"
                  >
                    <span>Complete Order • {formatPrice(total)}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Order Summary (5 Cols) */}
          <div className="lg:col-span-5 bg-[#0c0d14] border border-[#1f212f] rounded-2xl p-6 sm:p-8 h-fit space-y-6 shadow-2xl">
            <h3 className="font-serif-luxury text-xl font-bold text-white border-b border-[#1c1d29] pb-4">
              Flacon Summary ({items.length})
            </h3>

            {/* Item List */}
            <div className="space-y-4 max-h-80 overflow-y-auto divide-y divide-[#171824] pr-1">
              {items.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex gap-3">
                  <div className="w-14 h-18 bg-[#141520] rounded relative overflow-hidden shrink-0 border border-[#232537]">
                    <Image
                      src={item.product.images.thumbnail}
                      alt={item.product.name}
                      fill
                      sizes="60px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-serif-luxury text-sm font-semibold text-neutral-100 truncate">
                        {item.product.name}
                      </h4>
                      <span className="text-xs font-bold text-[#c5a880]">
                        {formatPrice(item.volume.price * item.quantity)}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-400">{item.volume.size} × {item.quantity}</p>
                    <p className="text-[10px] text-[#8c6d48] uppercase">{item.volume.concentration}</p>
                    {item.engraving && (
                      <p className="text-[10px] text-neutral-400 italic">
                        Engraved: &ldquo;{item.engraving}&rdquo;
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="pt-4 border-t border-[#1c1d29] space-y-2 text-xs text-neutral-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white">{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#c5a880]">
                  <span>Collector Privilege ({appliedPromo?.code})</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              {giftBoxIncluded && (
                <div className="flex justify-between">
                  <span>Bespoke Wax-Sealed Coffret</span>
                  <span className="text-white">{formatPrice(15)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Worldwide Express Courier</span>
                <span className="text-white">
                  {shipping === 0 ? <span className="text-[#c5a880]">Complimentary</span> : formatPrice(shipping)}
                </span>
              </div>
              <div className="pt-3 border-t border-[#1c1d29] flex justify-between text-lg font-serif-luxury font-bold text-white">
                <span>Total Amount</span>
                <span className="text-[#c5a880]">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Security Guarantee */}
            <div className="pt-2 text-[11px] text-neutral-500 flex items-center justify-center gap-2 text-center">
              <ShieldCheck className="w-4 h-4 text-[#c5a880]" />
              <span>Artisanal Authenticity & Zero Leakage Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
