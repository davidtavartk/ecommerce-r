'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { RHFInput } from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import { useState } from 'react';
import EyeIcon from '../../../../../public/svgs/components/EyeIcon';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '../../schema';
import { authService } from '@/services/authService';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuthStore();

  const router = useRouter();

  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await authService.login(data);
      login(response.token, response.user);
      console.log('Login response:', response);

      router.push('/');
    } catch (err: any) {
      // console.log('Error', err);
      if (err.data?.errors) {
        Object.keys(err.data.errors).forEach((field) => {
          methods.setError(field as keyof LoginFormData, {
            message: err.data.errors[field][0],
          });
        });
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-12">
        <div className="flex flex-col gap-6">
          {/* Email */}
          <div>
            <RHFInput name="email" placeholder="Email" isRequired inputClassName="w-full px-3.5  py-2 rounded-lg" />
          </div>

          {/* Password */}
          <div className="relative">
            <RHFInput
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              isRequired
              inputClassName="w-full px-3.5  py-2 rounded-lg"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2"
            >
              <EyeIcon isPasswordVisible={showPassword} />
            </button>
          </div>
        </div>

        <Button type="submit" className="w-full">
          Log in
        </Button>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
