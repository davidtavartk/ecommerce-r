import { Product } from './types';

export interface ProductCardProps {
  product: Product;
  key: number;
}

export interface ProductHeaderProps {
  from?: number;
  to?: number;
  total?: number;
  currentSort?: string;
  onApplyFilter?: (priceFrom: string, priceTo: string) => void;
  onSortChange?: (sortType: string) => void;
}

export interface FiltrationProps {
  from?: number;
  to?: number;
  total?: number;
  onApplyFilter?: (priceFrom: string, priceTo: string) => void;
  onSortChange?: (sortType: string) => void;
  currentSort?: string;
}
