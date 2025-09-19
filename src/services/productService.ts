import { apiRequest } from './apiClient';

export const productService = {
  getAllProducts: () =>
    apiRequest('/products', {
      method: 'GET',
    }),

  getProductById: (id: number) =>
    apiRequest(`/products/${id}`, {
      method: 'GET',
    }),
};
