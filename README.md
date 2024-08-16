# nice-table

### Usage

```
import React from 'react';
import NiceTable from '@NiceTable';
import type { Column } from './types';

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  status: 'active' | 'inactive';
}

const columns: Column<User>[] = [
  { key: 'id', title: 'ID', minWidth: 50 },
  { key: 'name', title: 'Name', minWidth: 100 },
  {
    key: 'email',
    title: 'Email',
    minWidth: 200,
    render: (value) => <a href={`mailto:${value}`}>{value}</a>
  },
  { key: 'age', title: 'Age', minWidth: 80 },
  {
    key: 'status',
    title: 'Status',
    minWidth: 100,
    sortable: false,
    render: (value) => (
      <span style={{ color: value === 'active' ? 'green' : 'red' }}>
        {value.charAt(0).toUpperCase() + value.slice(1)}
      </span>
    )
  },
];

const data: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 30, status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 28, status: 'inactive' },
  // ... more data
];

const App: React.FC = () => {
  return (
    <NiceTable<User>
      data={data}
      columns={columns}
      hasCheckbox={true}
      itemsPerPage={10}
      onSorting={(sortingData) => console.log('Sorting:', sortingData)}
      onPagination={(paginationData) => console.log('Pagination:', paginationData)}
      onRowSelect={(selectedRows) => console.log('Selected rows:', selectedRows)}
    />
  );
};

export default App;

```
