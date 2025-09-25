'use client';

import Button from '../Button/Button';
import Image from 'next/image';
import { LoginRequiredProps } from '../types/propTypes';

const LoginRequired = ({
  onLoginClick,
  onContinueShoppingClick,
  title = 'Login Required',
  description = 'You need to be logged in to proceed with checkout',
}: LoginRequiredProps) => {
  return (
    <div className="mx-auto min-h-screen px-[100px] py-[72px]">
      <div className="flex min-h-[600px] flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center gap-6">
          <Image src="/svgs/login-icon.svg" alt="Login Required" width={64} height={64} />
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-[42px] font-semibold">{title}</h1>
            <p className="text-l-blue text-center text-lg">{description}</p>
          </div>
        </div>

        <div className="flex gap-4">
          <Button onClick={onLoginClick} className="px-8 py-3">
            Log In / Sign Up
          </Button>
          <Button
            onClick={onContinueShoppingClick}
            className="border-c-orange text-c-orange hover:bg-c-orange border-2 px-8 py-3 hover:text-white"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginRequired;
