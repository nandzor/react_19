
import { api } from '@/lib/api';

export const getUsers = async () => {
  return api.getUsers();
};

export const createUser = async (newUser, queryClient) => {
  const result = await api.createUser(newUser);
  if (queryClient) {
    queryClient.invalidateQueries({ queryKey: ['users'] });
  }
  return result;
};

export const updateUser = async (updatedUser, queryClient) => {
  const result = await api.updateUser(updatedUser);
  if (queryClient) {
    queryClient.invalidateQueries({ queryKey: ['users'] });
  }
  return result;
};

export const deleteUser = async (userId, queryClient) => {
  const result = await api.deleteUser(userId);
  if (queryClient) {
    queryClient.invalidateQueries({ queryKey: ['users'] });
  }
  return result;
};
