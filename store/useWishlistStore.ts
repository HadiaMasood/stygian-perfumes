import { create } from 'zustand';

interface WishlistState {
  items: string[]; // product slugs
  toggleWishlist: (slug: string) => void;
  isInWishlist: (slug: string) => boolean;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: [],
  toggleWishlist: (slug: string) => {
    const { items } = get();
    if (items.includes(slug)) {
      set({ items: items.filter((s) => s !== slug) });
    } else {
      set({ items: [...items, slug] });
    }
  },
  isInWishlist: (slug: string) => {
    return get().items.includes(slug);
  },
}));
