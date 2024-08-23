import { useCallback, useState } from "react";
import type { Column, SortingState } from "../types";

export const useSorting = <T>(
  onSorting?: (sortingData: SortingState<T>) => void
) => {
  const [sorting, setSorting] = useState<SortingState<T>>({
    column: null,
    direction: null,
  });

  const handleSort = useCallback(
    (column: Column<T>) => {
      if (!column.isSortable) return;

      setSorting((prevSorting) => {
        const newSorting: SortingState<T> = {
          column: column.key,
          direction:
            prevSorting.column === column.key && prevSorting.direction === "asc"
              ? "desc"
              : "asc",
        };
        onSorting?.(newSorting);
        return newSorting;
      });
    },
    [onSorting]
  );

  return { sorting, handleSort };
};
