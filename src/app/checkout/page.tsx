'use client';

import CartContent from '@/components/Cart/CartContent';
// import { useRouter } from 'next/navigation';
import CheckoutForm from './components/CheckoutForm/CheckoutForm';
import { CheckoutFormData } from './schema';

export default function CheckoutPage() {
  // const router = useRouter();

  const handleFormSubmit = (data: CheckoutFormData) => {
    console.log('Checkout form data:', data);
    // Handle form submission here
  };

  const handlePay = () => {
    // This will trigger form submission
    const form = document.querySelector('form');
    if (form) {
      form.requestSubmit();
    }
  };

  return (
    <div className="mx-auto min-h-screen rounded-2xl px-[100px] py-[72px]">
      <h1 className="mb-[42px] text-[42px] font-semibold">Checkout</h1>

      <div className="flex min-h-[635px] gap-[131px]">
        {/* Left side - Order details form */}
        <div className="flex-2/3 bg-[#F8F6F7] px-12 py-[72px]">
          <h2 className="text-l-blue mb-[46px] text-[22px] font-medium">Order details</h2>
          <CheckoutForm onSubmit={handleFormSubmit} />
        </div>

        {/* Right side - Cart content */}
        <div className="flex-1/3">
          <CartContent
            onCheckoutClick={handlePay}
            checkoutButtonText="Pay"
            summaryContainerClasses="gap-[81px]"
            itemContainerClasses="h-[350px]"
          />
        </div>
      </div>
    </div>
  );
}
