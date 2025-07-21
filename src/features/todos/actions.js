// Menandakan bahwa semua fungsi dalam file ini adalah "Server Actions".
// Server Actions adalah fungsi asinkron yang dieksekusi di server,
// memungkinkan mutasi data tanpa perlu membuat endpoint API secara manual.
'use server';

// Mengimpor objek 'api' yang berisi metode untuk berinteraksi dengan data (misalnya, database atau mock API).
import { api } from '@/lib/api';
// Komentar ini menunjukkan contoh bagaimana revalidasi data di Next.js akan bekerja.
// `revalidatePath` digunakan untuk membersihkan cache dan memicu pengambilan data baru untuk path tertentu.
// import { revalidatePath } from 'next/cache'; // Konsep revalidasi

/**
 * Server Action untuk membuat To-Do baru.
 * @param {any} previousState - State sebelumnya dari form, disediakan oleh hook `useActionState`.
 * @param {FormData} formData - Data dari form yang di-submit, berisi input fields.
 * @returns {Promise<{message: string}>} - Objek yang berisi pesan status untuk ditampilkan di UI.
 */
export async function createTodoAction(previousState, formData) {
  // Mengambil nilai dari input field dengan nama 'title'.
  const title = formData.get('title');
  
  // Validasi sederhana di sisi server.
  // Memeriksa apakah judul ada dan panjangnya minimal 3 karakter setelah membuang spasi.
  if (!title || title.trim().length < 3) {
    return { message: 'Judul harus lebih dari 3 karakter.' };
  }

  try {
    // Memanggil metode `addTodo` dari API untuk menyimpan data baru.
    await api.addTodo(title);
    // Di aplikasi Next.js, baris ini akan digunakan untuk memvalidasi ulang data.
    // Di aplikasi ini, kita mengandalkan invalidasi cache dari React Query di sisi klien.
    // revalidatePath('/todos'); 
    // Mengembalikan pesan sukses.
    return { message: `To-Do "${title}" berhasil ditambahkan.` };
  } catch (e) {
    // Jika terjadi error saat menyimpan, kembalikan pesan error.
    return { message: 'Gagal menambahkan To-Do.' };
  }
}

/**
 * Server Action untuk menghapus To-Do yang ada.
 * @param {any} previousState - State sebelumnya dari form.
 * @param {FormData} formData - Data dari form yang di-submit.
 * @returns {Promise<{message: string}>} - Objek yang berisi pesan status.
 */
export async function deleteTodoAction(previousState, formData) {
  // Mengambil nilai dari input field (hidden) dengan nama 'id' dan mengubahnya menjadi angka.
  const id = Number(formData.get('id'));

  try {
    // Memanggil metode `deleteTodo` dari API dengan ID yang sesuai.
    await api.deleteTodo(id);
    // Sama seperti di atas, ini adalah placeholder untuk revalidasi di Next.js.
    // revalidatePath('/todos');
    // Mengembalikan pesan sukses.
    return { message: 'To-Do berhasil dihapus.' };
  } catch (e) {
    // Jika terjadi error saat menghapus, kembalikan pesan error.
    return { message: 'Gagal menghapus To-Do.' };
  }
}
