
'use server';

import { api } from '@/lib/api';
import { revalidatePath } from 'next/cache'; // Konsep revalidasi

// Action untuk membuat To-Do
export async function createTodoAction(previousState, formData) {
  const title = formData.get('title');
  
  if (!title || title.trim().length < 3) {
    return { message: 'Judul harus lebih dari 3 karakter.' };
  }

  try {
    await api.addTodo(title);
    // Di Next.js, ini akan memicu pengambilan data ulang di halaman.
    // Di app kita, kita akan mengandalkan invalidasi cache dari React Query.
    // revalidatePath('/todos'); 
    return { message: `To-Do "${title}" berhasil ditambahkan.` };
  } catch (e) {
    return { message: 'Gagal menambahkan To-Do.' };
  }
}

// Action untuk menghapus To-Do
export async function deleteTodoAction(previousState, formData) {
    const id = Number(formData.get('id'));

    try {
        await api.deleteTodo(id);
        // revalidatePath('/todos');
        return { message: 'To-Do berhasil dihapus.' };
    } catch (e) {
        return { message: 'Gagal menghapus To-Do.' };
    }
}
