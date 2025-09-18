"use client"

import Image from 'next/image';
import LoginForm from './components/Login/LoginForm';
import RegistrationForm from './components/Registration/RegistrationForm';
import { useState } from 'react';

export default function SignUp() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="flex h-screen">
      <div className="flex-1">
        <Image
          src="/images/signupImage.png"
          alt="signupImage"
          width={948}
          height={1000}
          className="h-full w-full object-cover"
          priority
        />
      </div>
      <div className="mx-auto flex flex-1 flex-col items-center justify-center">
        <div className="mx-auto flex w-[554px] flex-col gap-10">
          <h1 className="text-[42px] font-semibold">{isLogin ? 'Log In' : 'Register'}</h1>
          <div className="flex flex-col gap-6">
            {isLogin ? <LoginForm /> : <RegistrationForm />}
            <div className="flex justify-center gap-2">
              <span className="text-l-blue text-sm">Not a member?</span>
              <button
                className="text-c-orange cursor-pointer text-sm font-medium hover:underline"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? 'Register' : 'Log In'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
