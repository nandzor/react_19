import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import EditUserForm from '@/features/users/components/EditUserForm';
import { deleteUser } from '@/features/users/actions';


const UserTable = ({ users, setOptimisticUsers }) => {
  const [editingUser, setEditingUser] = React.useState(null);
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [deletingIds, setDeletingIds] = React.useState(new Set());
  const [editingIds, setEditingIds] = React.useState(new Set());

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
              disabled={editingIds.has(row.original.id) || deletingIds.has(row.original.id)}
              onClick={() => setEditingUser(row.original)}
            >
              {editingIds.has(row.original.id) ? 'Editing...' : 'Edit'}
            </button>
            <button
              className="btn btn-danger"
              disabled={deletingIds.has(row.original.id)}
              onClick={async () => {
                try {
                  setDeletingIds(prev => new Set(prev).add(row.original.id));
                  if (setOptimisticUsers) {
                    setOptimisticUsers({ type: 'delete', id: row.original.id });
                  }
                  await deleteUser(row.original.id);
                } catch (error) {
                  console.error('Error deleting user:', error);
                  // Revert optimistic update on error
                  if (setOptimisticUsers) {
                    setOptimisticUsers({ type: 'revert', user: row.original });
                  }
                  alert('Failed to delete user. Please try again.');
                } finally {
                  setDeletingIds(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(row.original.id);
                    return newSet;
                  });
                }
              }}
            >
              {deletingIds.has(row.original.id) ? 'Deleting...' : 'Delete'}
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
    <div className="overflow-x-auto px-3 pt-3 pb-2">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                      className="form-control-sm mt-1"
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
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-3">
        <div>
          <button
            className="btn btn-outline-primary btn-sm mr-1"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {'<<'}
          </button>
          <button
            className="btn btn-outline-primary btn-sm mr-1"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {'<'}
          </button>
          <span className="mx-2">
            Page <strong>{table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</strong>
          </span>
          <button
            className="btn btn-outline-primary btn-sm ml-1"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {'>'}
          </button>
          <button
            className="btn btn-outline-primary btn-sm ml-1"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {'>>'}
          </button>
        </div>
        <div>
          <span className="mr-3">
            Showing {table.getRowModel().rows.length} of {users.length} users
          </span>
          <select
            className="form-control-sm w-auto inline-block"
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
      </div>
      {editingUser && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" 
          tabIndex="-1" 
          role="dialog"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setEditingUser(null);
            }
          }}
        >
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4" role="document">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h5 className="text-lg font-medium text-gray-900">Edit User</h5>
              <button 
                type="button" 
                className="btn-close" 
                aria-label="Close" 
                onClick={() => setEditingUser(null)}
              ></button>
            </div>
            <div className="p-4">
              <EditUserForm
                user={editingUser}
                setOptimisticUsers={setOptimisticUsers}
                clearEditing={() => setEditingUser(null)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;