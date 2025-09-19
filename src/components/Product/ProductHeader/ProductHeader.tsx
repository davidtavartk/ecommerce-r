import Filtration from '@/components/Filtration/Filtration';
import { ProductHeaderProps } from '@/types/propTypes';

const ProductHeader = ({ from, to, total }: ProductHeaderProps) => {
  return (
    <header>
      <div className="flex items-center justify-between">
        <h1 className="text-[42px] font-semibold">Product Name</h1>

        <div>
          <Filtration from={from} to={to} total={total} />
        </div>
      </div>
    </header>
  );
};

export default ProductHeader;
