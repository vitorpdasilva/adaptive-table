import React from "react";
import { useTableContext } from "../context/TableContext";

export const NiceTableHeader = <T,>() => {
  const {
    columns,
    columnWidths,
    sorting,
    hasCheckbox,
    handleSort,
    handleColumnResize,
    handleSelectAll,
    data,
    selectedRows,
  } = useTableContext<T>();

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
            checked={selectedRows.length === data.length}
            onChange={(e) => handleSelectAll(e.target.checked)}
          />
        </div>
      )}
      {columns.map((column, index) => {
        const columnIndex = hasCheckbox ? index + 1 : index;
        return (
          <div
            key={column.key as string}
            className="adaptive-table-cell"
            style={{
              width: `${columnWidths[columnIndex]}px`,
              flexBasis: `${columnWidths[columnIndex]}px`,
              flexGrow: 0,
              flexShrink: 0,
            }}
            onClick={() => handleSort(column)}
          >
            {column.title}
            {column.sortable && (
              <span className="sort-icon">
                {sorting.column === column.key
                  ? sorting.direction === "asc"
                    ? "▲"
                    : "▼"
                  : "▲▼"}
              </span>
            )}
            {index < columns.length - 1 && (
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
