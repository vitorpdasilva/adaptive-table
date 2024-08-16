import { useState } from "react";

export const useRowSelection = <T>(
  onRowSelect?: (selectedRows: T[]) => void
) => {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);

  const handleCheckboxChange = (row: T) => {
    const newSelectedRows = selectedRows.includes(row)
      ? selectedRows.filter((r) => r !== row)
      : [...selectedRows, row];
    setSelectedRows(newSelectedRows);
    onRowSelect?.(newSelectedRows);
  };

  return { selectedRows, handleCheckboxChange };
};
