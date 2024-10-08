import React from "react";
import { useTableContext } from "../context/TableContext";

export const AdaptiveTablePagination = <T,>() => {
  const {
    pagination,
    totalItems,
    handlePageChange,
    handlePageSizeChange,
    pageSizeOptions,
  } = useTableContext<T>();
  const { currentPage, itemsPerPage } = pagination;

  return (
    <div className="adaptive-table-pagination">
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
      <select
        value={itemsPerPage}
        onChange={(e) => handlePageSizeChange(Number(e.target.value))}
      >
        {pageSizeOptions.map((size) => (
          <option key={size} value={size}>
            {size} per page
          </option>
        ))}
      </select>
    </div>
  );
};
