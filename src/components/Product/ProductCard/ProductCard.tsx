import { ProductCardProps } from '@/types/propTypes';
import { capitalizeWords } from '@/utils/formatters';
import Image from 'next/image';

const ProductCard = ({ product }: ProductCardProps) => {
  console.log('Rendering product:', product);
  return (
    <div className="flex flex-col gap-3 rounded-[10px]">
      <Image src={product.cover_image} alt={product.name} width={412} height={549} className="object-cover" />
      <div className="flex flex-col gap-0.5 font-medium">
        <h2 className="text-lg">{capitalizeWords(product.name)}</h2>
        <span>$ {product.price}</span>
      </div>
    </div>
  );
};

export default ProductCard;
