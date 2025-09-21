'use client';

import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';
import Button from '../common/Button/Button';
import Link from 'next/link';

const CartSidebar = () => {
  const { items, totalQuantity, totalPrice, isOpen, loading, toggleCart, removeFromCart, updateCartItem } = useCartStore();

  //   const handleUpdateQuantity = async (itemId: number, newQuantity: number) => {
  //     if (newQuantity <= 0) {
  //       await removeFromCart(itemId);
  //     } else {
  //       await updateCartItem(itemId, newQuantity);
  //     }
  //   };

  //   const handleRemoveItem = async (itemId: number) => {
  //     await removeFromCart(itemId);
  //   };

  //   const handleCheckout = () => {
  //     toggleCart();
  //     router.push('/checkout');
  //   };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop with blur effect */}
      <div className="bg-opacity-30 fixed inset-0 z-40 bg-gray-900/30" onClick={toggleCart} />

      {/* Sidebar */}
      <div className="border-l-gray fixed top-0 right-0 z-50 flex h-full w-[540px] flex-col border bg-white p-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <span>Shopping Cart ({totalQuantity ? totalQuantity : 0})</span>
          <button onClick={toggleCart} className="cursor-pointer">
            <Image src="/svgs/x-icon.svg" alt="Close cart" width={32} height={32} />
          </button>
        </div>

        {!items || items.length === 0 ? (
          // Cart Content When Empty
          <div className="mt-[150px] flex flex-col items-center justify-between gap-6">
            <Image src="/svgs/orange-cart.svg" alt="Orange Cart" width={170} height={135} />
            <div className="flex flex-col items-center gap-2.5">
              <h2 className="text-2xl font-semibold">Ooops!</h2>
              <p className="text-sm">You’ve got nothing in your cart just yet...</p>
            </div>
            <Button className="mt-[58px] w-[214px] py-2.5" onClick={toggleCart}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div>Non Empty Cart Content</div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
