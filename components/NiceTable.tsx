import React, { useState } from "react";

import type { NiceTableProps } from "../types";
import { useColumnResize } from "../hooks/useColumnResize";
import { usePagination } from "../hooks/usePagination";
import { useRowSelection } from "../hooks/useRowSelection";
import { useSorting } from "../hooks/useSorting";
import { NiceTableBody } from "./NiceTableBody";
import { NiceTableHeader } from "./NiceTableHeader";
import { NiceTablePagination } from "./NiceTablePagination";

import "./NiceTable.css";

export const NiceTable = <T extends Record<string, React.ReactNode>>({
  data,
  columns,
  hasCheckbox = false,
  itemsPerPage = 10,
  expandedRow,
  onSorting,
  onPagination,
  onRowSelect,
}: NiceTableProps<T>) => {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const { columnWidths, handleColumnResize } = useColumnResize<T>(columns);
  const { pagination, paginatedData, handlePageChange } = usePagination<T>(
    data,
    itemsPerPage,
    onPagination
  );
  const { selectedRows, handleCheckboxChange } =
    useRowSelection<T>(onRowSelect);
  const { sorting, handleSort } = useSorting<T>(onSorting);

  const handleRowClick = (index: number) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <div className="nice-table-container">
      <div className="nice-table">
        <NiceTableHeader<T>
          columns={columns}
          hasCheckbox={hasCheckbox}
          columnWidths={columnWidths}
          sorting={sorting}
          onSort={handleSort}
          onColumnResize={handleColumnResize}
        />
        <NiceTableBody<T>
          data={paginatedData}
          columns={columns}
          hasCheckbox={hasCheckbox}
          columnWidths={columnWidths}
          selectedRows={selectedRows}
          expandedRows={expandedRows}
          expandedRowRender={expandedRow}
          onRowClick={handleRowClick}
          onCheckboxChange={handleCheckboxChange}
        />
      </div>
      <NiceTablePagination
        pagination={pagination}
        totalItems={data.length}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
