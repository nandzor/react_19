
import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { deleteUser } from '@/features/users/actions';
import EditUserForm from '@/features/users/components/EditUserForm';

const UserItem = ({ user, setOptimisticUsers }) => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    setOptimisticUsers({ type: 'delete', id: user.id });
    await deleteUser(user.id, queryClient);
  };

  return (
    <div className="p-4 border rounded-lg">
      {isEditing ? (
        <EditUserForm user={user} setOptimisticUsers={setOptimisticUsers} setIsEditing={setIsEditing} />
      ) : (
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">{user.name}</p>
            <p className="text-gray-500">{user.email}</p>
          </div>
          <div className="flex space-x-2">
            <button onClick={() => setIsEditing(true)} className="px-4 py-2 text-white bg-yellow-500 rounded-lg">Edit</button>
            <button onClick={handleDelete} className="px-4 py-2 text-white bg-red-500 rounded-lg">Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserItem;
