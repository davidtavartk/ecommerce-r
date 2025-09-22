'use client';

import { useAuthStore } from '@/store/authStore';
import Image from 'next/image';
import { useEffect } from 'react';
import CircleButton from '../common/Button/CircleButton';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import CartSidebar from '../Cart/CartSidebar';

const Navbar = () => {
  const { user, isAuthenticated, logout, initializeAuth } = useAuthStore();
  const { toggleCart, fetchCart } = useCartStore();

  useEffect(() => {
    initializeAuth();
    if (isAuthenticated) {
      fetchCart();
    }
  }, [initializeAuth, isAuthenticated, fetchCart]);

  return (
    <nav className="h-[80px]">
      <div className="mx-auto flex h-full items-center justify-between px-[100px]">
        <Link href="/" className="flex cursor-pointer items-center gap-1">
          <Image src="/images/logo.png" alt="Logo" width={24} height={24} priority />
          <span className="font-semibold">RedSeam Clothing</span>
        </Link>

        {isAuthenticated ? (
          <div className="flex items-center gap-5">
            <button onClick={toggleCart} className="cursor-pointer">
              <Image src="/svgs/cart-icon.svg" alt="Cart Icon" width={24} height={24} />
            </button>
            <div className="flex items-center gap-3">
              {user?.avatar ? (
                <CircleButton photoSrc={user.avatar} size={40} />
              ) : (
                <CircleButton size={40}>
                  <span className="text-xs font-bold text-gray-600">{user?.username?.charAt(0).toUpperCase()}</span>
                </CircleButton>
              )}
              <button onClick={logout} className="text-c-orange text-xs font-medium hover:underline">
                Logout
              </button>
            </div>
          </div>
        ) : (
          <Link href="/signup" className="flex cursor-pointer items-center gap-2">
            <Image src="/svgs/login-icon.svg" alt="login Icon" width={20} height={20} />
            <span className="text-xs font-medium">Log In</span>
          </Link>
        )}
      </div>
      <CartSidebar />
    </nav>
  );
};

export default Navbar;
