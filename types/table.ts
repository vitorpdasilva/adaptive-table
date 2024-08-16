import { Column } from "./column";
import { PaginationState } from "./paginationState";
import { SortingState } from "./sortingState";

export interface NiceTableProps<T extends Record<string, React.ReactNode>> {
  data: T[];
  columns: Column<T>[];
  hasCheckbox?: boolean;
  itemsPerPage?: number;
  expandableComponent?: React.ComponentType<{ row: T }>;
  onSorting?: (sortingData: SortingState<T>) => void;
  onPagination?: (paginationData: PaginationState) => void;
  onRowSelect?: (selectedRows: T[]) => void;
}
