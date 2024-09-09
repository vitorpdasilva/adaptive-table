import React from "react";
import { useTableContext } from "../context/TableContext";
import { usePagination } from "../hooks/usePagination";

export const AdaptiveTableHeader = <T,>() => {
  const {
    columns,
    columnWidths,
    sorting,
    hasCheckbox,
    handleSort,
    handleColumnResize,
    handleSelectAll,
    data,
    pageSize,
    selectedRows,
  } = useTableContext<T>();

  const { paginatedData } = usePagination<T>(data, pageSize);

  return (
    <div className="adaptive-table-header">
      {hasCheckbox && (
        <div
          className="adaptive-table-cell adaptive-table-checkbox"
          style={{
            width: `${columnWidths[0]}px`,
            flexBasis: `${columnWidths[0]}px`,
          }}
        >
          <input
            type="checkbox"
            checked={selectedRows.length === paginatedData.length}
            onChange={(e) => handleSelectAll(e.target.checked)}
          />
        </div>
      )}
      {columns.map((column, index) => {
        const columnIndex = hasCheckbox ? index + 1 : index;
        return (
          <div
            key={`${column.key as string}-${index}`}
            className="adaptive-table-cell"
            style={{
              width: `${columnWidths[columnIndex]}px`,
              flexBasis: `${columnWidths[columnIndex]}px`,
              flexGrow: 0,
              flexShrink: 0,
            }}
            onClick={() => column.isSortable && handleSort(column)}
          >
            {column.title}
            {column.isSortable && (
              <span className="sort-indicator">
                {sorting.column === column.key
                  ? sorting.direction === "asc"
                    ? "▲"
                    : "▼"
                  : "▲▼"}{" "}
                {/* Show both arrows if column is not currently sorted */}
              </span>
            )}
            {index < columns.length - 1 && !!column.isResizable && (
              <div
                className="column-resizer"
                onMouseDown={(e) => {
                  e.preventDefault();
                  const startX = e.pageX;
                  const startWidth = columnWidths[columnIndex];

                  const handleMouseMove = (e: MouseEvent) => {
                    const diff = e.pageX - startX;
                    handleColumnResize(columnIndex, startWidth + diff);
                  };

                  const handleMouseUp = () => {
                    document.removeEventListener("mousemove", handleMouseMove);
                    document.removeEventListener("mouseup", handleMouseUp);
                  };

                  document.addEventListener("mousemove", handleMouseMove);
                  document.addEventListener("mouseup", handleMouseUp);
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
