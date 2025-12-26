'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartItem, Product, ProductVariant } from '@/types';
import { calculateCartTotals } from '@/lib/utils';
import { CART_STORAGE_KEY } from '@/lib/utils/constants';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getTotals: () => {
    subtotal: number;
    shipping: number;
    discount: number;
    total: number;
  };
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, variant, quantity = 1) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) =>
              item.productId === product.id &&
              item.variantId === variant?.id
          );

          if (existingItemIndex > -1) {
            // Update quantity of existing item
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex].quantity += quantity;
            return { items: updatedItems };
          } else {
            // Add new item
            const newItem: CartItem = {
              productId: product.id,
              variantId: variant?.id,
              quantity,
              priceSnapshot: product.salePrice || product.basePrice,
              product,
              variant,
            };
            return { items: [...state.items, newItem] };
          }
        });
      },

      removeItem: (productId, variantId) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(item.productId === productId && item.variantId === variantId)
          ),
        }));
      },

      updateQuantity: (productId, quantity, variantId) => {
        set((state) => {
          if (quantity <= 0) {
            // Remove item if quantity is 0 or less
            return {
              items: state.items.filter(
                (item) =>
                  !(item.productId === productId && item.variantId === variantId)
              ),
            };
          }

          const updatedItems = state.items.map((item) => {
            if (item.productId === productId && item.variantId === variantId) {
              return { ...item, quantity };
            }
            return item;
          });
          return { items: updatedItems };
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotals: () => {
        const items = get().items;
        return calculateCartTotals(items, 0, 0);
      },
    }),
    {
      name: CART_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      // Optionally, you can add a partialize function to only persist specific fields
      partialize: (state) => ({ items: state.items }),
    }
  )
);

// Hook to get cart count safely (handles SSR)
export function useCartCount(): number {
  const itemCount = useCartStore((state) => state.getItemCount());
  return itemCount;
}

// Hook to get cart totals
export function useCartTotals() {
  const getTotals = useCartStore((state) => state.getTotals);
  return getTotals();
}
