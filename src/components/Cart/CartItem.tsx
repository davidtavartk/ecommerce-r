import { type CartItem } from '@/types/types';
import { capitalizeWords } from '@/utils/formatters';
import Image from 'next/image';
import MinusIcon from '../../../public/svgs/components/MinusIcon';
import PlusIcon from '../../../public/svgs/components/PlusIcon';
import { useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { CartItemProps } from '@/types/propTypes';

const CartItem = ({ product, onUpdateQuantity, onRemove }: CartItemProps) => {
  const [localQuantity, setLocalQuantity] = useState(product.quantity);
  const debouncedQuantity = useDebounce(localQuantity, 200); // 200ms delay

  useEffect(() => {
    if (debouncedQuantity !== product.quantity && onUpdateQuantity) {
      onUpdateQuantity(product.id, debouncedQuantity);
    }
  }, [debouncedQuantity, product.id, product.quantity, onUpdateQuantity]);

  useEffect(() => {
    setLocalQuantity(product.quantity);
  }, [product.quantity]);

  const handleDecrease = () => {
    if (localQuantity > 1) {
      setLocalQuantity((prev) => prev - 1);
    }
  };

  const handleIncrease = () => {
    setLocalQuantity((prev) => prev + 1);
  };

  return (
    <div className="flex gap-[17px]">
      <div>
        <Image
          src={product.cover_image}
          alt={product.name}
          width={100}
          height={134}
          className="border-l-gray rounded-[10px] border"
          priority
        />
      </div>
      <div className="flex flex-1 flex-col gap-[13px] py-2">
        {/* Product Details */}
        <div className="flex w-full justify-between">
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">{capitalizeWords(product.name)}</h3>
            <span className="text-l-blue text-xs">{product.color}</span>
            <span className="text-l-blue text-xs">{product.size}</span>
          </div>
          <span className="text-lg font-medium">$ {product.price}</span>
        </div>

        {/* Quantity Controls */}
        <div className="text-l-blue flex items-center justify-between">
          <div className="border-l-gray flex w-[70px] items-center justify-between gap-0.5 rounded-[24px] border px-2 py-1">
            <button className="cursor-pointer" onClick={handleDecrease} disabled={localQuantity <= 1}>
              <MinusIcon isDisabled={localQuantity <= 1} />
            </button>
            <span className="text-xs">{localQuantity}</span>
            <button className="cursor-pointer" onClick={handleIncrease}>
              <PlusIcon />
            </button>
          </div>

          <button className="cursor-pointer text-xs" onClick={() => onRemove?.(product.id)}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
