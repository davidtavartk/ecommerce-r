import { apiRequest } from './apiClient';

export const productService = {
  getProducts: () =>
    apiRequest('/products', {
      method: 'GET',
    }),

  getProductById: (id: number) =>
    apiRequest(`/products/${id}`, {
      method: 'GET',
    }),
};
