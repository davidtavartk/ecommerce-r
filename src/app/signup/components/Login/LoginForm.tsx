'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { RHFInput } from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import { useState } from 'react';

interface LoginFormData {
  emailOrUsername: string;
  password: string;
}

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const methods = useForm<LoginFormData>({
    defaultValues: {
      emailOrUsername: '',
      password: '',
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: LoginFormData) => {
    console.log('Login data:', data);
    // TODO: Implement login API call
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-12">
        <div className="flex flex-col gap-6">
          {/* Email or Username */}
          <div>
            <RHFInput
              name="emailOrUsername"
              placeholder="Email or username"
              isRequired
              inputClassName="w-full px-3.5  py-2 rounded-lg"
            />
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
