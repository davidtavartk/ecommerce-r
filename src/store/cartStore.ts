import { CartState } from '@/types/types';
import { cartService } from '@/services/cartService';
import { create } from 'zustand';

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  isOpen: false,
  loading: false,

  fetchCart: async () => {
    set({ loading: true });
    try {
      const cartItems = await cartService.getCart();

      // Calculate totals from the array
      const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

      set({
        items: cartItems,
        totalQuantity,
        totalPrice,
        loading: false,
      });
    } catch (error) {
      console.error('Failed to fetch cart:', error);
      set({ items: [], totalQuantity: 0, totalPrice: 0, loading: false });
    }
  },

  addToCart: async (productId: number, quantity: number, color: string, size: string) => {
    set({ loading: true });
    try {
      const response = await cartService.addToCart(productId, quantity, color, size);

      console.log('API Response:', response);

      set({
        items: response.items || [],
        totalQuantity: response.total_quantity || 0,
        totalPrice: response.total_price || 0,
        loading: false,
      });
    } catch (error) {
      console.error('Failed to add to cart:', error);
      set({ loading: false });
      throw error;
    }
  },

  updateCartItem: async (itemId: number, quantity: number, color?: string, size?: string) => {
    try {
      const response = await cartService.updateCartItem(itemId, quantity, color, size);
      set({
        items: response.items,
        totalQuantity: response.total_quantity,
        totalPrice: response.total_price,
      });
    } catch (error) {
      console.error('Failed to update cart item:', error);
      throw error;
    }
  },

  removeFromCart: async (itemId: number) => {
    try {
      const response = await cartService.removeFromCart(itemId);
      set({
        items: response.items,
        totalQuantity: response.total_quantity,
        totalPrice: response.total_price,
      });
    } catch (error) {
      console.error('Failed to remove from cart:', error);
      throw error;
    }
  },

  clearCart: () => {
    set({ items: [], totalQuantity: 0, totalPrice: 0 });
  },

  toggleCart: () => {
    set({ isOpen: !get().isOpen });
  },
}));
