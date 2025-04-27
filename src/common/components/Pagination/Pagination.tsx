import { FC } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PaginationProps } from '@/common/interfaces';

export const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  handlePrevPage,
  handleNextPage,
}) => {
  return (
    <div className='flex items-center justify-center gap-2 my-2'>
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className={`p-1 rounded ${
          currentPage === 1
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        <ChevronLeft size={20} />
      </button>

      <span className='text-gray-700'>
        Сторінка {currentPage} з {totalPages}
      </span>

      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className={`p-1 rounded ${
          currentPage === totalPages
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};
