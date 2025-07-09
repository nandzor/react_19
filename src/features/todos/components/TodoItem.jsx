// Menandakan ini adalah Komponen Klien.
'use client';

// Mengimpor hook `useActionState` untuk mengelola state dari form action penghapusan.
import { useActionState } from 'react';
// Mengimpor Server Action `deleteTodoAction`.
import { deleteTodoAction } from '../actions';
// Mengimpor komponen tombol submit.
import { SubmitButton } from './SubmitButton';

// State awal untuk action penghapusan.
const initialState = { message: null };

// Komponen untuk menampilkan satu item To-Do.
// Menerima `todo` (objek To-Do) dan `onRemoveOptimistic` (fungsi callback) sebagai props.
export function TodoItem({ todo, onRemoveOptimistic }) {
  // Menggunakan `useActionState` untuk action penghapusan.
  // `state` akan berisi respons dari `deleteTodoAction`.
  // `formAction` adalah fungsi yang akan dipanggil oleh form.
  const [state, formAction] = useActionState(deleteTodoAction, initialState);

  // Fungsi pembungkus untuk `formAction` agar bisa melakukan optimistic update.
  const handleDelete = (formData) => {
    // Memanggil `onRemoveOptimistic` dengan ID To-Do yang akan dihapus.
    // Ini akan menghapus item dari UI secara instan.
    onRemoveOptimistic(todo.id);
    // Menjalankan Server Action yang sebenarnya untuk menghapus data di server.
    formAction(formData);
  };

  // Gaya untuk elemen <li>.
  return (
    <li className={`list-group-item d-flex justify-content-between align-items-center ${todo.pending ? 'opacity-50' : ''}`}>
      <span className={todo.completed ? 'text-decoration-line-through' : ''}>{todo.title} {todo.pending && '(Menyimpan...)'}</span>
      
      <form action={handleDelete}>
        <input type="hidden" name="id" value={todo.id} />
        <SubmitButton className="btn-danger btn-sm">Hapus</SubmitButton>
      </form>
    </li>
  );
}
