'use client';

import { useAuthStore } from '@/store/authStore';
import { useEffect } from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

export default function AuthLoader({ children }: { children: React.ReactNode }) {
  const { isLoading, initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return <>{children}</>;
}
