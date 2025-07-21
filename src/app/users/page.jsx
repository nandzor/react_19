
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../../features/users/actions';
import UserTable from '../../features/users/components/UserTable';
import AddUserForm from '../../features/users/components/AddUserForm';

const UsersPage = () => {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  const [optimisticUsers, setOptimisticUsers] = useState([]);

  React.useEffect(() => {
    if (users) {
      setOptimisticUsers(users);
    }
  }, [users]);

  const handleOptimisticUsers = ({ type, user, id }) => {
    setOptimisticUsers(prev => {
      switch (type) {
        case 'add':
          return [...prev, { ...user, id: Date.now() }];
        case 'update':
          return prev.map(u => (u.id === user.id ? user : u));
        case 'delete':
          return prev.filter(u => u.id !== id);
        default:
          return prev;
      }
    });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading users: {error.message}</p>;
  }

  const [showModal, setShowModal] = React.useState(false);

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Users</h1>
      <button
        className="btn btn-primary mb-3"
        onClick={() => setShowModal(true)}
      >
        Add User
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 min-w-[320px] relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4">Add User</h2>
            <AddUserForm
              setOptimisticUsers={handleOptimisticUsers}
              onSuccess={() => setShowModal(false)}
            />
          </div>
        </div>
      )}

      <UserTable users={optimisticUsers || []} setOptimisticUsers={handleOptimisticUsers} />
    </div>
  );
};

export default UsersPage;
