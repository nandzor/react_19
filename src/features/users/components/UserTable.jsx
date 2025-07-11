import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import EditUserForm from './EditUserForm';
import { deleteUser } from '../actions';

const UserTable = ({ users, setOptimisticUsers }) => {
  const [editingUser, setEditingUser] = React.useState(null);

  const columns = React.useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
      },
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'phone',
        header: 'Phone',
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
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="table-responsive">
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