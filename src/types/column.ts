import { ReactNode } from "react";
export interface Column<T> {
  key: keyof T;
  title: string;
  minWidth: number;
  sortable?: boolean;
  isResizable?: boolean;
  sortKey?: string;
  render?: (value: T[keyof T], row: T) => ReactNode;
}
