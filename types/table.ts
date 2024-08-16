import { ReactNode } from "react";
import { Column } from "./column";
import { PaginationState } from "./paginationState";
import { SortingState } from "./sortingState";

export interface NiceTableProps<T extends Record<string, ReactNode>> {
  data: T[];
  columns: Column<T>[];
  hasCheckbox?: boolean;
  itemsPerPage?: number;
  expandedRow?: (rowData: T) => ReactNode;
  onSorting?: (sortingData: SortingState<T>) => void;
  onPagination?: (paginationData: PaginationState) => void;
  onRowSelect?: (selectedRows: T[]) => void;
}
