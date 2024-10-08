import React, { createContext, useContext, ReactNode } from "react";
import { Column, SortingState, PaginationState } from "../types";

interface TableContextType<T> {
  data: T[];
  columns: Column<T>[];
  columnWidths: number[];
  sorting: SortingState<T>;
  pagination: PaginationState;
  hasCheckbox: boolean;
  totalItems: number;
  pageSize: number;
  pageSizeOptions: number[];
  handleSelectAll: (checked: boolean) => void;
  selectedRows: T[];
  handleSort: (column: Column<T>) => void;
  handleColumnResize: (index: number, newWidth: number) => void;
  handlePageChange: (newPage: number) => void;
  handlePageSizeChange: (newPageSize: number) => void;
  handleRowSelect: (row: T) => void;
  expandedRows: Set<number>;
  expandedRowRender?: (row: T) => React.ReactNode;
  handleRowExpand: (rowIndex: number) => void;
}

const TableContext = createContext<TableContextType<any> | undefined>(
  undefined
);

export const useTableContext = <T,>() => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTableContext must be used within a TableProvider");
  }
  return context as TableContextType<T>;
};

interface TableProviderProps<T> {
  children: ReactNode;
  value: TableContextType<T>;
}

export const TableProvider = <T,>({
  children,
  value,
}: TableProviderProps<T>) => (
  <TableContext.Provider value={value}>{children}</TableContext.Provider>
);
