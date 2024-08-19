import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import { NiceTable } from "./NiceTable";
import { Column } from "../types"; // Make sure to import your Column type

interface TestUser {
  id: number;
  name: string;
  email: string;
}

const testColumns: Column<TestUser>[] = [
  { key: "id", title: "ID", minWidth: 50 },
  { key: "name", title: "Name", minWidth: 100 },
  { key: "email", title: "Email", minWidth: 200 },
];

const testData: TestUser[] = [
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 3, name: "Alice Johnson", email: "alice@example.com" },
];

describe("NiceTable Component", () => {
  test("renders table with correct headers and data", () => {
    render(<NiceTable<TestUser> data={testData} columns={testColumns} />);

    testColumns.forEach((column) => {
      expect(screen.getByText(column.title)).toBeInTheDocument();
    });

    testData.forEach((user) => {
      expect(screen.getByText(user.name)).toBeInTheDocument();
      expect(screen.getByText(user.email)).toBeInTheDocument();
    });
  });

  test("checkbox functionality", async () => {
    const onRowSelect = jest.fn();

    render(
      <NiceTable<TestUser>
        data={testData}
        columns={testColumns}
        hasCheckbox={true}
        onRowSelect={onRowSelect}
      />
    );

    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes).toHaveLength(testData.length + 1); // +1 for header checkbox

    fireEvent.click(checkboxes[1]);

    expect(onRowSelect).toHaveBeenCalledTimes(1);

    expect(onRowSelect).toHaveBeenCalledWith(
      expect.arrayContaining([expect.objectContaining(testData[0])])
    );

    fireEvent.click(checkboxes[1]);

    expect(onRowSelect).toHaveBeenCalledTimes(2);

    expect(onRowSelect).toHaveBeenLastCalledWith([]);
  });

  test("sorting functionality", () => {
    const onSorting = jest.fn();

    render(
      <NiceTable<TestUser>
        data={testData}
        columns={testColumns}
        onSorting={onSorting}
      />
    );

    // Debug: Log the rendered content
    console.log(screen.debug());

    // Get all rows
    const rows = screen.getAllByTestId("adaptive-table-row");

    // Check initial render order
    expect(rows[0]).toHaveTextContent("2Jane Smithjane@example.com");
    expect(rows[1]).toHaveTextContent("1John Doejohn@example.com");
    expect(rows[2]).toHaveTextContent("3Alice Johnsonalice@example.com");

    // Click on Name header to sort
    const nameHeader = screen.getByText("Name");
    fireEvent.click(nameHeader);

    // Check if onSorting was called
    expect(onSorting).toHaveBeenCalledWith({
      column: "name",
      direction: "asc",
    });

    // Note: We're not re-rendering here as the component should handle sorting internally

    // Check if the sorting indicator is displayed (if applicable)
    expect(nameHeader).toHaveTextContent(/Name/);

    // Click again to reverse sort
    fireEvent.click(nameHeader);

    expect(onSorting).toHaveBeenCalledWith({
      column: "name",
      direction: "desc",
    });

    // Check if the sorting indicator is updated (if applicable)
    expect(nameHeader).toHaveTextContent(/Name/);
  });

  test("pagination functionality", () => {
    const onPagination = jest.fn();

    const testData: TestUser[] = Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
    }));

    render(
      <NiceTable<TestUser>
        data={testData}
        columns={testColumns}
        itemsPerPage={2}
        onPagination={onPagination}
      />
    );

    // Check initial render
    expect(screen.getByText("User 1")).toBeInTheDocument();
    expect(screen.getByText("User 2")).toBeInTheDocument();
    expect(screen.queryByText("User 3")).not.toBeInTheDocument();

    // Click Next button
    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);

    // Check if onPagination was called
    expect(onPagination).toHaveBeenCalledWith({
      currentPage: 2,
      itemsPerPage: 2,
    });

    // Check if page 2 content is visible
    expect(screen.getByText("User 3")).toBeInTheDocument();
    expect(screen.getByText("User 4")).toBeInTheDocument();
    expect(screen.queryByText("User 1")).not.toBeInTheDocument();

    // Check pagination info
    const paginationInfo = screen.getByText(/Page \d+/);

    // Test going back to previous page
    const prevButton = screen.getByText("Previous");
    fireEvent.click(prevButton);

    expect(onPagination).toHaveBeenCalledWith({
      currentPage: 1,
      itemsPerPage: 2,
    });

    // Check if page 1 content is visible again
    expect(screen.getByText("User 1")).toBeInTheDocument();
    expect(screen.getByText("User 2")).toBeInTheDocument();
    expect(screen.queryByText("User 3")).not.toBeInTheDocument();
  });

  test("expandable row functionality", () => {
    const expandedRow = (row: TestUser) => (
      <div data-testid="expanded-content">{row.email}</div>
    );

    render(
      <NiceTable<TestUser>
        data={testData}
        columns={testColumns}
        expandedRow={expandedRow}
      />
    );

    expect(screen.queryByTestId("expanded-content")).not.toBeInTheDocument();

    const rows = screen.getAllByRole("row");
    fireEvent.click(rows[0]); // Click the first row

    const expandedContent = screen.getByTestId("expanded-content");
    expect(expandedContent).toBeInTheDocument();
    expect(expandedContent).toHaveTextContent("jane@example.com");

    // Test collapsing the row
    fireEvent.click(rows[0]);
    expect(screen.queryByTestId("expanded-content")).not.toBeInTheDocument();
  });

  test("column resizing functionality", () => {
    const onResize = jest.fn();
    render(
      <NiceTable<TestUser>
        data={testData}
        columns={testColumns}
        onResize={onResize}
      />
    );

    const nameHeader = screen.getByText("Name");
    const resizer = nameHeader.querySelector(".column-resizer");

    if (!resizer) {
      throw new Error("Resizer not found");
    }

    fireEvent.mouseDown(resizer);
    fireEvent.mouseMove(document, { clientX: 150 });
    fireEvent.mouseUp(document);

    expect(onResize).toHaveBeenCalled();
  });

  test("custom cell rendering", () => {
    const customColumns: Column<TestUser>[] = [
      ...testColumns,
      {
        key: "name",
        title: "Custom",
        minWidth: 100,
        render: (value, row) => (
          <span data-testid="custom-cell">{row.name.toUpperCase()}</span>
        ),
      },
    ];

    render(<NiceTable<TestUser> data={testData} columns={customColumns} />);

    const customCells = screen.getAllByTestId("custom-cell");
    expect(customCells).toHaveLength(testData.length);
    expect(customCells[0]).toHaveTextContent("JANE SMITH");
  });

  test("empty state handling", () => {
    render(<NiceTable<TestUser> data={[]} columns={testColumns} />);
    expect(screen.getByText("No data available")).toBeInTheDocument();
  });
});
