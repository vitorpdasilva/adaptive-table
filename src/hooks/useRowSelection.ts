import { useState, useCallback } from "react";

export const useRowSelection = <T>(
  data: T[],
  onRowSelect?: (selectedRows: T[]) => void
) => {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);

  const handleRowSelect = useCallback(
    (row: T) => {
      setSelectedRows((prev) => {
        const newSelection = prev.includes(row)
          ? prev.filter((r) => r !== row)
          : [...prev, row];
        onRowSelect?.(newSelection);
        return newSelection;
      });
    },
    [onRowSelect]
  );

  const handleSelectAll = useCallback(
    (checked: boolean) => {
      const newSelection = checked ? [...data] : [];
      setSelectedRows(newSelection);
      onRowSelect?.(newSelection);
    },
    [data, onRowSelect]
  );

  return { selectedRows, handleRowSelect, handleSelectAll };
};
