import { CartItem, Product } from './types';

export interface ProductCardProps {
  product: Product;
  key: number;
}

export interface ProductHeaderProps {
  from?: number;
  to?: number;
  total?: number;
  currentSort?: string;
  currentPriceFrom?: string;
  currentPriceTo?: string;
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
  currentPriceFrom?: string;
  currentPriceTo?: string;
}

export interface CartItemProps {
  product: CartItem;
  onUpdateQuantity?: (itemId: number, newQuantity: number, color: string, size: string) => void;
  onRemove?: (itemId: number, color: string, size: string) => void;
}
