import { CartState } from '@/types/types';
import { cartService } from '@/services/cartService';
import { create } from 'zustand';

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  isOpen: false,
  loading: false,
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
        loading: silent ? get().loading : false,
      });
    } catch (error) {
      console.error('Failed to fetch cart:', error);
      set({ items: [], totalQuantity: 0, totalPrice: 0, loading: silent ? get().loading : false });
    }
  },

  addToCart: async (productId: number, quantity: number, color: string, size: string) => {
    set({ loading: true });
    try {
      await cartService.addToCart(productId, quantity, color, size);

      await get().fetchCart();
    } catch (error) {
      console.error('Failed to add to cart:', error);
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
      console.error('Failed to update cart item:', error);
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
