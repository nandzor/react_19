
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
  const [showModal, setShowModal] = useState(false);

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
        case 'revert':
          // Revert optimistic update by adding back the user
          return [...prev, user];
        default:
          return prev;
      }
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading users: {error.message}</p>;
  }

  return (
    <div className="container p-4 mx-auto">
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Users</h5>
          <button
            className="btn btn-light btn-sm"
            onClick={() => setShowModal(true)}
          >
            <i className="bi bi-plus-lg me-1"></i> Add User
          </button>
        </div>
        <div className="card-body p-0">
          <UserTable users={optimisticUsers || []} setOptimisticUsers={handleOptimisticUsers} />
        </div>
      </div>

      {showModal && (
        <div 
          className="modal fade show" 
          style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} 
          tabIndex="-1" 
          role="dialog"
          onClick={handleBackdropClick}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add User</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  aria-label="Close" 
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <AddUserForm
                  setOptimisticUsers={handleOptimisticUsers}
                  onSuccess={handleCloseModal}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
