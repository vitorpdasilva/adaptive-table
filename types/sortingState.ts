export interface SortingState<T> {
  column: keyof T | "" | null;
  direction: "asc" | "desc" | null;
}
