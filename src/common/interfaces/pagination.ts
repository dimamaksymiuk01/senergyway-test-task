import { CompanyId } from '@/common/types';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
}

export interface UsePaginationResult {
  currentPage: number;
  totalPages: number;
  currentItems: CompanyId[];
  handlePrevPage: () => void;
  handleNextPage: () => void;
}
