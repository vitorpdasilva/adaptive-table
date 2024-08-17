import React from "react";
import { useTableContext } from "../context/TableContext";

export const NiceTablePagination = <T,>() => {
  const { pagination, totalItems, handlePageChange } = useTableContext<T>();
  const { currentPage, itemsPerPage } = pagination;

  return (
    <div className="nice-table-pagination">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span>Page {currentPage}</span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage * itemsPerPage >= totalItems}
      >
        Next
      </button>
    </div>
  );
};
