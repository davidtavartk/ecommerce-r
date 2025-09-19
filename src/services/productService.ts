import { PaginatedResponse, Product } from '@/types/types';
import { apiRequest } from './apiClient';

export const productService = {
  getAllProducts: (page: number) =>
    apiRequest<PaginatedResponse<Product>>(`/products?page=${page}`, {
      method: 'GET',
    }),

  getProductById: (id: number) =>
    apiRequest<Product>(`/products/${id}`, {
      method: 'GET',
    }),
};
