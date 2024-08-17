import React, { useRef, useEffect, useState, useMemo } from "react";
import { TableProvider } from "../context/TableContext";
import { useColumnResize } from "../hooks/useColumnResize";
import { usePagination } from "../hooks/usePagination";
import { useSorting } from "../hooks/useSorting";
import { useRowSelection } from "../hooks/useRowSelection";
import { NiceTableHeader } from "./NiceTableHeader";
import { NiceTableBody } from "./NiceTableBody";
import { NiceTablePagination } from "./NiceTablePagination";
import { NiceTableProps } from "../types";
import { useExpandedRows } from "../hooks/useExpandedRows";

export const NiceTable = <T,>({
  data,
  columns,
  hasCheckbox = false,
  itemsPerPage = 10,
  onSorting,
  onPagination,
  onRowSelect,
  onResize,
  expandedRow,
}: NiceTableProps<T>) => {
  const tableRef = useRef<HTMLDivElement>(null);
  const [tableWidth, setTableWidth] = useState(0);
  const { expandedRows, handleRowExpand } = useExpandedRows();

  useEffect(() => {
    if (tableRef.current) {
      setTableWidth(tableRef.current.offsetWidth);
    }
  }, []);

  const { columnWidths, handleColumnResize } = useColumnResize(
    columns,
    tableWidth,
    hasCheckbox,
    onResize
  );
  const { sorting, handleSort } = useSorting<T>(onSorting);
  const { pagination, paginatedData, handlePageChange } = usePagination<T>(
    data,
    itemsPerPage,
    onPagination
  );
  const { selectedRows, handleRowSelect, handleSelectAll } = useRowSelection<T>(
    data,
    onRowSelect
  );

  const contextValue = useMemo(
    () => ({
      data: paginatedData,
      columns,
      columnWidths,
      sorting,
      pagination,
      hasCheckbox,
      selectedRows,
      totalItems: data.length,
      handleSort,
      handleColumnResize,
      handlePageChange,
      handleRowSelect,
      handleSelectAll,
      expandedRows,
      expandedRowRender: expandedRow,
      handleRowExpand,
    }),
    [
      paginatedData,
      columns,
      columnWidths,
      sorting,
      pagination,
      hasCheckbox,
      selectedRows,
      data.length,
      handleSort,
      handleColumnResize,
      handlePageChange,
      handleRowSelect,
      handleSelectAll,
      expandedRows,
      expandedRow,
      handleRowExpand,
    ]
  );

  return (
    <TableProvider value={contextValue}>
      <div className="nice-table-container" ref={tableRef}>
        <div className="nice-table">
          <NiceTableHeader<T> />
          <NiceTableBody<T> />
        </div>
        <NiceTablePagination<T> />
      </div>
    </TableProvider>
  );
};
