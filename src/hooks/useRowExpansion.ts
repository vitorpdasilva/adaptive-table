import { useState, useCallback, useEffect } from "react";
import { RowExpansionMode } from "../types";

export const useRowExpansion = (initialMode: RowExpansionMode = "multiple") => {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [rowExpansionMode, setRowExpansionMode] =
    useState<RowExpansionMode>(initialMode);

  const toggleRowExpansion = useCallback(
    (rowIndex: number) => {
      setExpandedRows((prevExpandedRows) => {
        const newExpandedRows = new Set(prevExpandedRows);
        if (rowExpansionMode === "single") {
          newExpandedRows.clear();
        }
        if (newExpandedRows.has(rowIndex)) {
          newExpandedRows.delete(rowIndex);
        } else {
          newExpandedRows.add(rowIndex);
        }
        return newExpandedRows;
      });
    },
    [rowExpansionMode]
  );

  const updateRowExpansionMode = useCallback(
    (mode: RowExpansionMode) => {
      setRowExpansionMode(mode);
      if (mode === "single" && expandedRows.size > 1) {
        // If switching to single mode and multiple rows are expanded,
        // keep only the last expanded row
        const lastExpanded = Array.from(expandedRows).pop();
        setExpandedRows(
          lastExpanded !== undefined ? new Set([lastExpanded]) : new Set()
        );
      }
    },
    [expandedRows]
  );

  useEffect(() => {
    updateRowExpansionMode(initialMode);
  }, [initialMode, updateRowExpansionMode]);

  return {
    expandedRows,
    toggleRowExpansion,
    rowExpansionMode,
    updateRowExpansionMode,
  };
};
