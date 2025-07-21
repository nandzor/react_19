// Menandakan ini adalah Komponen Klien.
'use client';

// Mengimpor hook dari @tanstack/react-query untuk fetching data dan manajemen cache.
import { useQuery, useQueryClient } from '@tanstack/react-query';
// Mengimpor fungsi untuk mengambil data To-Do.
import { getTodos } from '../data';
// Mengimpor hook `useOptimistic` dari React untuk pembaruan UI yang instan.
import { useOptimistic } from 'react';
// Mengimpor komponen-komponen anak.
import { TodoItem } from './TodoItem';
import { AddTodoForm } from './AddTodoForm';
import { Spinner } from '@/components/ui/Spinner';

// Komponen utama yang menampilkan daftar To-Do.
export function TodoList() {
  // Mendapatkan instance query client, digunakan untuk berinteraksi dengan cache React Query.
  const queryClient = useQueryClient();

  // `useQuery` adalah hook dari React Query untuk mengambil dan menyimpan data dari server.
  const { data: todos, isLoading, isError } = useQuery({
    queryKey: ['todos'], // Kunci unik untuk query ini. Digunakan untuk caching.
    queryFn: getTodos,   // Fungsi yang akan dijalankan untuk mengambil data.
  });

  // `useOptimistic` adalah hook React 19 untuk menerapkan pembaruan UI sementara.
  // `optimisticTodos` adalah state yang akan ditampilkan di UI. Awalnya sama dengan `todos`.
  // `setOptimisticTodos` adalah fungsi untuk memicu pembaruan optimis.
  const [optimisticTodos, setOptimisticTodos] = useOptimistic(
    todos, // State awal yang "nyata".
    // Fungsi reducer yang menentukan bagaimana state optimis diubah.
    (currentTodos, optimisticValue) => {
      // `optimisticValue` adalah data yang kita teruskan ke `setOptimisticTodos`.
      if (optimisticValue.type === 'add') {
        // Jika aksinya adalah 'add', tambahkan To-Do baru ke akhir daftar.
        // Tandai sebagai `pending: true` untuk memberikan umpan balik visual.
        return [...currentTodos, { ...optimisticValue.todo, pending: true }];
      }
      if (optimisticValue.type === 'remove') {
        // Jika aksinya adalah 'remove', filter daftar untuk menghapus To-Do dengan ID yang cocok.
        return currentTodos.filter(t => t.id !== optimisticValue.id);
      }
      // Jika tidak ada aksi yang cocok, kembalikan state saat ini.
      return currentTodos;
    }
  );

  // Callback yang akan dipanggil oleh `AddTodoForm` saat pengguna menambahkan item.
  const handleAddOptimistic = (todo) => {
    // Memicu pembaruan optimis untuk menambahkan item baru.
    setOptimisticTodos({ type: 'add', todo });
    // Memberitahu React Query bahwa data dengan kunci 'todos' sudah tidak valid.
    // Ini akan memicu pengambilan data ulang (refetch) di latar belakang
    // untuk memastikan UI sinkron dengan data server setelah aksi selesai.
    queryClient.invalidateQueries({ queryKey: ['todos'] });
  };

  // Callback yang akan dipanggil oleh `TodoItem` saat pengguna menghapus item.
  const handleRemoveOptimistic = (id) => {
    // Memicu pembaruan optimis untuk menghapus item.
    setOptimisticTodos({ type: 'remove', id });
    // Memvalidasi ulang cache untuk mendapatkan data terbaru dari server.
    queryClient.invalidateQueries({ queryKey: ['todos'] });
  };

  // Menampilkan spinner loading saat data sedang diambil.
  if (isLoading) return <div className="d-flex justify-content-center"><Spinner /></div>;
  if (isError) return <div className="alert alert-danger">Error: Gagal memuat data To-Do.</div>;

  return (
    <div>
      <AddTodoForm onAddOptimistic={handleAddOptimistic} />
      <ul className="list-group">
        {optimisticTodos?.map(todo => (
          <TodoItem 
            key={todo.id} 
            todo={todo} 
            onRemoveOptimistic={handleRemoveOptimistic}
          />
        ))}
      </ul>
    </div>
  );
}
