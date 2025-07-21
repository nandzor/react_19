
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@/features/users/actions';
import UserTable from '@/features/users/components/UserTable';
import AddUserForm from '@/features/users/components/AddUserForm';

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


  const [showModal, setShowModal] = React.useState(false);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading users: {error.message}</p>;
  }

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
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add User</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <AddUserForm
                  setOptimisticUsers={handleOptimisticUsers}
                  onSuccess={() => setShowModal(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <UserTable users={optimisticUsers || []} setOptimisticUsers={handleOptimisticUsers} />
    </div>
  );
};

export default UsersPage;
