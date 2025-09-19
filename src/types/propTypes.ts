import { Product } from './types';

export interface ProductCardProps {
  product: Product;
  key: number;
}

export interface ProductHeaderProps {
  from?: number;
  to?: number;
  total?: number;
}

export interface FiltrationProps {
  from?: number;
  to?: number;
  total?: number;
}