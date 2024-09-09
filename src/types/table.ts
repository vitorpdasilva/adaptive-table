import { ReactNode } from "react";
import { Column } from "./column";
import { PaginationState } from "./paginationState";
import { SortingState } from "./sortingState";

export interface AdaptiveTableProps<T> {
  data: T[];
  columns: Column<T>[];
  hasCheckbox?: boolean;
  pageSizeOptions?: number[];
  pageSize?: number;
  expandedRow?: (rowData: T) => ReactNode;
  onSorting?: (sortingData: SortingState<T>) => void;
  onPagination?: (paginationData: PaginationState) => void;
  onRowSelect?: (selectedRows: T[]) => void;
  onResize?: (columnWidths: number[]) => void;
}
