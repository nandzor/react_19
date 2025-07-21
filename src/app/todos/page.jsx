// Menandakan bahwa file ini adalah Komponen Klien (Client Component).
// Komponen Klien dapat menggunakan state, lifecycle effects, dan event listener,
// serta berinteraksi dengan browser.
'use client';

// Mengimpor komponen Header dari direktori komponen layout.
// Mengimpor komponen TodoList dari direktori fitur todos.
// Mengimpor komponen Header dari direktori komponen layout.
import { Header } from '@/components/layout/Header';
// Mengimpor komponen TodoList dari direktori fitur todos.
import { TodoList } from '@/features/todos/components/TodoList';

// Mendefinisikan gaya (styling) untuk container utama halaman.
// Ini adalah objek JavaScript yang akan digunakan sebagai inline style.
export default function TodoPage() {
  return (
    <main className="container mt-4">
      <Header />
      <TodoList />
    </main>
  );
}
