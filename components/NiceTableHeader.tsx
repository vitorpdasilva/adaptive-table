import React from "react";
import type { Column, SortingState } from "../types";

interface NiceTableHeaderProps<T> {
  columns: Column<T>[];
  hasCheckbox: boolean;
  columnWidths: Record<string, number>;
  sorting: SortingState<T>;
  onSort: (column: Column<T>) => void;
  onColumnResize: (columnKey: keyof T | "", newWidth: number) => void;
}

export const NiceTableHeader = <T,>({
  columns,
  hasCheckbox,
  columnWidths,
  sorting,
  onSort,
  onColumnResize,
}: NiceTableHeaderProps<T>) => {
  return (
    <div className="nice-table-header">
      <div className="nice-table-row">
        {hasCheckbox && (
          <div className="nice-table-cell" style={{ width: "40px" }}></div>
        )}
        {columns.map((column) => (
          <div
            key={column.key as string}
            className="nice-table-cell"
            onClick={() => onSort(column)}
            style={{
              width: `${columnWidths[column.key as string]}px`,
              position: "relative",
            }}
          >
            {column.title}
            {column.sortable !== false && (
              <span className="sort-icon">
                {sorting.column === (column.sortKey || column.key)
                  ? sorting.direction === "asc"
                    ? "▲"
                    : "▼"
                  : "▲▼"}
              </span>
            )}
            {column.isResizable !== false && (
              <div
                className="column-resizer"
                onMouseDown={(e) => {
                  const startX = e.clientX;
                  const startWidth = columnWidths[column.key as string];

                  const handleMouseMove = (e: MouseEvent) => {
                    const newWidth = startWidth + e.clientX - startX;
                    onColumnResize(column.key, newWidth);
                  };

                  const handleMouseUp = () => {
                    document.removeEventListener("mousemove", handleMouseMove);
                    document.removeEventListener("mouseup", handleMouseUp);
                  };

                  document.addEventListener("mousemove", handleMouseMove);
                  document.addEventListener("mouseup", handleMouseUp);
                }}
              ></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
