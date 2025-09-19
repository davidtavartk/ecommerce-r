import { FiltrationProps } from '@/types/propTypes';
import Image from 'next/image';
import FilterDropdown from './FilterDropdown';

const Filtration = ({ from, to, total, onApplyFilter }: FiltrationProps) => {
  const handleFilterApply = (priceFrom: string, priceTo: string) => {
    if (onApplyFilter) {
      onApplyFilter(priceFrom, priceTo);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="relative pr-8">
        Showing {from}-{to} of {total} results
        <div className="absolute top-1/2 right-0 h-[14px] w-px -translate-y-1/2 bg-[#E1DFE1]"></div>
      </div>

      <div className="flex gap-8 pl-8">
        <FilterDropdown onApplyFilter={handleFilterApply} />
        <div className="flex cursor-pointer items-center gap-1">
          <span>Sort By</span>
          <Image src="/svgs/arrow-left.svg" alt="dropdown arrow" width={20} height={20} className="rotate-270" />
        </div>
      </div>
    </div>
  );
};

export default Filtration;
