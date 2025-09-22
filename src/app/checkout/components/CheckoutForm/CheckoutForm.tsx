'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { RHFInput } from '@/components/common/Input/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkoutSchema, type CheckoutFormData } from '@/app/checkout/schema';
import { useAuthStore } from '@/store/authStore';
import { useEffect } from 'react';
import Image from 'next/image';

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => void;
}

const CheckoutForm = ({ onSubmit }: CheckoutFormProps) => {
  const { user } = useAuthStore();

  const methods = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      address: '',
      zipCode: '',
    },
  });

  useEffect(() => {
    if (user?.email) {
      methods.setValue('email', user.email);
    }
  }, [user?.email, methods]);

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-2/3 flex-col gap-[33px]">
        {/* Name and Surname row */}
        <div className="flex gap-6">
          <div className="flex-1">
            <RHFInput name="name" placeholder="Name" isRequired inputClassName="w-full px-3.5 py-2.5 rounded-lg bg-white" />
          </div>
          <div className="flex-1">
            <RHFInput name="surname" placeholder="Surname" isRequired inputClassName="w-full px-3.5 py-2.5 rounded-lg bg-white" />
          </div>
        </div>

        {/* Email */}
        <div className="relative">
          <RHFInput name="email" placeholder="" isRequired inputClassName="w-full  py-2.5 pl-12 rounded-lg bg-white" />
          <div className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2">
            <Image src="/svgs/email-icon.svg" alt="Email Icon" width={20} height={20} />
          </div>
          {/* Custom placeholder when field is empty */}
          <div className="text-l-blue pointer-events-none absolute top-1/2 left-12 -translate-y-1/2 text-sm">
            {!methods.watch('email') && 'Email'}
          </div>
        </div>

        {/* Address and Zip Code row */}
        <div className="flex gap-6">
          <div className="flex-1">
            <RHFInput name="address" placeholder="Address" isRequired inputClassName="w-full px-3.5 py-2.5 rounded-lg bg-white" />
          </div>
          <div className="flex-1">
            <RHFInput
              name="zipCode"
              placeholder="Zip code"
              isRequired
              inputClassName="w-full px-3.5 py-2.5 rounded-lg bg-white"
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default CheckoutForm;
