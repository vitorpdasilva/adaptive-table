import React, { Fragment } from "react";
import { useTableContext } from "../context/TableContext";

export const AdaptiveTableBody = <T,>() => {
  const {
    data,
    columns,
    columnWidths,
    hasCheckbox,
    selectedRows,
    handleRowSelect,
    expandedRows,
    expandedRowRender,
    toggleRowExpansion,
  } = useTableContext<T>();

  return (
    <div className="adaptive-table-body">
      {data.map((row, rowIndex) => (
        <Fragment key={rowIndex}>
          <div
            role="row"
            className="adaptive-table-row"
            data-testid="adaptive-table-row"
            onClick={() => toggleRowExpansion(rowIndex)}
          >
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
                  checked={selectedRows.includes(row)}
                  onChange={() => handleRowSelect(row)}
                  onClick={(e) => e.stopPropagation()} // Prevent row click when checkbox is clicked
                />
              </div>
            )}
            {columns.map((column, columnIndex) => {
              const widthIndex = hasCheckbox ? columnIndex + 1 : columnIndex;
              return (
                <div
                  key={`${column.key as string}-${columnIndex}`}
                  className="adaptive-table-cell"
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
          {expandedRows.has(rowIndex) && expandedRowRender && (
            <div className="adaptive-table-expanded-row">
              {expandedRowRender(row)}
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
};
