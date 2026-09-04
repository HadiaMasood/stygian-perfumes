'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS, Product } from '@/data/products';
import { useCartStore } from '@/store/useCartStore';
import { useCurrencyStore } from '@/store/useCurrencyStore';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Compass,
  ArrowRight,
  RotateCcw,
  ShoppingBag,
} from 'lucide-react';

interface Question {
  id: number;
  title: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    targetSlug: string;
    icon: string;
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    title: 'Choose Your Nocturnal Sanctuary',
    subtitle: 'Where does your spirit wander when the sun retreats?',
    options: [
      {
        label: 'Dense Frostbitten Pine Forest',
        description: 'Needle-sharp mountain chill, crackling wood fire, cold mist.',
        targetSlug: 'wolfsbane',
        icon: '🌲',
      },
      {
        label: 'Candlelit Velvet Venetian Salon',
        description: 'Decanted port wine, wilted purple orchids, forbidden liqueurs.',
        targetSlug: 'belladonna',
        icon: '🍷',
      },
      {
        label: 'Ancient Gothic Cathedral Vaults',
        description: 'Swinging silver censers, frankincense smoke, golden silence.',
        targetSlug: 'nox-arcana',
        icon: '🕯️',
      },
      {
        label: 'Moonlit Damp Rose Garden',
        description: 'Crimson petals steeped in dark spiced rum and ebony wood.',
        targetSlug: 'obsidian-rose',
        icon: '🥀',
      },
      {
        label: 'Rainfall over Ancient Marble Necropolis',
        description: 'Cold stone, geosmin petrichor, and whispering cypress avenues.',
        targetSlug: 'thanatos',
        icon: '🏛️',
      },
      {
        label: 'Crossroads of Divination & Absinthe',
        description: 'Bitter wormwood, dewy violet leaves, and steamed dark black tea.',
        targetSlug: 'hecates-veil',
        icon: '🌿',
      },
    ],
  },
  {
    id: 2,
    title: 'Select Your Desired Emotional Aura',
    subtitle: 'How should your sillage affect those who enter your orbit?',
    options: [
      {
        label: 'Commanding, Brooding & Dangerous',
        description: 'A magnetic presence that commands instant, respectful stillness.',
        targetSlug: 'wolfsbane',
        icon: '🐺',
      },
      {
        label: 'Intoxicating, Carnal & Hypnotic',
        description: 'An addictive narcotic allure that cannot be forgotten.',
        targetSlug: 'belladonna',
        icon: '🔮',
      },
      {
        label: 'Sacred, Meditative & Transcendent',
        description: 'The sublime elevation of holy resins and rare agarwood.',
        targetSlug: 'nox-arcana',
        icon: '✨',
      },
      {
        label: 'Opulent, Romantic & Enveloping',
        description: 'Warm, boozy spiced rose petals melting into cashmere.',
        targetSlug: 'obsidian-rose',
        icon: '🌹',
      },
      {
        label: 'Serene, Aristocratic & Ethereal',
        description: 'A clean mineral tranquility reminiscent of rain on stone.',
        targetSlug: 'thanatos',
        icon: '🌧️',
      },
      {
        label: 'Enigmatic, Herbal & Nocturnal',
        description: 'A sharp intellect cloaked in moonlit emerald mist.',
        targetSlug: 'hecates-veil',
        icon: '🌙',
      },
    ],
  },
  {
    id: 3,
    title: 'Intensity & Concentration Preference',
    subtitle: 'How potent do you desire your flacon extrait to be?',
    options: [
      {
        label: 'Ultra-High Extrait (35-38%)',
        description: 'Maximum density; leaves an indelible trail for 16+ hours.',
        targetSlug: 'nox-arcana',
        icon: '🔥',
      },
      {
        label: 'Rich Parfum Intense (26-30%)',
        description: 'Opulent projection with velvety seamless drydown.',
        targetSlug: 'belladonna',
        icon: '💫',
      },
      {
        label: 'Contemplative Eau de Parfum (24-25%)',
        description: 'Sophisticated, breathable intimacy that blossoms with body warmth.',
        targetSlug: 'thanatos',
        icon: '💧',
      },
    ],
  },
];

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [matchedProduct, setMatchedProduct] = useState<Product | null>(null);

  const { addItem } = useCartStore();
  const { formatPrice } = useCurrencyStore();

  const handleSelectOption = (slug: string) => {
    const nextAnswers = [...selectedAnswers, slug];
    setSelectedAnswers(nextAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate most frequent slug
      const counts: Record<string, number> = {};
      nextAnswers.forEach((s) => {
        counts[s] = (counts[s] || 0) + 1;
      });

      let bestSlug = 'wolfsbane';
      let maxCount = 0;
      Object.entries(counts).forEach(([s, count]) => {
        if (count > maxCount) {
          maxCount = count;
          bestSlug = s;
        }
      });

      const matched = PRODUCTS.find((p) => p.slug === bestSlug) || PRODUCTS[0];
      setMatchedProduct(matched);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#c5a880', '#e4caa4', '#9d6381', '#ffffff'],
        });
      } catch {
        // ignore
      }
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setSelectedAnswers([]);
    setMatchedProduct(null);
  };

  const currentQ = QUESTIONS[currentStep];

  return (
    <div className="min-h-screen bg-[#07080c] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {!matchedProduct ? (
          <div className="space-y-10">
            {/* Header & Progress */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 text-[#c5a880] text-xs font-semibold uppercase tracking-[0.25em]">
                <Compass className="w-3.5 h-3.5" />
                <span>The Scent Divination</span>
              </div>
              <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-neutral-100">
                Find Your Dark Signature Aura
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400">
                Answer three sensory inquiries to reveal the Stygian blend crafted for your chemistry.
              </p>

              {/* Progress Stepper */}
              <div className="pt-4 max-w-xs mx-auto flex items-center gap-2">
                {QUESTIONS.map((q, idx) => (
                  <div
                    key={q.id}
                    className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                      idx <= currentStep
                        ? 'bg-gradient-to-r from-[#8c6d48] to-[#c5a880]'
                        : 'bg-[#1e202f]'
                    }`}
                  />
                ))}
              </div>
              <div className="text-[11px] text-[#c5a880] uppercase tracking-widest font-semibold">
                Inquiry {currentStep + 1} of {QUESTIONS.length}
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-[#0c0d15] border border-[#212435] rounded-2xl p-8 sm:p-10 shadow-2xl space-y-6">
              <div className="text-center space-y-1">
                <h2 className="font-serif-luxury text-2xl font-bold text-white">
                  {currentQ.title}
                </h2>
                <p className="text-xs text-neutral-400">{currentQ.subtitle}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {currentQ.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(option.targetSlug)}
                    className="p-5 rounded-xl border border-[#23263a] bg-[#11131f] hover:border-[#c5a880] hover:bg-[#181928] text-left transition-all duration-300 hover:-translate-y-0.5 space-y-2 group shadow-lg"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{option.icon}</span>
                      <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-[#c5a880] transition-colors" />
                    </div>
                    <h3 className="font-serif-luxury text-base font-semibold text-neutral-100 group-hover:text-[#c5a880] transition-colors">
                      {option.label}
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {option.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Match Result Card */
          <div className="bg-[#0c0d15] border border-[#c5a880]/40 rounded-2xl p-8 sm:p-12 shadow-2xl space-y-8 animate-fade-in">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 text-[#c5a880] text-xs font-semibold uppercase tracking-[0.25em]">
                <Sparkles className="w-4 h-4 text-[#c5a880]" />
                <span>Your Divined Signature Scent</span>
              </div>
              <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-neutral-100">
                {matchedProduct.name}
              </h2>
              <p className="text-sm text-[#c5a880] italic font-serif-luxury">
                {matchedProduct.tagline}
              </p>
            </div>

            {/* Product Card Showcase */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#11121d] border border-[#24273b] rounded-xl p-6 sm:p-8">
              <div className="md:col-span-5 relative aspect-[4/5] rounded-lg overflow-hidden bg-[#161826] border border-[#2d3046]">
                <Image
                  src={matchedProduct.images.primary}
                  alt={matchedProduct.name}
                  fill
                  sizes="300px"
                  className="object-cover"
                />
              </div>

              <div className="md:col-span-7 space-y-5">
                <div>
                  <span className="text-xs text-[#8c6d48] uppercase tracking-widest font-semibold block">
                    {matchedProduct.fragranceFamily} • {matchedProduct.concentration}
                  </span>
                  <h3 className="font-serif-luxury text-2xl font-bold text-white mt-1">
                    98.4% Harmonious Alignment
                  </h3>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed">
                  {matchedProduct.story}
                </p>

                {/* Scent Notes Preview */}
                <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                  <div className="bg-[#181a28] p-2 rounded border border-[#2a2d42]">
                    <span className="text-neutral-500 uppercase block">Top Note</span>
                    <span className="text-neutral-200 font-medium truncate block">
                      {matchedProduct.notes.top[0]?.name}
                    </span>
                  </div>
                  <div className="bg-[#181a28] p-2 rounded border border-[#2a2d42]">
                    <span className="text-[#9d6381] uppercase block">Heart Note</span>
                    <span className="text-neutral-200 font-medium truncate block">
                      {matchedProduct.notes.heart[0]?.name}
                    </span>
                  </div>
                  <div className="bg-[#181a28] p-2 rounded border border-[#2a2d42]">
                    <span className="text-[#8c6d48] uppercase block">Base Note</span>
                    <span className="text-neutral-200 font-medium truncate block">
                      {matchedProduct.notes.base[0]?.name}
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] text-neutral-500 uppercase block">From 30ml</span>
                    <span className="font-serif-luxury text-2xl font-bold text-[#c5a880]">
                      {formatPrice(matchedProduct.volumes[0].price)}
                    </span>
                  </div>

                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => addItem(matchedProduct, matchedProduct.volumes[0])}
                      className="flex-1 sm:flex-initial px-6 py-3 bg-[#c5a880] hover:bg-[#d8be96] text-black font-semibold text-xs tracking-wider uppercase rounded-lg flex items-center justify-center gap-2 shadow-lg"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add To Bag</span>
                    </button>

                    <Link
                      href={`/shop/${matchedProduct.slug}`}
                      className="flex-1 sm:flex-initial px-5 py-3 bg-[#1e2030] hover:bg-[#272a3e] text-neutral-200 text-xs font-semibold uppercase tracking-wider rounded-lg border border-[#31354d] text-center transition-colors"
                    >
                      Full Profile
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Restart Quiz */}
            <div className="text-center pt-2">
              <button
                onClick={handleRestart}
                className="text-xs text-neutral-400 hover:text-[#c5a880] inline-flex items-center gap-2 uppercase tracking-widest transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Repeat Scent Divination</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
