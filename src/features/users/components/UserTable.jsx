import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
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
  const queryClient = useQueryClient();
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
                  await deleteUser(row.original.id, queryClient);
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
    <div className="table-responsive px-3 pt-3 pb-2">
      <table className="table table-striped table-hover mb-0">
        <thead className="table-light">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="align-middle">
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
                <td key={cell.id} className="align-middle">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <div>
          <button
            className="btn btn-outline-primary btn-sm me-1"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {'<<'}
          </button>
          <button
            className="btn btn-outline-primary btn-sm me-1"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {'<'}
          </button>
          <span className="mx-2">
            Page <strong>{table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</strong>
          </span>
          <button
            className="btn btn-outline-primary btn-sm ms-1"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {'>'}
          </button>
          <button
            className="btn btn-outline-primary btn-sm ms-1"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {'>>'}
          </button>
        </div>
        <div>
          <span className="me-3">
            Showing {table.getRowModel().rows.length} of {users.length} users
          </span>
          <select
            className="form-select form-select-sm w-auto d-inline-block"
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
          className="modal fade show" 
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} 
          tabIndex="-1" 
          role="dialog"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setEditingUser(null);
            }
          }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit User</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  aria-label="Close" 
                  onClick={() => setEditingUser(null)}
                ></button>
              </div>
              <div className="modal-body">
                <EditUserForm
                  user={editingUser}
                  setOptimisticUsers={setOptimisticUsers}
                  clearEditing={() => setEditingUser(null)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;