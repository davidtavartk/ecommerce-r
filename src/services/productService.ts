import { PaginatedResponse, Product } from '@/types/types';
import { apiRequest } from './apiClient';

export const productService = {
  getAllProducts: (queryString: string = '') =>
    apiRequest<PaginatedResponse<Product>>(`/products?${queryString}`, {
      method: 'GET',
    }),

  getProductById: (id: number) =>
    apiRequest<Product>(`/products/${id}`, {
      method: 'GET',
    }),
};
