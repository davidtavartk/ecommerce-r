'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { Input, RHFInput } from '@/components/common/Input/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkoutSchema, type CheckoutFormData } from '@/app/checkout/schema';

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => void;
}

const CheckoutForm = ({ onSubmit }: CheckoutFormProps) => {
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

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[33px]">
        {/* Name and Surname row */}
        <div className="flex gap-6">
          <div className="flex-1">
            <RHFInput name="name" placeholder="Name" isRequired inputClassName="w-full px-3.5 py-2.5 rounded-lg bg-white" />
          </div>
          <div className="flex-1">
            <Input name="surname" placeholder="Surname" isRequired inputClassName="w-full px-3.5 py-2.5 rounded-lg" />
          </div>
        </div>

        {/* Email */}
        <div>
          <RHFInput name="email" placeholder="Email" isRequired inputClassName="w-full px-3.5 py-2.5 rounded-lg" />
        </div>

        {/* Address and Zip Code row */}
        <div className="flex gap-6">
          <div className="flex-1">
            <RHFInput name="address" placeholder="Address" isRequired inputClassName="w-full px-3.5 py-2.5 rounded-lg" />
          </div>
          <div className="flex-1">
            <RHFInput name="zipCode" placeholder="Zip code" isRequired inputClassName="w-full px-3.5 py-2.5 rounded-lg" />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default CheckoutForm;
