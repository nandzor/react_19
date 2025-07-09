// Menandakan bahwa file ini adalah Komponen Klien (Client Component).
// Komponen Klien dapat menggunakan state, lifecycle effects, dan event listener,
// serta berinteraksi dengan browser.
'use client';

// Mengimpor komponen Header dari direktori komponen layout.
import { Header } from '@/components/layout/Header';
// Mengimpor komponen TodoList dari direktori fitur todos.
import { TodoList } from '@/features/todos/components/TodoList';

// Mendefinisikan gaya (styling) untuk container utama halaman.
// Ini adalah objek JavaScript yang akan digunakan sebagai inline style.
const pageContainerStyle = {
  maxWidth: '768px',      // Lebar maksimum container.
  margin: '0 auto',       // Pusatkan container secara horizontal.
  padding: '0 16px',      // Beri padding di sisi kiri dan kanan.
  fontFamily: 'sans-serif', // Atur jenis font default.
}

// Komponen utama untuk halaman To-Do.
// `export default` membuatnya menjadi ekspor utama dari file ini.
export default function TodoPage() {
  // Fungsi `render` dari komponen.
  return (
    // Menggunakan elemen <main> sebagai container utama konten halaman.
    // Menerapkan gaya yang telah didefinisikan sebelumnya.
    <main style={pageContainerStyle}>
      {/* Merender komponen Header di bagian atas halaman. */}
      <Header />
      {/* Merender komponen TodoList yang akan menampilkan daftar tugas. */}
      <TodoList />
    </main>
  );
}
