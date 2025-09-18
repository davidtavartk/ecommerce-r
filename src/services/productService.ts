import { apiRequest } from './apiClient';

export const productService = {
  getProducts: () =>
    apiRequest('/products', {
      method: 'GET',
    }),
};
