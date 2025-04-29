import { useState, useEffect, useMemo } from 'react';
import { CompanyId } from '@/common/types';
import { updatePageUrl } from '@/common/utils';
import { UsePaginationResult } from '@/common/interfaces';
import { useCompanies } from '@/common/contexts/CompaniesContext.tsx';

interface UsePaginationProps {
  itemsPerPage: number;
}

export const usePagination = ({
  itemsPerPage,
}: UsePaginationProps): UsePaginationResult => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { companiesData } = useCompanies();

  const totalItems = Object?.keys(companiesData ?? {})?.length ?? 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    const url = new URL(window.location.href);
    const pageFromUrl = Number(url.searchParams.get('page')) || 1;

    if (pageFromUrl >= 1 && pageFromUrl <= totalPages) {
      setCurrentPage(pageFromUrl);
    } else if (pageFromUrl > totalPages) {
      setCurrentPage(totalPages);
      updatePageUrl(totalPages);
    } else {
      setCurrentPage(1);
      updatePageUrl(1);
    }
  }, [totalPages]);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event?.state?.page) {
        setCurrentPage(event.state.page);
      } else {
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

  const currentItems = useMemo(() => {
    return Object?.entries(companiesData ?? {})
      ?.sort(([_, companyA], [__, companyB]) => {
        const orderA = companyA?.mosaicPositioning?.initialOrder ?? 999;
        const orderB = companyB?.mosaicPositioning?.initialOrder ?? 999;
        return orderA - orderB;
      })
      ?.map(([id]) => id as CompanyId)
      ?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  }, [currentPage, itemsPerPage, companiesData]);

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
