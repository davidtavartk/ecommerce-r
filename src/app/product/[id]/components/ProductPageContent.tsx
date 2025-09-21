import Button from '@/components/common/Button/Button';
import { colors } from '@/constants/consts';
import { Product } from '@/types/types';
import { capitalizeWords } from '@/utils/formatters';
import Image from 'next/image';

interface ProductPageContentProps {
  product: Product;
}

export default function ProductPageContent({ product }: ProductPageContentProps) {
  return (
    <div className="flex gap-[168px]">
      {/* Left Content */}
      <div className="flex flex-1 gap-6">
        {/* Thumbnail Column */}
        <div className="flex flex-col gap-[9px]">
          {product.images.map((image, index) => (
            <Image key={index} src={image} alt={`Product Image ${index + 1}`} width={121} height={121} className="object-cover" />
          ))}
        </div>
        {/* Main Image */}
        <div className="h-full w-full flex-1 rounded-[10px]">
          <Image
            src={product.cover_image}
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

              <span className="flex items-center gap-[13px]">
                {product.available_colors.map((color) => {
                  const colorHex = colors[color as keyof typeof colors];
                  const isWhiteColor = color === 'White' || color === 'Off White' || color === 'Cream';

                  return (
                    <span
                      key={color}
                      className={`size-[38px] cursor-pointer rounded-full border-2 ${
                        isWhiteColor ? 'border-gray-300' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: colorHex }}
                    />
                  );
                })}
              </span>
            </div>
            {/* Size */}
            <div className="flex flex-col gap-4">
              <span>Size: L</span>
              <div className="flex gap-2">
                {product.available_sizes.map((size) => (
                  <span key={size} className="border-l-gray rounded-[10px] border px-4 py-[9px]">
                    {size}
                  </span>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex flex-col gap-4">
              <span>Quantity</span>
            </div>
          </div>
          {/* Button */}
          <Button className="py-4">
            <Image src="/svgs/cart-icon-w.svg" alt="Cart Icon" width={24} height={24} />
            <span className="text-lg font-medium">Add to Cart</span>
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
