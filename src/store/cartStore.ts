import { CartState } from '@/types/types';
import { cartService } from '@/services/cartService';
import { create } from 'zustand';
import { CheckoutFormData } from '@/app/checkout/schema';
import { useAuthStore } from './authStore';

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  isOpen: false,
  loading: true,
  updateLoading: false,

  fetchCart: async (silent = false) => {
    if (!silent) {
      set({ loading: true });
    }
    try {
      const cartItems = await cartService.getCart();

      const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

      set({
        items: cartItems,
        totalQuantity,
        totalPrice,
        loading: false,
      });
    } catch (error) {
      if ((error as any)?.status === 401) {
        useAuthStore.getState().handleAuthError();
        return;
      }
      set({ items: [], totalQuantity: 0, totalPrice: 0, loading: false });
      if ((error as any)?.status !== 401) {
        throw error;
      }
    }
  },

  addToCart: async (productId: number, quantity: number, color: string, size: string) => {
    set({ loading: true });
    try {
      await cartService.addToCart(productId, quantity, color, size);

      await get().fetchCart();
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  updateCartItem: async (itemId: number, quantity: number) => {
    const currentItems = get().items;
    const updatedItems = currentItems.map((item) => (item.id === itemId ? { ...item, quantity } : item));

    const newTotalQuantity = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
    const newTotalPrice = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    set({
      items: updatedItems,
      totalQuantity: newTotalQuantity,
      totalPrice: newTotalPrice,
    });

    try {
      const cartItem = currentItems.find((item) => item.id === itemId);
      if (!cartItem) {
        throw new Error('Cart item not found');
      }

      await cartService.updateCartItem(cartItem.id, quantity);
    } catch (error) {
      set({
        items: currentItems,
        totalQuantity: currentItems.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice: currentItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      });
      throw error;
    }
  },

  removeFromCart: async (itemId: number) => {
    try {
      const cartItem = get().items.find((item) => item.id === itemId);
      if (!cartItem) {
        throw new Error('Cart item not found');
      }

      await cartService.removeFromCart(cartItem.id);

      const updatedItems = get().items.filter((item) => item.id !== itemId);
      const newTotalQuantity = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      const newTotalPrice = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

      set({
        items: updatedItems,
        totalQuantity: newTotalQuantity,
        totalPrice: newTotalPrice,
      });

      if (updatedItems.length === 0) {
        if (typeof window !== 'undefined' && window.location.pathname === '/checkout') {
          window.location.href = '/';
        }
      }
    } catch (error) {
      throw error;
    }
  },

  checkout: async (checkoutData: CheckoutFormData) => {
    set({ loading: true });
    try {
      await cartService.checkoutCart(checkoutData);

      await cartService.clearAllItems();

      await get().fetchCart(true);
      set({
        isOpen: false,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },

  toggleCart: () => {
    const currentState = get();
    const newIsOpen = !currentState.isOpen;

    set({ isOpen: newIsOpen });

    if (newIsOpen) {
      get().fetchCart(true);
    }
  },
}));
