'use client';

import { useState } from 'react';
import { RHFInput } from '@/components/common/Input/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import EyeIcon from '../../../../../public/svgs/components/EyeIcon';
import Button from '@/components/common/Button/Button';
import { RegistrationFormData, registrationSchema } from '../../schema';
import { authService } from '@/services/authService';
import { RHFAvatarInput } from '@/components/common/Input/AvatarInput';
import { useAuthStore } from '@/store/authStore';

const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { login } = useAuthStore();

  const methods = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      avatar: undefined,
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: RegistrationFormData) => {
    try {
      const response = await authService.register(data);
      login(response.token, response.user);
    } catch (err: any) {
      if (err.data?.errors) {
        Object.keys(err.data.errors).forEach((field) => {
          methods.setError(field as keyof RegistrationFormData, {
            message: err.data.errors[field][0],
          });
        });
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-12">
        {/* Avatar */}
        <div className="flex">
          <RHFAvatarInput name="avatar" size={100} />
        </div>

        <div className="flex flex-col gap-6">
          {/* Username */}
          <div>
            <RHFInput name="username" placeholder="Username" isRequired inputClassName="w-full px-3.5  py-2 rounded-lg" />
          </div>

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
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
            >
              <EyeIcon isPasswordVisible={showPassword} />
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <RHFInput
              name="password_confirmation"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              isRequired
              inputClassName="w-full px-3.5  py-2 rounded-lg"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
            >
              <EyeIcon isPasswordVisible={showConfirmPassword} />
            </button>
          </div>
        </div>

        <Button type="submit" className="w-full">
          Register
        </Button>
      </form>
    </FormProvider>
  );
};

export default RegistrationForm;
