import { CartResponse } from '@/types/types';
import { apiRequest } from './apiClient';

export const cartService = {
  getCart: () => apiRequest<CartResponse>('/cart', { method: 'GET' }),

  addToCart: (productId: number, quantity: number, color: string, size: string) =>
    apiRequest<CartResponse>('/cart', {
      method: 'POST',
      body: JSON.stringify({
        product_id: productId,
        quantity,
        color,
        size,
      }),
    }),

  updateCartItem: (itemId: number, quantity: number, color?: string, size?: string) =>
    apiRequest<CartResponse>(`/cart/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({
        quantity,
        ...(color && { color }),
        ...(size && { size }),
      }),
    }),

  removeFromCart: (itemId: number) => apiRequest<CartResponse>(`/cart/${itemId}`, { method: 'DELETE' }),
};
