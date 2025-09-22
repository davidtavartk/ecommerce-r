'use client';

import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';
import CartContent from './CartContent';
import { useRouter } from 'next/navigation';

const CartSidebar = () => {
  const router = useRouter();
  const { totalQuantity, isOpen, toggleCart } = useCartStore();

  const handleCheckoutClick = () => {
    toggleCart();
    router.push('/checkout');
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="bg-opacity-30 fixed inset-0 z-40 bg-gray-900/30" onClick={toggleCart} />

      <div className="border-l-gray fixed top-0 right-0 z-50 flex h-full w-[540px] flex-col border bg-white p-10">
        <div className="mb-16 flex items-center justify-between">
          <span>Shopping Cart ({totalQuantity ? totalQuantity : 0})</span>
          <button onClick={toggleCart} className="cursor-pointer">
            <Image src="/svgs/x-icon.svg" alt="Close cart" width={32} height={32} />
          </button>
        </div>

        <div className="flex-1">
          <CartContent onCheckoutClick={handleCheckoutClick} summaryContainerClasses="gap-[102px]" />
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
