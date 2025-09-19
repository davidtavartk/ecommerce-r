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
  price: number;
  image: string;
}

