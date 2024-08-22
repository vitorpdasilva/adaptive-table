import React, { useRef, useEffect, useState, useMemo } from "react";
import { TableProvider } from "../context/TableContext";
import { useColumnResize } from "../hooks/useColumnResize";
import { usePagination } from "../hooks/usePagination";
import { useSorting } from "../hooks/useSorting";
import { useRowSelection } from "../hooks/useRowSelection";
import { AdaptiveTableHeader } from "./AdaptiveTableHeader";
import { AdaptiveTableBody } from "./AdaptiveTableBody";
import { AdaptiveTablePagination } from "./AdaptiveTablePagination";
import { AdaptiveTableProps, RowExpansionMode } from "../types";
import { useRowExpansion } from "../hooks/useRowExpansion";

export const AdaptiveTable = <T,>({
  data,
  columns,
  hasCheckbox = false,
  itemsPerPage = 10,
  rowExpansionMode = "multiple",
  onSorting,
  onPagination,
  onRowSelect,
  onResize,
  expandedRow,
}: AdaptiveTableProps<T>) => {
  const tableRef = useRef<HTMLDivElement>(null);
  const [tableWidth, setTableWidth] = useState(0);

  const { expandedRows, toggleRowExpansion, updateRowExpansionMode } =
    useRowExpansion(rowExpansionMode);

  useEffect(() => {
    updateRowExpansionMode(rowExpansionMode);
  }, [rowExpansionMode, updateRowExpansionMode]);

  useEffect(() => {
    const handleResize = () => {
      if (tableRef.current) {
        setTableWidth(tableRef.current.offsetWidth);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
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
    paginatedData,
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
      itemsPerPage,
      handleSort,
      handleColumnResize,
      handlePageChange,
      handleRowSelect,
      handleSelectAll,
      expandedRows,
      expandedRowRender: expandedRow,
      toggleRowExpansion,
      rowExpansionMode,
      updateRowExpansionMode,
    }),
    [
      paginatedData,
      columns,
      columnWidths,
      sorting,
      pagination,
      hasCheckbox,
      itemsPerPage,
      selectedRows,
      data.length,
      handleSort,
      handleColumnResize,
      handlePageChange,
      handleRowSelect,
      handleSelectAll,
      expandedRows,
      expandedRow,
      toggleRowExpansion,
      rowExpansionMode,
      updateRowExpansionMode,
    ]
  );

  if (data.length === 0) {
    return <div className="nice-table-empty-state">No data available</div>;
  }

  return (
    <TableProvider value={contextValue}>
      <div className="adaptive-table-container" ref={tableRef}>
        <div role="table" className="adaptive-table">
          <AdaptiveTableHeader<T> />
          <AdaptiveTableBody<T> />
        </div>
        <AdaptiveTablePagination<T> />
      </div>
    </TableProvider>
  );
};
