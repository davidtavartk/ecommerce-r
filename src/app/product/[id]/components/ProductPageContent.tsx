'use client';

import Button from '@/components/common/Button/Button';
import { colors, isWhiteColor } from '@/constants/consts';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';
import { Product } from '@/types/types';
import { capitalizeWords } from '@/utils/formatters';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button as AriaButton, Popover, DialogTrigger } from 'react-aria-components';
import { toast } from 'react-toastify';

interface ProductPageContentProps {
  product: Product;
}

export default function ProductPageContent({ product }: ProductPageContentProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<string>(product.available_colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState<string>(product.available_sizes?.[0] || '');
  const [quantity, setQuantity] = useState<number>(1);
  const [isQuantityOpen, setIsQuantityOpen] = useState(false);

  const { addToCart, loading: cartLoading } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      router.push('/signup');
      return;
    }

    if (!product.available_colors?.length || !product.available_sizes?.length) {
      toast.error('This product does not have available colors or sizes.');
      return;
    }

    if (!selectedColor || !selectedSize) {
      toast.error('Please select both color and size before adding to cart');
      return;
    }

    try {
      await addToCart(product.id, quantity, selectedColor, selectedSize);
      toast.success('Product added to cart successfully!');
    } catch (error: any) {
      const errorMessage = error?.data?.message || error?.message || 'Failed to add to cart. Please try again.';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex gap-[168px]">
      {/* Left Content */}
      <div className="flex flex-1 gap-6">
        {/* Thumbnail Column */}
        <div className="flex flex-col gap-[9px]">
          {product.images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`Product Image ${index + 1}`}
              width={121}
              height={121}
              className="cursor-pointer object-cover"
              onClick={() => {
                setSelectedImageIndex(index);
                if (product.available_colors?.[index]) {
                  setSelectedColor(product.available_colors[index]);
                }
              }}
              style={{ width: 'auto', height: 'auto' }}
            />
          ))}
        </div>
        {/* Main Image */}
        <div className="h-full w-full flex-1 rounded-[10px]">
          <Image
            src={product.images[selectedImageIndex] || product.cover_image}
            alt={product.name}
            width={412}
            height={549}
            className="size-full object-cover"
            priority
          />
        </div>
      </div>

      {/* Right Content */}
      <div className="border-b-gray flex-1">
        <div className="border-l-gray flex flex-col gap-14 border-b pb-14">
          {/* Product Title */}
          <div className="flex flex-col gap-[21px] text-[32px] font-semibold">
            <h2>{capitalizeWords(product.name)}</h2>
            <span>$ {product.price}</span>
          </div>

          {/* Product Filters */}
          <div className="flex flex-col gap-12">
            {/* Colors */}
            <div className="flex flex-col gap-4">
              <span>Colors:</span>

              {!product.available_colors?.length ? (
                <span className="font-medium text-red-600">Colors not available</span>
              ) : (
                <span className="flex items-center gap-[13px]">
                  {product.available_colors.map((color) => {
                    const colorHex = colors[color as keyof typeof colors];
                    const isSelected = selectedColor === color;

                    return (
                      <span
                        key={color}
                        onClick={() => {
                          setSelectedColor(color);
                          const colorIndex = product.available_colors.indexOf(color);
                          if (colorIndex !== -1 && colorIndex < product.images.length) {
                            setSelectedImageIndex(colorIndex);
                          }
                        }}
                        className={`size-[38px] cursor-pointer rounded-full transition-all ${
                          isSelected ? 'ring-l-gray ring-2 ring-offset-2' : ''
                        } ${isWhiteColor(color) ? 'border-2 border-gray-300' : 'border-transparent'}`}
                        style={{ backgroundColor: colorHex }}
                      />
                    );
                  })}
                </span>
              )}
            </div>
            {/* Size */}
            <div className="flex flex-col gap-4">
              <span>Size: {selectedSize || 'Not selected'}</span>
              {!product.available_sizes?.length ? (
                <span className="font-medium text-red-600">Sizes not available</span>
              ) : (
                <div className="flex gap-2">
                  {product.available_sizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <span
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`flex w-[70px] cursor-pointer items-center justify-center rounded-[10px] border px-4 py-[9px] ${isSelected ? 'border-red bg-[#F8F6F7]' : 'border-l-gray'}`}
                      >
                        {size}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Quantity */}
            <div className="flex flex-col gap-4">
              <span>Quantity</span>
              <DialogTrigger>
                <AriaButton
                  className="border-l-gray flex w-[70px] cursor-pointer items-center justify-between rounded-[10px] border px-4 py-[9px]"
                  onPress={() => setIsQuantityOpen(!isQuantityOpen)}
                >
                  <span>{quantity}</span>
                  <Image src="/svgs/arrow-left.svg" alt="Arrow Down" width={20} height={20} className="rotate-270" />
                </AriaButton>

                <Popover
                  isOpen={isQuantityOpen}
                  onOpenChange={setIsQuantityOpen}
                  className="border-l-gray w-[70px] rounded-lg border bg-white p-2 shadow-lg"
                  placement="bottom"
                >
                  <div className="flex flex-col gap-1">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        onClick={() => {
                          setQuantity(num);
                          setIsQuantityOpen(false);
                        }}
                        className={`cursor-pointer rounded px-3 py-1 hover:bg-orange-600 hover:text-white ${
                          quantity === num ? 'bg-c-orange text-white' : ''
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </Popover>
              </DialogTrigger>
            </div>
          </div>
          {/* Button */}
          <Button className={`py-4 ${cartLoading ? 'opacity-75' : ''}`} onClick={handleAddToCart} disabled={cartLoading}>
            {cartLoading ? (
              <>
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                <span className="text-lg font-medium">Adding...</span>
              </>
            ) : (
              <>
                <Image src="/svgs/cart-icon-w.svg" alt="Cart Icon" width={24} height={24} className="h-6 w-6 flex-shrink-0" />
                <span className="text-lg font-medium">Add to Cart</span>
              </>
            )}
          </Button>
        </div>

        <div className="flex flex-col gap-[7px] pt-14">
          <div className="flex items-center justify-between">
            <span className="text-xl font-medium">Details</span>
            <span>
              {
                <Image
                  src={product.brand.image}
                  alt={product.brand.name}
                  width={109}
                  height={61}
                  className="max-h-[61px] max-w-[109px] object-contain"
                />
              }
            </span>
          </div>
          <div className="flex flex-col gap-[19px]">
            <span>Brand: {product.brand.name}</span>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
{
}
