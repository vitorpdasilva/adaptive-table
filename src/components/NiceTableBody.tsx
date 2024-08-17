import React, { Fragment } from "react";
import { useTableContext } from "../context/TableContext";

export const NiceTableBody = <T,>() => {
  const {
    data,
    columns,
    columnWidths,
    hasCheckbox,
    selectedRows,
    handleRowSelect,
    expandedRows,
    expandedRowRender,
    handleRowExpand,
  } = useTableContext<T>();

  return (
    <div className="nice-table-body">
      {data.map((row, rowIndex) => (
        <Fragment key={rowIndex}>
          <div
            className="nice-table-row"
            onClick={() => handleRowExpand(rowIndex)}
          >
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
          {expandedRows.has(rowIndex) && expandedRowRender && (
            <div className="nice-table-expanded-row">
              {expandedRowRender(row)}
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
};
