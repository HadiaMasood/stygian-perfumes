import { create } from 'zustand';
import { Product, VolumeOption } from '@/data/products';

export interface CartItem {
  id: string; // combination of product.id and volume.sku
  product: Product;
  volume: VolumeOption;
  quantity: number;
  engraving?: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  selectedSampleId: string | null;
  giftBoxIncluded: boolean;
  giftMessage: string;
  appliedPromo: { code: string; discountPercent: number } | null;
  toastMessage: string | null;
  
  // Actions
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, volume: VolumeOption, quantity?: number, engraving?: string) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  setSelectedSampleId: (sampleId: string | null) => void;
  setGiftBox: (included: boolean) => void;
  setGiftMessage: (msg: string) => void;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  showToast: (msg: string) => void;
  hideToast: () => void;
  
  // Computed values
  getSubtotal: () => number;
  getDiscountAmount: () => number;
  getShippingCost: () => number; // free if subtotal >= 200
  getTotal: () => number;
  getItemCount: () => number;
}

const FREE_SHIPPING_THRESHOLD = 200;

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,
  selectedSampleId: 'sample-wolfsbane',
  giftBoxIncluded: false,
  giftMessage: '',
  appliedPromo: null,
  toastMessage: null,

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

  addItem: (product, volume, quantity = 1, engraving = '') => {
    const itemId = `${product.id}-${volume.sku}-${engraving || 'standard'}`;
    const { items } = get();
    const existingIndex = items.findIndex((i) => i.id === itemId);

    let updatedItems: CartItem[];
    if (existingIndex > -1) {
      updatedItems = items.map((item, index) =>
        index === existingIndex
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updatedItems = [
        ...items,
        {
          id: itemId,
          product,
          volume,
          quantity,
          engraving: engraving || undefined,
        },
      ];
    }

    set({
      items: updatedItems,
      isOpen: true,
      toastMessage: `Added ${product.name} (${volume.size}) to your bag.`,
    });
  },

  removeItem: (cartItemId) => {
    set((state) => ({
      items: state.items.filter((i) => i.id !== cartItemId),
    }));
  },

  updateQuantity: (cartItemId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(cartItemId);
      return;
    }
    set((state) => ({
      items: state.items.map((i) =>
        i.id === cartItemId ? { ...i, quantity } : i
      ),
    }));
  },

  clearCart: () => set({ items: [] }),

  setSelectedSampleId: (sampleId) => set({ selectedSampleId: sampleId }),
  setGiftBox: (included) => set({ giftBoxIncluded: included }),
  setGiftMessage: (giftMessage) => set({ giftMessage }),

  applyPromo: (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'STYGIAN10' || clean === 'VIP10') {
      set({
        appliedPromo: { code: clean, discountPercent: 10 },
        toastMessage: '10% Privileged Collector discount applied!',
      });
      return true;
    } else if (clean === 'DARKNESS15') {
      set({
        appliedPromo: { code: clean, discountPercent: 15 },
        toastMessage: '15% Nocturnal Solstice discount applied!',
      });
      return true;
    } else {
      set({ toastMessage: 'Invalid or expired secret code.' });
      return false;
    }
  },

  removePromo: () => set({ appliedPromo: null }),

  showToast: (toastMessage) => set({ toastMessage }),
  hideToast: () => set({ toastMessage: null }),

  getSubtotal: () => {
    return get().items.reduce(
      (sum, item) => sum + item.volume.price * item.quantity,
      0
    );
  },

  getDiscountAmount: () => {
    const { appliedPromo } = get();
    if (!appliedPromo) return 0;
    const subtotal = get().getSubtotal();
    return Math.round((subtotal * appliedPromo.discountPercent) / 100);
  },

  getShippingCost: () => {
    const subtotal = get().getSubtotal();
    if (subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
    return 20; // standard luxury courier
  },

  getTotal: () => {
    const subtotal = get().getSubtotal();
    const discount = get().getDiscountAmount();
    const shipping = get().getShippingCost();
    const giftBoxCost = get().giftBoxIncluded ? 15 : 0;
    return Math.max(0, subtotal - discount + shipping + giftBoxCost);
  },

  getItemCount: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },
}));
