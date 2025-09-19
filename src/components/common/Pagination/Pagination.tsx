import Image from 'next/image';
import { PaginationProps } from '../types/propTypes';

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots.filter((item, index, arr) => arr.indexOf(item) === index);
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Image src="/svgs/arrow-left.svg" alt="Previous" width={20} height={20} />
      </button>

      {getVisiblePages().map((page, index) =>
        page === '...' ? (
          <span key={`dots-${index}`} className="px-2 text-sm text-[#212B36]/60">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={`size-8 cursor-pointer rounded-sm border text-sm ${
              page === currentPage
                ? 'text-c-orange border-c-orange font-bold'
                : 'border-[#F8F6F7] font-medium text-[#212B36]/60 hover:border-[#e2dfe1]'
            }`}
          >
            {page}
          </button>
        ),
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Image src="/svgs/arrow-left.svg" alt="Next" width={20} height={20} className="rotate-180" />
      </button>
    </div>
  );
};

export default Pagination;
