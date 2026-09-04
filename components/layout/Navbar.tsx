'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useCurrencyStore, Currency } from '@/store/useCurrencyStore';
import {
  ShoppingBag,
  Heart,
  Menu,
  X,
  Sparkles,
  Compass,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { toggleCart, getItemCount } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const { currency, setCurrency } = useCurrencyStore();

  const cartCount = getItemCount();
  const wishlistCount = wishlistItems.length;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Collection', href: '/shop' },
    { label: 'Discovery Coffret', href: '/shop/discovery-set' },
    { label: 'The House', href: '/about' },
  ];

  return (
    <>
      {/* Top Banner with Refined Spacing */}
      <div className="bg-[#08090e] border-b border-white/5 py-2 px-4 text-[10px] tracking-[0.22em] uppercase text-neutral-400 font-sans-luxury">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-center whitespace-nowrap overflow-x-auto no-scrollbar">
          <Sparkles className="w-3 h-3 text-[#c5a880] shrink-0 animate-pulse" />
          <span className="font-light tracking-[0.2em]">
            Complimentary Worldwide Courier on orders over $200 <span className="text-[#c5a880]/60 mx-1.5">•</span> 2 Bespoke Flacon Samples Included
          </span>
        </div>
      </div>

      {/* Main Luxury Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#09090c]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3'
            : 'bg-[#09090c]/90 backdrop-blur-md border-b border-white/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 lg:gap-8">
            
            {/* Left Nav (Desktop) */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 flex-1 justify-start">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative text-[11px] xl:text-[11.5px] uppercase tracking-[0.22em] font-sans-luxury whitespace-nowrap transition-all duration-200 py-1 group ${
                      isActive
                        ? 'text-[#c5a880] font-medium'
                        : 'text-neutral-300 hover:text-[#c5a880]'
                    }`}
                  >
                    <span>{link.label}</span>
                    <span
                      className={`absolute bottom-0 left-0 h-[1.5px] bg-[#c5a880] transition-all duration-300 ease-out ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Center Brand Logo */}
            <div className="flex-shrink-0 flex items-center justify-center">
              <Link href="/" className="inline-flex items-center gap-2.5 sm:gap-3 group">
                <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-[#c5a880]/40 shadow-lg group-hover:border-[#c5a880] transition-all shrink-0 bg-[#06070a]">
                  <Image
                    src="/images/logo.jpeg"
                    alt="Stygian Perfumes Logo"
                    fill
                    sizes="40px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    priority
                  />
                </div>
                <div className="text-left flex flex-col justify-center">
                  <span className="font-serif-luxury text-base sm:text-xl xl:text-2xl tracking-[0.25em] font-medium text-neutral-100 group-hover:text-[#c5a880] transition-colors leading-none mb-1">
                    STYGIAN
                  </span>
                  <span className="text-[7px] sm:text-[8px] tracking-[0.38em] uppercase text-[#8c6d48] group-hover:text-[#c5a880] transition-colors leading-none font-light">
                    HAUTE PARFUMERIE
                  </span>
                </div>
              </Link>
            </div>

            {/* Right Utilities (Desktop) */}
            <div className="hidden lg:flex items-center justify-end space-x-5 xl:space-x-6 flex-1">
              {/* Scent Finder Link */}
              <Link
                href="/quiz"
                className={`group px-3 py-1.5 rounded-full border text-[10.5px] xl:text-[11px] uppercase tracking-[0.18em] font-sans-luxury whitespace-nowrap transition-all duration-300 flex items-center gap-1.5 ${
                  pathname === '/quiz'
                    ? 'border-[#c5a880] bg-[#c5a880]/10 text-[#c5a880]'
                    : 'border-white/10 text-neutral-300 hover:border-[#c5a880]/50 hover:text-[#c5a880] bg-white/[0.02]'
                }`}
              >
                <Compass className="w-3.5 h-3.5 text-[#c5a880] group-hover:rotate-45 transition-transform duration-500" />
                <span>Scent Finder</span>
              </Link>

              <div className="h-3.5 w-[1px] bg-white/15" />

              {/* Currency Selector */}
              <div className="relative inline-flex items-center">
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as Currency)}
                  className="bg-transparent text-[11px] text-neutral-300 hover:text-white uppercase tracking-widest focus:outline-none cursor-pointer pr-1 font-sans-luxury whitespace-nowrap appearance-none transition-colors"
                  aria-label="Select currency"
                >
                  <option value="USD" className="bg-[#12131b] text-white">USD ($)</option>
                  <option value="EUR" className="bg-[#12131b] text-white">EUR (€)</option>
                  <option value="GBP" className="bg-[#12131b] text-white">GBP (£)</option>
                </select>
                <span className="text-[8px] text-neutral-400 pointer-events-none ml-1">▼</span>
              </div>

              {/* Wishlist Link */}
              <Link
                href="/shop?filter=wishlist"
                className="relative text-neutral-300 hover:text-[#c5a880] transition-colors p-1.5 rounded-full hover:bg-white/5"
                aria-label="View Wishlist"
              >
                <Heart className="w-4 h-4" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#9e2a3b] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Drawer Button */}
              <button
                onClick={toggleCart}
                className="relative text-neutral-200 hover:text-[#c5a880] transition-all duration-200 px-3 py-1.5 rounded-full border border-white/10 hover:border-[#c5a880]/50 hover:bg-white/[0.03] flex items-center gap-2 group whitespace-nowrap"
                aria-label="Open Shopping Bag"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-neutral-300 group-hover:text-[#c5a880] transition-colors" />
                <span className="text-[11px] uppercase tracking-widest text-neutral-300 group-hover:text-[#c5a880]">
                  Bag
                </span>
                {cartCount > 0 ? (
                  <span className="bg-[#c5a880] text-black text-[9px] font-bold px-1.5 py-0.5 rounded-full min-w-[17px] text-center shadow">
                    {cartCount}
                  </span>
                ) : null}
              </button>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center justify-end space-x-2.5 lg:hidden">
              <button
                onClick={toggleCart}
                className="relative text-neutral-200 p-2 rounded-full hover:bg-white/5 transition-colors"
                aria-label="Open Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute 0 top-0.5 right-0.5 bg-[#c5a880] text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-neutral-300 hover:text-white rounded-full hover:bg-white/5 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-[#0a0b10]/95 backdrop-blur-2xl px-6 py-6 space-y-5 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className={`font-serif-luxury text-sm tracking-widest uppercase py-1 transition-colors ${
                  pathname === '/shop' ? 'text-[#c5a880]' : 'text-neutral-200 hover:text-[#c5a880]'
                }`}
              >
                The Collection
              </Link>
              <Link
                href="/shop/discovery-set"
                onClick={() => setMobileMenuOpen(false)}
                className={`font-serif-luxury text-sm tracking-widest uppercase py-1 transition-colors ${
                  pathname === '/shop/discovery-set' ? 'text-[#c5a880]' : 'text-neutral-200 hover:text-[#c5a880]'
                }`}
              >
                Discovery Coffret
              </Link>
              <Link
                href="/quiz"
                onClick={() => setMobileMenuOpen(false)}
                className={`font-serif-luxury text-sm tracking-widest uppercase py-1 transition-colors flex items-center gap-2 ${
                  pathname === '/quiz' ? 'text-[#c5a880]' : 'text-neutral-200 hover:text-[#c5a880]'
                }`}
              >
                <Compass className="w-4 h-4 text-[#c5a880]" />
                <span>Scent Finder</span>
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`font-serif-luxury text-sm tracking-widest uppercase py-1 transition-colors ${
                  pathname === '/about' ? 'text-[#c5a880]' : 'text-neutral-200 hover:text-[#c5a880]'
                }`}
              >
                The House
              </Link>
            </nav>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-neutral-400">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] uppercase text-neutral-500 tracking-wider">Currency:</span>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as Currency)}
                  className="bg-transparent text-xs text-neutral-200 uppercase tracking-wider focus:outline-none cursor-pointer"
                >
                  <option value="USD" className="bg-[#12131b] text-white">USD ($)</option>
                  <option value="EUR" className="bg-[#12131b] text-white">EUR (€)</option>
                  <option value="GBP" className="bg-[#12131b] text-white">GBP (£)</option>
                </select>
              </div>

              <Link
                href="/shop?filter=wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-1.5 text-xs text-neutral-300 hover:text-[#c5a880]"
              >
                <Heart className="w-3.5 h-3.5 text-[#9e2a3b]" />
                <span>Wishlist ({wishlistCount})</span>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
