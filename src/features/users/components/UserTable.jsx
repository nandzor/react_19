import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import EditUserForm from './EditUserForm';
import { deleteUser } from '../actions';


const UserTable = ({ users, setOptimisticUsers }) => {
  const [editingUser, setEditingUser] = React.useState(null);
  const [globalFilter, setGlobalFilter] = React.useState('');

  // Sort users by id descending (latest first)
  const sortedUsers = React.useMemo(() => {
    if (!users) return [];
    return [...users].sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
  }, [users]);

  const columns = React.useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        cell: info => info.getValue(),
        filterFn: 'includesString',
      },
      {
        accessorKey: 'name',
        header: 'Name',
        cell: info => info.getValue(),
        filterFn: 'includesString',
      },
      {
        accessorKey: 'email',
        header: 'Email',
        cell: info => info.getValue(),
        filterFn: 'includesString',
      },
      {
        accessorKey: 'phone',
        header: 'Phone',
        cell: info => info.getValue(),
        filterFn: 'includesString',
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="btn-group" role="group">
            <button
              className="btn btn-primary"
              onClick={() => setEditingUser(row.original)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={async () => {
                if (setOptimisticUsers) {
                  setOptimisticUsers({ type: 'delete', id: row.original.id });
                }
                await deleteUser(row.original.id);
              }}
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    [setOptimisticUsers]
  );

  const table = useReactTable({
    data: sortedUsers,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: false,
  });

  return (
    <div className="table-responsive">
      <div className="mb-2 d-flex justify-content-end align-items-center">
        {/* <input
          type="text"
          className="form-control w-auto"
          value={globalFilter ?? ''}
          onChange={e => setGlobalFilter(e.target.value)}
          placeholder="Search users..."
          style={{ minWidth: 200 }}
        /> */}
        <div>
          <button
            className="btn btn-outline-secondary btn-sm me-1"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {'<<'}
          </button>
          <button
            className="btn btn-outline-secondary btn-sm me-1"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {'<'}
          </button>
          <span>
            Page{' '}
            <strong>
              {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </strong>
          </span>
          <button
            className="btn btn-outline-secondary btn-sm ms-1"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {'>'}
          </button>
          <button
            className="btn btn-outline-secondary btn-sm ms-1"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {'>>'}
          </button>
        </div>
      </div>
      <table className="table table-striped table-hover">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  {/* Per-column filter */}
                  {header.column.getCanFilter() && header.column.id !== 'actions' ? (
                    <input
                      type="text"
                      className="form-control form-control-sm mt-1"
                      value={header.column.getFilterValue() ?? ''}
                      onChange={e => header.column.setFilterValue(e.target.value)}
                      placeholder={`Filter...`}
                      style={{ minWidth: 80 }}
                    />
                  ) : null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between align-items-center mt-2">
        <span>
          Showing {table.getRowModel().rows.length} of {users.length} users
        </span>
        <select
          className="form-select form-select-sm w-auto"
          value={table.getState().pagination.pageSize}
          onChange={e => table.setPageSize(Number(e.target.value))}
        >
          {[5, 10, 20, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      {editingUser && (
        <EditUserForm
          user={editingUser}
          setOptimisticUsers={setOptimisticUsers}
          clearEditing={() => setEditingUser(null)}
        />
      )}
    </div>
  );
};

export default UserTable;