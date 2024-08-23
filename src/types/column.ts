import { ReactNode } from "react";
export interface Column<T> {
  key: keyof T;
  title: string;
  minWidth: number;
  isSortable?: boolean;
  isResizable?: boolean;
  sortKey?: keyof T;
  render?: (value: T[keyof T], row: T) => ReactNode;
}
