import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { PRODUCTS, REVIEWS } from '@/data/products';
import { OlfactoryPyramid } from '@/components/product/OlfactoryPyramid';
import { ScentMetrics } from '@/components/product/ScentMetrics';
import { VolumeSelector } from '@/components/product/VolumeSelector';
import { StickyMobileBar } from '@/components/product/StickyMobileBar';
import {
  Star,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Layers,
  ChevronRight,
} from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) return { title: 'Fragrance Not Found | Stygian' };

  return {
    title: `${product.name} — ${product.concentration} | Stygian Haute Parfumerie`,
    description: product.story,
    openGraph: {
      title: `${product.name} | Stygian Perfumes`,
      description: product.tagline,
      images: [{ url: product.images.primary }],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const pairingProduct = PRODUCTS.find((p) => p.slug === product.pairing.recommendedSlug);
  const scentReviews = REVIEWS.filter((r) => r.scent === product.name);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images.primary,
    description: product.story,
    brand: {
      '@type': 'Brand',
      name: 'Stygian Haute Parfumerie',
    },
    offers: {
      '@type': 'Offer',
      price: product.basePrice,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewsCount,
    },
  };

  return (
    <div className="min-h-screen bg-[#09090c] pt-8 pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Breadcrumb Bar with generous spacing */}
        <nav className="flex items-center space-x-3 text-xs tracking-widest uppercase text-neutral-400 font-sans-luxury">
          <Link href="/" className="hover:text-[#c5a880] transition-colors">
            Sanctuary
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
          <Link href="/shop" className="hover:text-[#c5a880] transition-colors">
            The Collection
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
          <span className="text-[#c5a880] font-medium">{product.name}</span>
        </nav>

        {/* Hero Section: Flacon Display (Left) + Refined Product Details (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Full Luxury Flacon Showcase */}
          <div className="lg:col-span-6 space-y-5 lg:sticky lg:top-28">
            <div className="relative aspect-[4/5] max-h-[480px] w-full rounded-3xl overflow-hidden bg-gradient-to-b from-[#161724] via-[#10111a] to-[#08080c] border border-white/10 p-6 shadow-2xl flex items-center justify-center group">
              <div className="relative w-full h-full">
                <Image
                  src={product.images.primary}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-contain transition-transform duration-700 ease-out group-hover:scale-105 drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)]"
                />
              </div>

              {/* Family Badge */}
              <div className="absolute top-4 left-4 z-10 gold-badge px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.2em] backdrop-blur-md">
                {product.fragranceFamily}
              </div>

              {/* Rating */}
              <div className="absolute top-4 right-4 z-10 bg-black/60 border border-white/10 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 text-xs text-[#c5a880]">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="font-semibold text-neutral-100">{product.rating}</span>
                <span className="text-neutral-500 text-[11px]">({product.reviewsCount})</span>
              </div>
            </div>

            {/* Thumbnail Carousel */}
            <div className="grid grid-cols-3 gap-3">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#12131b] border border-white/5 opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
                <Image
                  src={product.images.secondary}
                  alt={`${product.name} presentation`}
                  fill
                  sizes="150px"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#12131b] border border-white/5 opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
                <Image
                  src={product.images.lifestyle}
                  alt={`${product.name} mood`}
                  fill
                  sizes="150px"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#12131b] border border-white/5 opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
                <Image
                  src={product.images.pyramidHero}
                  alt={`${product.name} botanicals`}
                  fill
                  sizes="150px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Typography & Purchase Action */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4 border-b border-white/10 pb-8">
              <div className="inline-flex items-center gap-2 text-[#c5a880] text-xs font-semibold uppercase tracking-[0.25em]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{product.subtitle}</span>
              </div>

              <h1 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-neutral-100">
                {product.name}
              </h1>

              <p className="text-sm sm:text-base text-[#c5a880] italic font-serif-luxury font-light">
                {product.tagline}
              </p>

              <p className="text-sm text-neutral-300 leading-relaxed pt-2 font-light">
                {product.story}
              </p>
            </div>

            {/* Atmosphere Quote with generous whitespace */}
            <div className="p-5 rounded-xl bg-[#111219] border-l-2 border-[#c5a880] border-t border-r border-b border-white/5 space-y-1.5">
              <span className="text-[10px] text-[#c5a880] font-semibold uppercase tracking-[0.25em] block">
                Atmospheric Lore
              </span>
              <p className="text-xs text-neutral-300 italic leading-relaxed">
                &ldquo;{product.atmosphere}&rdquo;
              </p>
            </div>

            {/* Volume Selector and Actions */}
            <VolumeSelector product={product} />
          </div>
        </div>

        {/* Sensory Metrics Section with Generous Padding */}
        <div className="space-y-6 pt-12 border-t border-white/10">
          <div className="space-y-1">
            <span className="text-[11px] text-[#c5a880] uppercase tracking-[0.25em] font-semibold block">
              Performance & Longevity
            </span>
            <h3 className="font-serif-luxury text-2xl text-neutral-100 font-medium">
              Olfactory Sillage & Character
            </h3>
          </div>
          <ScentMetrics product={product} />
        </div>

        {/* Olfactory Pyramid Architecture */}
        <div className="pt-6">
          <OlfactoryPyramid product={product} />
        </div>

        {/* Fragrance Layering Suggestion */}
        {pairingProduct && (
          <div className="rounded-2xl p-8 sm:p-12 bg-gradient-to-r from-[#141520] via-[#1a1725] to-[#12131c] border border-[#c5a880]/20 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
            <div className="space-y-3 max-w-xl">
              <div className="flex items-center gap-2 text-[#9d6381] text-xs font-semibold uppercase tracking-[0.2em]">
                <Layers className="w-4 h-4" />
                <span>The Art of Dark Layering</span>
              </div>
              <h3 className="font-serif-luxury text-2xl font-medium text-neutral-100">
                Harmonize with {pairingProduct.name}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                {product.pairing.rationale}
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <div className="w-16 h-20 bg-[#161724] rounded-lg relative overflow-hidden border border-white/10">
                <Image
                  src={pairingProduct.images.thumbnail}
                  alt={pairingProduct.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <Link
                href={`/shop/${pairingProduct.slug}`}
                className="px-6 py-3.5 bg-[#9d6381] hover:bg-[#b07393] text-white text-xs font-semibold uppercase tracking-widest rounded-lg flex items-center gap-2 transition-all shadow-lg font-sans-luxury"
              >
                <span>Explore {pairingProduct.name}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* Collector Reviews */}
        <div className="space-y-8 pt-12 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] text-[#c5a880] uppercase tracking-[0.25em] font-semibold block">
                Verified Impressions
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-neutral-100 mt-1">
                Collector Chronicles
              </h3>
            </div>

            <div className="flex items-center gap-2 text-sm text-[#c5a880]">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-current text-[#c5a880]" />
                ))}
              </div>
              <span className="font-bold text-white text-base">{product.rating}</span>
              <span className="text-neutral-400 text-xs">/ 5.0 rating</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {scentReviews.length > 0 ? (
              scentReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="glass-card rounded-xl p-7 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex text-[#c5a880]">
                        {Array.from({ length: rev.rating }).map((_, idx) => (
                          <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-[10px] text-neutral-500">{rev.date}</span>
                    </div>
                    <h4 className="font-serif-luxury text-sm font-semibold text-neutral-100">
                      &ldquo;{rev.title}&rdquo;
                    </h4>
                    <p className="text-xs text-neutral-300 leading-relaxed font-light">
                      {rev.content}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-white/5 text-[11px] text-[#c5a880] font-medium flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{rev.author} (Verified Collector)</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 glass-card rounded-xl p-10 text-center space-y-2">
                <p className="text-xs text-neutral-300 font-light">
                  Be among the first initiates to inscribe impressions for this recent harvest batch.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sticky Mobile Purchase Bar */}
      <StickyMobileBar product={product} />
    </div>
  );
}
