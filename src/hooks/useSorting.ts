import { useState } from "react";
import type { Column, SortingState } from "../types";

export const useSorting = <T>(
  onSorting?: (sortingData: SortingState<T>) => void
) => {
  const [sorting, setSorting] = useState<SortingState<T>>({
    column: null,
    direction: null,
  });

  const handleSort = (column: Column<T>) => {
    if (column.sortable === false) return;

    const sortKey = column.sortKey || (column.key as string);
    const newDirection: "asc" | "desc" =
      sorting.column === sortKey && sorting.direction === "asc"
        ? "desc"
        : "asc";

    const newSorting: SortingState<T> = {
      column: sortKey,
      direction: newDirection,
    };
    setSorting(newSorting);
    onSorting?.(newSorting);
  };

  return { sorting, handleSort };
};
