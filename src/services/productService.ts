import { PaginatedResponse, Product } from '@/types/types';
import { apiRequest } from './apiClient';

export const productService = {
  getAllProducts: () =>
    apiRequest<PaginatedResponse<Product>>('/products', {
      method: 'GET',
    }),

  getProductById: (id: number) =>
    apiRequest<Product>(`/products/${id}`, {
      method: 'GET',
    }),
};
