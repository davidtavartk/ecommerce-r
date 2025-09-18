'use client';

import { useAuthStore } from '@/store/authStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import CircleButton from '../common/Button/CircleButton';

const Navbar = () => {
  const router = useRouter();
  const { user, isAuthenticated, logout, initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <nav className="h-[80px]">
      <div className="mx-auto flex h-full items-center justify-between px-[100px]">
        <div className="flex cursor-pointer items-center gap-1" onClick={() => router.push('/')}>
          <Image src="/images/logo.png" alt="Logo" width={24} height={24} />
          <span className="font-semibold">RedSeam Clothing</span>
        </div>

        {isAuthenticated ? (
          <div className="flex items-center gap-5">
            <Image src="/svgs/cartIcon.svg" alt="cartIcon" width={24} height={24} />
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
          <button className="flex cursor-pointer items-center gap-2" onClick={() => router.push('/signup')}>
            <Image src="/svgs/loginIcon.svg" alt="loginIcon" width={20} height={20} />
            <span className="text-xs font-medium">Log In</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
