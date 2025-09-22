'use client';

import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';
import Button from '../common/Button/Button';
import CartItem from './CartItem';
import LoadingSpinner from '../common/Loading/LoadingSpinner/LoadingSpinner';
import { twMerge } from 'tailwind-merge';

interface CartContentProps {
  onCheckoutClick: () => void;
  checkoutButtonText?: string;
  summaryContainerClasses?: string;
  itemContainerClasses?: string;
}

const CartContent = ({
  onCheckoutClick,
  checkoutButtonText = 'Go to Checkout',
  summaryContainerClasses,
  itemContainerClasses = 'h-[560px]',
}: CartContentProps) => {
  const { items, loading, totalPrice, updateCartItem, removeFromCart } = useCartStore();

  if (loading) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <LoadingSpinner size="lg" />
        <p className="text-l-blue text-sm">Loading your cart...</p>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="mt-[150px] flex flex-col items-center justify-between gap-6">
        <Image src="/svgs/orange-cart.svg" alt="Orange Cart" width={170} height={135} />
        <div className="flex flex-col items-center gap-2.5">
          <h2 className="text-2xl font-semibold">Ooops!</h2>
          <p className="text-sm">You&apos;ve got nothing in your cart just yet...</p>
        </div>
        <Button className="mt-[58px] w-[214px] py-2.5" onClick={onCheckoutClick}>
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-6">
      {/* Cart Items List */}
      <div className={twMerge(`flex flex-col gap-9 overflow-scroll ${itemContainerClasses}`)}>
        {items.map((item) => (
          <CartItem key={item.id} product={item} onUpdateQuantity={updateCartItem} onRemove={removeFromCart} />
        ))}
      </div>

      <div className={twMerge(`mt-auto flex flex-col gap-6 ${summaryContainerClasses}`)}>
        {/* Cart Summary and Checkout */}
        <div className="flex flex-col gap-4">
          <span className="text-l-blue flex items-center justify-between">
            <span>Items subtotal</span>
            <span>$ 50</span>
          </span>
          <span className="text-l-blue flex items-center justify-between">
            <span>Delivery</span>
            <span>$ 5</span>
          </span>
          <span className="flex items-center justify-between text-xl font-medium">
            <span>Total</span>
            <span>$ {totalPrice}</span>
          </span>
        </div>

        {/* Go to checkout */}
        <Button onClick={onCheckoutClick} className="py-4">
          {checkoutButtonText}
        </Button>
      </div>
    </div>
  );
};

export default CartContent;
