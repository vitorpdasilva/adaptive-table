import React from "react";
import { PaginationState } from "../types";

interface NiceTablePaginationProps {
  pagination: PaginationState;
  totalItems: number;
  onPageChange: (newPage: number) => void;
}

export const NiceTablePagination: React.FC<NiceTablePaginationProps> = ({
  pagination,
  totalItems,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / pagination.itemsPerPage);

  return (
    <div className="nice-table-pagination">
      <button
        onClick={() => onPageChange(pagination.currentPage - 1)}
        disabled={pagination.currentPage === 1}
      >
        Previous
      </button>
      <span>
        Page {pagination.currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(pagination.currentPage + 1)}
        disabled={pagination.currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};
