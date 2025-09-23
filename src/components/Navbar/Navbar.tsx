'use client';

import { useAuthStore } from '@/store/authStore';
import Image from 'next/image';
import { useEffect } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import CartSidebar from '../Cart/CartSidebar';
import { DialogTrigger, Button as AriaButton, Popover } from 'react-aria-components';

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
              <div className="relative">
                <DialogTrigger>
                  <AriaButton
                    className="relative flex cursor-pointer items-center justify-center rounded-full border border-[#E1DFE1]"
                    style={{ width: 40, height: 40 }}
                  >
                    {user?.avatar ? (
                      <Image
                        src={user.avatar}
                        alt="avatar"
                        width={40}
                        height={40}
                        className="aspect-square rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-xs font-bold text-gray-600">{user?.username?.charAt(0).toUpperCase()}</span>
                    )}
                  </AriaButton>

                  <Popover className="border-l-gray w-[120px] rounded-lg border bg-white p-2 shadow-lg" placement="bottom end">
                    <button
                      onClick={logout}
                      className="w-full rounded px-3 py-2 text-left text-xs font-medium hover:bg-gray-50 hover:underline cursor-pointer"
                    >
                      Logout
                    </button>
                  </Popover>
                </DialogTrigger>
              </div>
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
