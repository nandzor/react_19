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
  const itemStyle = {
    display: 'flex',
    justifyContent: 'space-between', // Judul di kiri, tombol di kanan.
    alignItems: 'center',            // Sejajarkan item secara vertikal.
    padding: '10px',
    borderBottom: '1px solid #eee',
    // Mengatur opacity menjadi 0.5 jika item ini adalah item "optimistic" yang sedang dalam proses.
    // Ini memberikan umpan balik visual bahwa sesuatu sedang terjadi.
    opacity: todo.pending ? 0.5 : 1,
  };

  // Gaya untuk judul To-Do.
  const titleStyle = {
    // Memberi coretan pada teks jika To-Do sudah selesai (`completed: true`).
    textDecoration: todo.completed ? 'line-through' : 'none',
  };

  return (
    // Merender item dalam elemen <li>.
    <li style={itemStyle}>
      {/* Menampilkan judul To-Do. */}
      {/* Jika `todo.pending` true, tampilkan teks "(Menyimpan...)" */}
      <span style={titleStyle}>{todo.title} {todo.pending && '(Menyimpan...)'}</span>
      
      {/* Setiap item memiliki form-nya sendiri untuk aksi penghapusan. */}
      {/* Ini adalah pola umum saat menggunakan Server Actions untuk item dalam daftar. */}
      <form action={handleDelete}>
        {/* Input tersembunyi (hidden) untuk mengirim ID To-Do ke Server Action. */}
        {/* `name="id"` harus cocok dengan yang diharapkan oleh `formData.get('id')` di server. */}
        <input type="hidden" name="id" value={todo.id} />
        {/* Tombol submit untuk menghapus, dengan gaya kustom (warna merah). */}
        <SubmitButton style={{ backgroundColor: '#dc3545' }}>Hapus</SubmitButton>
      </form>
    </li>
  );
}
