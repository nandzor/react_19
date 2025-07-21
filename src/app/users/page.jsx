
import React, { useOptimistic } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../../features/users/actions';
import UserTable from '../../features/users/components/UserTable';
import AddUserForm from '../../features/users/components/AddUserForm';

const UsersPage = () => {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  const [optimisticUsers, setOptimisticUsers] = useOptimistic(
    users,
    (state, { type, user, id }) => {
      switch (type) {
        case 'add':
          return [...state, { ...user, id: Date.now() }];
        case 'update':
          return state.map(u => (u.id === user.id ? user : u));
        case 'delete':
          return state.filter(u => user.id !== id);
        default:
          return state;
      }
    }
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading users: {error.message}</p>;
  }

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Users</h1>
      <AddUserForm setOptimisticUsers={setOptimisticUsers} />
      <UserTable users={optimisticUsers || []} setOptimisticUsers={setOptimisticUsers} />
    </div>
  );
};

export default UsersPage;
