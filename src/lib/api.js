// --- MOCK DATABASE & API ---
// Komentar ini menjelaskan bahwa file ini hanya untuk tujuan simulasi
// dan tidak mewakili implementasi backend yang sebenarnya.
// Jangan fokus pada implementasi ini, ini hanya untuk simulasi.

// 'let' digunakan agar kita bisa memodifikasi array ini (menambah/menghapus item).
// Ini bertindak sebagai database in-memory sederhana.
let todos = [
  { id: 1, title: 'Belajar React 19', completed: true },
  { id: 2, title: 'Pahami Server Actions', completed: false },
  { id: 3, title: 'Coba useOptimistic Hook', completed: false },
];

// Fungsi utilitas untuk mensimulasikan penundaan jaringan (network latency).
// Ini membuat interaksi terasa lebih realistis, seolah-olah kita sedang berkomunikasi dengan server sungguhan.
const delay = (ms) => new Promise(res => setTimeout(res, ms));

// Mengekspor objek 'api' yang berisi semua metode untuk berinteraksi dengan 'database' todos.
export const api = {
  /**
   * Mengambil semua To-Do.
   * @returns {Promise<Array<object>>} - Array dari semua To-Do.
   */
  getTodos: async () => {
    await delay(500); // Tunggu 500ms untuk simulasi request jaringan.
    console.log('API: Fetched Todos'); // Log untuk debugging.
    return todos; // Kembalikan data todos saat ini.
  },

  /**
   * Menambahkan To-Do baru.
   * @param {string} title - Judul dari To-Do baru.
   * @returns {Promise<object>} - Objek To-Do yang baru dibuat.
   */
  addTodo: async (title) => {
    await delay(200); // Simulasi penundaan yang lebih cepat untuk menambah data.
    // Fitur tersembunyi untuk mensimulasikan error dari API.
    if (title.toLowerCase().includes('error')) {
      console.error('API: Failed to add todo');
      throw new Error('Gagal menambahkan To-Do!');
    }
    // Membuat objek To-Do baru.
    const newTodo = {
      id: Date.now(), // Gunakan timestamp sebagai ID unik (untuk demo).
      title,
      completed: false,
    };
    // Tambahkan To-Do baru ke array 'database'.
    todos = [...todos, newTodo];
    console.log('API: Added new todo:', newTodo); // Log untuk debugging.
    return newTodo; // Kembalikan To-Do yang baru dibuat.
  },

  /**
   * Menghapus To-Do berdasarkan ID.
   * @param {number} id - ID dari To-Do yang akan dihapus.
   * @returns {Promise<{id: number}>} - Objek yang berisi ID dari To-Do yang dihapus.
   */
  deleteTodo: async (id) => {
    await delay(500); // Simulasi penundaan jaringan.
    const todoExists = todos.some(t => t.id === id);
    // Penanganan error jika mencoba menghapus To-Do yang tidak ada.
    if (!todoExists) {
        console.error('API: Todo not found for deletion');
        throw new Error('To-Do tidak ditemukan!');
    }
    // Filter array untuk menghapus To-Do dengan ID yang cocok.
    todos = todos.filter(t => t.id !== id);
    console.log('API: Deleted todo with id:', id); // Log untuk debugging.
    return { id }; // Kembalikan ID sebagai konfirmasi.
  },
};
