import React, { useRef, useEffect, useState, useMemo } from "react";
import { TableProvider } from "../context/TableContext";
import { useColumnResize } from "../hooks/useColumnResize";
import { usePagination } from "../hooks/usePagination";
import { useSorting } from "../hooks/useSorting";
import { useRowSelection } from "../hooks/useRowSelection";
import { AdaptiveTableHeader } from "./AdaptiveTableHeader";
import { AdaptiveTableBody } from "./AdaptiveTableBody";
import { AdaptiveTablePagination } from "./AdaptiveTablePagination";
import { AdaptiveTableProps } from "../types";
import { useExpandedRows } from "../hooks/useExpandedRows";

export const AdaptiveTable = <T,>({
  data,
  columns,
  hasCheckbox = false,
  itemsPerPage = 10,
  onSorting,
  onPagination,
  onRowSelect,
  onResize,
  expandedRow,
}: AdaptiveTableProps<T>) => {
  const tableRef = useRef<HTMLDivElement>(null);
  const [tableWidth, setTableWidth] = useState(0);
  const { expandedRows, handleRowExpand } = useExpandedRows();
  const [expandedRowIndex, setExpandedRowIndex] = useState<number | null>(null);

  const processedColumns = useMemo(() => {
    const processed = columns.map((column) => ({
      ...column,
      isResizable: column.isResizable !== false,
      isSortable: column.isSortable !== false,
    }));
    return processed;
  }, [columns]);

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

  const handleRowClick = (index: number) => {
    setExpandedRowIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const contextValue = useMemo(
    () => ({
      data: paginatedData,
      columns: processedColumns,
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
      itemsPerPage,
      expandedRows,
      expandedRowRender: expandedRow,
      handleRowExpand,
      handleRowClick,
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
      handleRowExpand,
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
          <AdaptiveTableBody<T>
            expandedRowIndex={expandedRowIndex}
            onRowClick={handleRowClick}
          />
        </div>
        <AdaptiveTablePagination<T> />
      </div>
    </TableProvider>
  );
};
