import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000, // 10 second timeout
});

// Add response interceptor for better error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    if (error.response) {
      // Server responded with error status
      throw new Error(`Server error: ${error.response.status} - ${error.response.statusText}`);
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('Network error: No response from server');
    } else {
      // Something else happened
      throw new Error(`Request error: ${error.message}`);
    }
  }
);

export const api = {
  getTodos: async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      if (!response.ok) {
        throw new Error(`Failed to fetch todos: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  },

  addTodo: async (title) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, completed: false }),
      });
      if (!response.ok) {
        throw new Error(`Failed to add todo: ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error adding todo:', error);
      throw error;
    }
  },

  deleteTodo: async (id) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Failed to delete todo: ${response.status}`);
      }
      return { id };
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  },

  getUsers: async () => {
    try {
      const response = await apiClient.get('/users');
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  createUser: async (user) => {
    try {
      const response = await apiClient.post('/users', user);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  updateUser: async (user) => {
    try {
      const response = await apiClient.put(`/users/${user.id}`, user);
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  deleteUser: async (id) => {
    try {
      await apiClient.delete(`/users/${id}`);
      return id;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },
};
