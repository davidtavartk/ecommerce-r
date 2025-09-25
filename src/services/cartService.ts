import { CartItem, CartResponse } from '@/types/types';
import { apiRequest } from './apiClient';
import { CheckoutFormData } from '@/app/checkout/schema';

export const cartService = {
  getCart: () => apiRequest<CartItem[]>('/cart', { method: 'GET' }),

  addToCart: (productId: number, quantity: number, color: string, size: string) =>
    apiRequest<CartResponse>(`/cart/products/${productId}`, {
      method: 'POST',
      body: JSON.stringify({
        quantity,
        color,
        size,
      }),
    }),

  updateCartItem: (productId: number, quantity: number) =>
    apiRequest<CartResponse>(`/cart/products/${productId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        quantity,
      }),
    }),

  removeFromCart: (productId: number, color: string, size: string) =>
    apiRequest<CartResponse>(`/cart/products/${productId}`, {
      method: 'DELETE',
      body: JSON.stringify({
        color,
        size,
      }),
    }),

  checkoutCart: (checkoutData: CheckoutFormData) =>
    apiRequest('/cart/checkout', {
      method: 'POST',
      body: JSON.stringify(checkoutData),
    }),

  clearAllItems: async () => {
    const cartItems = await cartService.getCart();
    await Promise.all(cartItems.map((item) => cartService.removeFromCart(item.id, item.color, item.size)));
  },
};
