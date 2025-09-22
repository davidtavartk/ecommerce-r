import Image from 'next/image';
import { PaginationProps } from '../types/propTypes';

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    if (totalPages <= 4) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [];

    if (currentPage === 1) {
      pages.push(1, 2);
      if (totalPages > 4) {
        pages.push('...');
      }
      if (totalPages > 3) {
        pages.push(totalPages - 1);
      }
      pages.push(totalPages);
    } else if (currentPage === 2) {
      pages.push(1, 2, 3);
      if (totalPages > 5) {
        pages.push('...');
      }
      if (totalPages > 4) {
        pages.push(totalPages - 1);
      }
      pages.push(totalPages);
    } else if (currentPage === 3) {
      pages.push(1, 2, 3, 4);
      if (totalPages > 6) {
        pages.push('...');
      }
      if (totalPages > 5) {
        pages.push(totalPages - 1);
      }
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 1) {
      pages.push(1, 2);
      if (totalPages - 2 > 3) {
        pages.push('...');
      }
      for (let i = Math.max(3, totalPages - 2); i <= totalPages; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }
    } else {
      pages.push(1, 2);
      if (currentPage - 1 > 3) {
        pages.push('...');
      }
      pages.push(currentPage - 1, currentPage, currentPage + 1);
      if (currentPage + 1 < totalPages - 2) {
        pages.push('...');
      }
      if (currentPage + 1 < totalPages - 1) {
        pages.push(totalPages - 1);
      }
      if (currentPage + 1 < totalPages) {
        pages.push(totalPages);
      }
    }

    return pages;
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
            key={`page-${page}-${index}`}
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
