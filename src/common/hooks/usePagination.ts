import { useState, useEffect, useMemo } from 'react';
import { CompanyId } from '@/common/types';
import { companiesDataInfo } from '@/common/constants';
import { updatePageUrl } from '@/common/utils';
import { UsePaginationResult } from '@/common/interfaces';

interface UsePaginationProps {
  itemsPerPage: number;
}

export const usePagination = ({
  itemsPerPage,
}: UsePaginationProps): UsePaginationResult => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalItems = Object.keys(companiesDataInfo).length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Get current page from URL on load
  useEffect(() => {
    const url = new URL(window.location.href);
    const pageFromUrl = Number(url.searchParams.get('page')) || 1;

    if (pageFromUrl >= 1 && pageFromUrl <= totalPages) {
      setCurrentPage(pageFromUrl);
    } else if (pageFromUrl > totalPages) {
      // If page is greater than total, redirect to last page
      setCurrentPage(totalPages);
      updatePageUrl(totalPages);
    } else {
      // If invalid page, set to first
      setCurrentPage(1);
      updatePageUrl(1);
    }
  }, [totalPages]);

  // Add listener for browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.page) {
        setCurrentPage(event.state.page);
      } else {
        // If no state, check URL
        const url = new URL(window.location.href);
        const pageFromUrl = Number(url.searchParams.get('page')) || 1;
        setCurrentPage(pageFromUrl);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Filtered companies for current page
  const currentItems = useMemo(() => {
    return Object.entries(companiesDataInfo)
      .sort(([_, companyA], [__, companyB]) => {
        const orderA = companyA.mosaicPositioning?.initialOrder || 999;
        const orderB = companyB.mosaicPositioning?.initialOrder || 999;
        return orderA - orderB;
      })
      .map(([id]) => id as CompanyId)
      .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  }, [currentPage, itemsPerPage]);

  // Page change handlers
  const handlePrevPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      updatePageUrl(newPage);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      updatePageUrl(newPage);
    }
  };

  return {
    currentPage,
    totalPages,
    currentItems,
    handlePrevPage,
    handleNextPage,
  };
};
