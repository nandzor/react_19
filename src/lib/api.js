
// --- MOCK DATABASE & API ---
// Jangan fokus pada implementasi ini, ini hanya untuk simulasi.
let todos = [
  { id: 1, title: 'Belajar React 19', completed: true },
  { id: 2, title: 'Pahami Server Actions', completed: false },
  { id: 3, title: 'Coba useOptimistic Hook', completed: false },
];

// Simulasi latensi jaringan
const delay = (ms) => new Promise(res => setTimeout(res, ms));

export const api = {
  getTodos: async () => {
    await delay(500);
    console.log('API: Fetched Todos');
    return todos;
  },
  addTodo: async (title) => {
    await delay(500);
    if (title.toLowerCase().includes('error')) {
      console.error('API: Failed to add todo');
      throw new Error('Gagal menambahkan To-Do!');
    }
    const newTodo = {
      id: Date.now(),
      title,
      completed: false,
    };
    todos = [...todos, newTodo];
    console.log('API: Added new todo:', newTodo);
    return newTodo;
  },
  deleteTodo: async (id) => {
    await delay(500);
    const todoExists = todos.some(t => t.id === id);
    if (!todoExists) {
        console.error('API: Todo not found for deletion');
        throw new Error('To-Do tidak ditemukan!');
    }
    todos = todos.filter(t => t.id !== id);
    console.log('API: Deleted todo with id:', id);
    return { id };
  },
};
