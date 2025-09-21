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
  login: (token: string, userData: User) => void;
  logout: () => void;
  initializeAuth: () => void;
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
  fetchCart: () => Promise<void>;
  addToCart: (productId: number, quantity: number, color: string, size: string) => Promise<void>;
  updateCartItem: (itemId: number, quantity: number, color?: string, size?: string) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  clearCart: () => void;
  toggleCart: () => void;
}
