import { FiltrationProps } from '@/types/propTypes';
import FilterDropdown from './FilterDropdown';
import SortDropdown from './SortDropdown';

const Filtration = ({
  from,
  to,
  total,
  currentSort,
  onApplyFilter,
  onSortChange,
  currentPriceFrom,
  currentPriceTo,
}: FiltrationProps) => {
  const handleFilterApply = (priceFrom: string, priceTo: string) => {
    if (onApplyFilter) {
      onApplyFilter(priceFrom, priceTo);
    }
  };

  const handleSortChange = (sortType: string) => {
    if (onSortChange) {
      onSortChange(sortType);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="relative pr-8">
        Showing {from || 0}-{to || 0} of {total || 0} {total === 1 ? 'product' : 'products'}
        <div className="absolute top-1/2 right-0 h-[14px] w-px -translate-y-1/2 bg-[#E1DFE1]"></div>
      </div>

      <div className="flex gap-8 pl-8">
        <FilterDropdown onApplyFilter={handleFilterApply} currentPriceFrom={currentPriceFrom} currentPriceTo={currentPriceTo} />
        <SortDropdown onSortChange={handleSortChange} currentSort={currentSort} />
      </div>
    </div>
  );
};

export default Filtration;
