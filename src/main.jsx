// Menandakan bahwa file ini, sebagai titik masuk utama, beroperasi di sisi klien.
'use client';

// Mengimpor library React dan ReactDOM.
import React from 'react';
import ReactDOM from 'react-dom/client';
// Mengimpor komponen dari @tanstack/react-query untuk menyediakan konteks query ke seluruh aplikasi.
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// Mengimpor komponen halaman utama aplikasi.
import TodoPage from '@/app/todos/page';

// Membuat instance dari QueryClient.
// QueryClient bertanggung jawab untuk mengelola cache dari semua query (permintaan data) di aplikasi.
const queryClient = new QueryClient();

// Komponen root aplikasi, bernama App.
function App() {
  return (
    // QueryClientProvider adalah komponen konteks dari React Query.
    // Semua komponen di dalamnya (seperti TodoPage dan anak-anaknya) akan memiliki akses
    // ke query client dan cache-nya, memungkinkan mereka untuk menggunakan hook seperti `useQuery`.
    <QueryClientProvider client={queryClient}>
      {/* Merender komponen halaman utama To-Do. */}
      <TodoPage />
    </QueryClientProvider>
  );
}

// Membuat "root" untuk aplikasi React.
// Ini adalah titik di mana aplikasi React akan "dipasang" ke dalam DOM HTML.
// `document.getElementById('root')` menunjuk ke sebuah elemen <div id="root"></div> di file index.html.
const root = ReactDOM.createRoot(document.getElementById('root'));

// Merender komponen App ke dalam root.
root.render(
  // React.StrictMode adalah komponen pembantu yang menyoroti potensi masalah dalam aplikasi.
  // Ini tidak merender UI apa pun dan hanya aktif dalam mode development.
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
