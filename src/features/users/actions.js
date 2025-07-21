
import { api } from '../../lib/api';

export const getUsers = async () => {
  return api.getUsers();
};

export const createUser = async (newUser) => {
  return api.createUser(newUser);
};

export const updateUser = async (updatedUser) => {
  return api.updateUser(updatedUser);
};

export const deleteUser = async (userId) => {
  return api.deleteUser(userId);
};
