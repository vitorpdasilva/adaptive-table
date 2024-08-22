import { useState, useCallback, useEffect } from "react";
import { Column } from "../types";

export const useColumnResize = (
  columns: Column<any>[],
  tableWidth: number,
  hasCheckbox: boolean,
  onResize?: (columnWidths: number[]) => void
) => {
  const [columnWidths, setColumnWidths] = useState<number[]>([]);

  useEffect(() => {
    const checkboxWidth = hasCheckbox ? 40 : 0;
    const availableWidth = tableWidth - checkboxWidth;
    const equalWidth = availableWidth / columns.length;
    const initialWidths = hasCheckbox
      ? [checkboxWidth, ...columns.map(() => equalWidth)]
      : columns.map(() => equalWidth);

    setColumnWidths(initialWidths);
    onResize?.(initialWidths);
  }, [columns.length, tableWidth, hasCheckbox, onResize]);

  const handleColumnResize = useCallback(
    (index: number, newWidth: number) => {
      setColumnWidths((prevWidths) => {
        const newWidths = [...prevWidths];
        const actualIndex = hasCheckbox ? index - 1 : index;
        const oldWidth = newWidths[index];
        const widthChange = newWidth - oldWidth;

        if (index === 0 && hasCheckbox) return prevWidths;

        newWidths[index] = Math.max(
          newWidth,
          columns[actualIndex]?.minWidth || 50
        );

        let nextColumnIndex = index + 1;
        while (
          nextColumnIndex < newWidths.length &&
          newWidths[nextColumnIndex] - widthChange <
            (columns[nextColumnIndex - (hasCheckbox ? 2 : 1)]?.minWidth || 50)
        ) {
          nextColumnIndex++;
        }

        if (nextColumnIndex < newWidths.length) {
          newWidths[nextColumnIndex] = Math.max(
            newWidths[nextColumnIndex] - widthChange,
            columns[nextColumnIndex - (hasCheckbox ? 2 : 1)]?.minWidth || 50
          );
        }

        onResize?.(newWidths);
        return newWidths;
      });
    },
    [columns, hasCheckbox, onResize]
  );

  return { columnWidths, handleColumnResize };
};
