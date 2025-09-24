import { AuthState, User } from '@/types/types';
import { getCookie } from '@/utils/browser';
import { create } from 'zustand';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  login: (token: string, userData: User) => {
    document.cookie = `accessToken=${token}; path=/; max-age=${7 * 24 * 60 * 60}`;
    localStorage.setItem('user', JSON.stringify(userData));
    set({ user: userData, isAuthenticated: true, isLoading: false });
  },

  logout: () => {
    document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    localStorage.removeItem('user');
    set({ user: null, isAuthenticated: false, isLoading: false });
    window.location.href = '/';
  },

  initializeAuth: () => {
    if (typeof window === 'undefined') return;

    const token = getCookie('accessToken');
    const savedUser = localStorage.getItem('user');

    if (token && savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        set({ user: userData, isAuthenticated: true, isLoading: false });
      } catch {
        // Invalid saved data
        set({ user: null, isAuthenticated: false, isLoading: false });
      }
    }
  },
}));
