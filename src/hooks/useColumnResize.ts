import { useState, useEffect } from "react";
import type { Column } from "../types";

export const useColumnResize = <T>(columns: Column<T>[]) => {
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});

  useEffect(() => {
    const initialWidths: Record<string, number> = {};
    columns.forEach((column) => {
      initialWidths[column.key as string] = column.minWidth;
    });
    setColumnWidths(initialWidths);
  }, [columns]);

  const handleColumnResize = (columnKey: keyof T | "", newWidth: number) => {
    const column = columns.find((c) => c.key === columnKey);
    if (column && column.isResizable !== false && newWidth >= column.minWidth) {
      setColumnWidths((prev) => ({ ...prev, [columnKey as string]: newWidth }));
    }
  };

  return { columnWidths, handleColumnResize };
};
