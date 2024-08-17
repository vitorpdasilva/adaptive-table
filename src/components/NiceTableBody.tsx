import React from "react";
import type { Column } from "../types";

interface NiceTableBodyProps<T> {
  data: T[];
  columns: Column<T>[];
  hasCheckbox: boolean;
  columnWidths: Record<string, number>;
  selectedRows: T[];
  expandedRows: Set<number>;
  expandedRowRender?: (rowData: T) => React.ReactNode;
  onRowClick: (index: number) => void;
  onCheckboxChange: (row: T) => void;
}

export const NiceTableBody = <T,>({
  data,
  columns,
  hasCheckbox,
  columnWidths,
  selectedRows,
  expandedRows,
  expandedRowRender,
  onRowClick,
  onCheckboxChange,
}: NiceTableBodyProps<T>) => {
  return (
    <div className="nice-table-body">
      {data.map((row, rowIndex) => (
        <React.Fragment key={rowIndex}>
          <div className="nice-table-row" onClick={() => onRowClick(rowIndex)}>
            {hasCheckbox && (
              <div className="nice-table-cell" style={{ width: "40px" }}>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(row)}
                  onChange={() => onCheckboxChange(row)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
            {columns.map((column) => (
              <div
                key={column.key as string}
                className="nice-table-cell"
                style={{ width: `${columnWidths[column.key as string]}px` }}
              >
                {column.render
                  ? column.render(row[column.key], row)
                  : (row[column.key] as React.ReactNode)}
              </div>
            ))}
          </div>
          {expandedRows.has(rowIndex) && expandedRowRender && (
            <div className="nice-table-expanded-row">
              {expandedRowRender(row)}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
