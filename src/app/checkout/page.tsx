'use client';

import CartContent from '@/components/Cart/CartContent';
import { useRouter } from 'next/navigation';
import CheckoutForm from './components/CheckoutForm/CheckoutForm';
import { useState } from 'react';
import SuccessModal from '@/components/common/Modal/SuccessModal';
import { useCartStore } from '@/store/cartStore';
import { CheckoutFormData } from './schema';

export default function CheckoutPage() {
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { checkout } = useCartStore();

  const handleFormSubmit = async (data: CheckoutFormData, methods: any) => {
    try {
      await checkout(data);
      setShowSuccessModal(true);
    } catch (error: any) {

      // Handle backend validation errors same as login form
      if (error.data?.errors) {
        Object.keys(error.data.errors).forEach((field) => {
          // Map backend field names to form field names
          const formField = field === 'zip_code' ? 'zipCode' : field;

          methods.setError(formField as keyof CheckoutFormData, {
            message: error.data.errors[field][0],
          });
        });
      } else {
        // Fallback for non-field specific errors
        const errorMessage = error?.data?.message || error?.message || 'Checkout failed. Please try again.';
        alert(`❌ ${errorMessage}`);
      }
    }
  };

  const handlePay = () => {
    const form = document.querySelector('form');
    if (form) {
      form.requestSubmit();
    }
  };

  const handleContinueShopping = () => {
    setShowSuccessModal(false);
    router.push('/');
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
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
      <SuccessModal isOpen={showSuccessModal} onClose={handleCloseModal} onContinueShopping={handleContinueShopping} />
    </div>
  );
}
