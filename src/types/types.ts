import { CheckoutFormData } from '@/app/checkout/schema';

export interface User {
  id: number;
  username: string;
  email: string;
  avatar: string | null;
  is_admin: number;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
  initializeAuth: () => void;
  handleAuthError: () => void;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  cover_image: string;
  images: string[];
  available_colors: string[];
  available_sizes: string[];
  brand: {
    id: number;
    name: string;
    image: string;
  };
  size: string;
  color: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

export interface CartItem {
  id: number;
  product_id: number;
  quantity: number;
  color: string;
  size: string;
  product: Product;
  price: number;
  cover_image: string;
  name: string;
}

export interface CartResponse {
  items: CartItem[];
  total_quantity: number;
  total_price: number;
}

export interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  isOpen: boolean;
  loading: boolean;
  updateLoading: boolean;
  fetchCart: (silent?: boolean) => Promise<void>;
  addToCart: (productId: number, quantity: number, color: string, size: string) => Promise<void>;
  updateCartItem: (itemId: number, quantity: number, color?: string, size?: string) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  checkout: (checkoutData: CheckoutFormData) => Promise<void>;
  toggleCart: () => void;
}
