import { useState, useCallback, useEffect } from "react";
import { RowExpansionMode } from "../types";

export const useRowExpansion = (initialMode: RowExpansionMode = "multiple") => {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [rowExpansionMode, setRowExpansionMode] =
    useState<RowExpansionMode>(initialMode);

  const toggleRowExpansion = useCallback(
    (rowIndex: number) => {
      console.log(`Attempting to toggle row ${rowIndex}`);
      console.log(`Current expansion mode: ${rowExpansionMode}`);
      console.log(`Current expanded rows: ${Array.from(expandedRows)}`);

      setExpandedRows((prevExpandedRows) => {
        const newExpandedRows = new Set(prevExpandedRows);
        if (rowExpansionMode === "single") {
          newExpandedRows.clear();
          console.log("Cleared all rows due to single mode");
        }
        if (newExpandedRows.has(rowIndex)) {
          newExpandedRows.delete(rowIndex);
          console.log(`Deleted row ${rowIndex} from expanded set`);
        } else {
          newExpandedRows.add(rowIndex);
          console.log(`Added row ${rowIndex} to expanded set`);
        }
        console.log(`New expanded rows: ${Array.from(newExpandedRows)}`);
        return newExpandedRows;
      });
    },
    [rowExpansionMode, expandedRows]
  );

  const updateRowExpansionMode = useCallback(
    (mode: RowExpansionMode) => {
      console.log(`Updating row expansion mode to: ${mode}`);
      setRowExpansionMode(mode);
      if (mode === "single" && expandedRows.size > 1) {
        const lastExpanded = Array.from(expandedRows).pop();
        setExpandedRows(
          lastExpanded !== undefined ? new Set([lastExpanded]) : new Set()
        );
      }
    },
    [expandedRows]
  );

  useEffect(() => {
    console.log(`Initial row expansion mode set to: ${initialMode}`);
    updateRowExpansionMode(initialMode);
  }, [initialMode, updateRowExpansionMode]);

  return {
    expandedRows,
    toggleRowExpansion,
    rowExpansionMode,
    updateRowExpansionMode,
  };
};
