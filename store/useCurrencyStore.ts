import { create } from 'zustand';

export type Currency = 'USD' | 'EUR' | 'GBP';

interface CurrencyRate {
  symbol: string;
  rate: number; // relative to USD
}

const CURRENCIES: Record<Currency, CurrencyRate> = {
  USD: { symbol: '$', rate: 1.0 },
  EUR: { symbol: '€', rate: 0.92 },
  GBP: { symbol: '£', rate: 0.79 },
};

interface CurrencyState {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (priceInUSD: number) => string;
  convertPrice: (priceInUSD: number) => number;
}

export const useCurrencyStore = create<CurrencyState>((set, get) => ({
  currency: 'USD',
  setCurrency: (currency) => set({ currency }),
  convertPrice: (priceInUSD: number) => {
    const { currency } = get();
    const rate = CURRENCIES[currency]?.rate || 1.0;
    return Math.round(priceInUSD * rate);
  },
  formatPrice: (priceInUSD: number) => {
    const { currency } = get();
    const { symbol, rate } = CURRENCIES[currency] || CURRENCIES.USD;
    const converted = Math.round(priceInUSD * rate);
    return `${symbol}${converted}`;
  },
}));
