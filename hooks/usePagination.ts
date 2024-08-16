import { useState, useMemo } from "react";
import type { PaginationState } from "../types";

export const usePagination = <T>(
  data: T[],
  itemsPerPage: number,
  onPagination?: (paginationData: PaginationState) => void
) => {
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    itemsPerPage,
  });

  const paginatedData = useMemo(() => {
    const start = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const end = start + pagination.itemsPerPage;
    return data.slice(start, end);
  }, [data, pagination.currentPage, pagination.itemsPerPage]);

  const handlePageChange = (newPage: number) => {
    const newPagination = { ...pagination, currentPage: newPage };
    setPagination(newPagination);
    onPagination?.(newPagination);
  };

  return { pagination, paginatedData, handlePageChange };
};
