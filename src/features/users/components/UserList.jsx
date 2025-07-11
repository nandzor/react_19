
import React from 'react';
import UserItem from './UserItem';

const UserList = ({ users, setOptimisticUsers }) => {
  return (
    <div className="space-y-4">
      {users.map(user => (
        <UserItem key={user.id} user={user} setOptimisticUsers={setOptimisticUsers} />
      ))}
    </div>
  );
};

export default UserList;
