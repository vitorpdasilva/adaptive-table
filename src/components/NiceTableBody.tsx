import React from "react";
import { useTableContext } from "../context/TableContext";

export const NiceTableBody = <T,>() => {
  const {
    data,
    columns,
    columnWidths,
    hasCheckbox,
    selectedRows,
    handleRowSelect,
  } = useTableContext<T>();

  return (
    <div className="nice-table-body">
      {data.map((row, rowIndex) => (
        <div key={rowIndex} className="nice-table-row">
          {hasCheckbox && (
            <div
              className="nice-table-cell nice-table-checkbox"
              style={{
                width: `${columnWidths[0]}px`,
                flexBasis: `${columnWidths[0]}px`,
              }}
            >
              <input
                type="checkbox"
                checked={selectedRows.includes(row)}
                onChange={() => handleRowSelect(row)}
              />
            </div>
          )}
          {columns.map((column, columnIndex) => {
            const widthIndex = hasCheckbox ? columnIndex + 1 : columnIndex;
            return (
              <div
                key={column.key as string}
                className="nice-table-cell"
                style={{
                  width: `${columnWidths[widthIndex]}px`,
                  flexBasis: `${columnWidths[widthIndex]}px`,
                  flexGrow: 0,
                  flexShrink: 0,
                }}
              >
                {column.render
                  ? column.render(row[column.key as keyof T], row)
                  : String(row[column.key as keyof T])}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
