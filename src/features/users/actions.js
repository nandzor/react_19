
import { users } from './data.js';

export const getUsers = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return users;
};

export const createUser = async (newUser) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const user = { id: Date.now(), ...newUser };
  users.push(user);
  return user;
};

export const updateUser = async (updatedUser) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  users = users.map(user => (user.id === updatedUser.id ? updatedUser : user));
  return updatedUser;
};

export const deleteUser = async (userId) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  users = users.filter(user => user.id !== userId);
  return userId;
};
