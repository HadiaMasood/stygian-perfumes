'use client';

import React, { useEffect } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { Sparkles, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage, hideToast } = useCartStore();

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        hideToast();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage, hideToast]);

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-bounce-short transition-all">
      <div className="flex items-center gap-3 bg-[#13141b]/95 border border-[#c5a880]/40 text-[#f0f1f5] px-5 py-3.5 rounded-lg shadow-2xl backdrop-blur-xl">
        <Sparkles className="w-5 h-5 text-[#c5a880] shrink-0" />
        <p className="text-sm font-medium tracking-wide text-neutral-200">{toastMessage}</p>
        <button
          onClick={hideToast}
          className="ml-auto text-neutral-400 hover:text-white transition-colors p-1"
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
