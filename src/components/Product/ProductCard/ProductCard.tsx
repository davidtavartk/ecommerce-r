import { ProductCardProps } from '@/types/propTypes';
import { capitalizeWords } from '@/utils/formatters';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/products/${product.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="transition-duration-500 flex cursor-pointer flex-col gap-3 rounded-[10px] transition-all hover:scale-105"
    >
      <Image src={product.cover_image} alt={product.name} width={412} height={549} className="object-cover" priority />
      <div className="flex flex-col gap-0.5 font-medium">
        <h2 className="text-lg">{capitalizeWords(product.name)}</h2>
        <span>$ {product.price}</span>
      </div>
    </div>
  );
};

export default ProductCard;
