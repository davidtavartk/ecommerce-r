import { CartItem, CartResponse } from '@/types/types';
import { apiRequest } from './apiClient';

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

  removeFromCart: (itemId: number) => apiRequest<CartResponse>(`/cart/${itemId}`, { method: 'DELETE' }),
};
