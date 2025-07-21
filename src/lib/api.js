import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export const api = {
  getTodos: async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
    return response.json();
  },

  addTodo: async (title) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, completed: false }),
    });
    if (!response.ok) {
      throw new Error('Failed to add todo');
    }
    return response.json();
  },

  deleteTodo: async (id) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete todo');
    }
    return { id };
  },

  getUsers: async () => {
    const response = await apiClient.get('/users');
    return response.data;
  },

  createUser: async (user) => {
    const response = await apiClient.post('/users', user);
    return response.data;
  },

  updateUser: async (user) => {
    const response = await apiClient.put(`/users/${user.id}`, user);
    return response.data;
  },

  deleteUser: async (id) => {
    await apiClient.delete(`/users/${id}`);
    return id;
  },
};
