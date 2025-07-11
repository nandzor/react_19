
import React, { useOptimistic } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUsers } from '../../features/users/actions';
import useStore from '../../lib/store';
import UserList from '../../features/users/components/UserList';
import AddUserForm from '../../features/users/components/AddUserForm';

const UsersPage = () => {
  const queryClient = useQueryClient();
  const { users, setUsers } = useStore();
  const [optimisticUsers, setOptimisticUsers] = useOptimistic(
    users,
    (state, { type, user, id }) => {
      switch (type) {
        case 'add':
          return [...state, { ...user, id: Date.now() }];
        case 'update':
          return state.map(u => (u.id === user.id ? user : u));
        case 'delete':
          return state.filter(user => user.id !== id);
        default:
          return state;
      }
    }
  );

  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    onSuccess: setUsers,
  });

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Users</h1>
      <AddUserForm setOptimisticUsers={setOptimisticUsers} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <UserList users={optimisticUsers} setOptimisticUsers={setOptimisticUsers} />
      )}
    </div>
  );
};

export default UsersPage;
