// Menandakan ini adalah Komponen Klien.
'use client';

// Mengimpor hook `useActionState` dari React, yang digunakan untuk mengelola state dari form actions.
import { useActionState } from 'react';
// Mengimpor Server Action `createTodoAction` yang akan dipanggil saat form di-submit.
import { createTodoAction } from '../actions';
// Mengimpor komponen tombol submit khusus yang sadar akan status form.
import { SubmitButton } from './SubmitButton';
// Mengimpor komponen Input UI.
import { Input } from '@/components/ui/Input';
// Mengimpor hook `useEffect` dan `useRef` dari React.
import { useEffect, useRef } from 'react';

// Mendefinisikan state awal untuk `useActionState`.
const initialState = {
  message: null, // Awalnya tidak ada pesan status.
};

// Komponen form untuk menambahkan To-Do baru.
// Menerima prop `onAddOptimistic` untuk memicu pembaruan UI sementara.
export function AddTodoForm({ onAddOptimistic }) {
  // `useActionState` mengembalikan state saat ini dan fungsi untuk memanggil action.
  // `state` akan berisi nilai yang dikembalikan oleh `createTodoAction` (misalnya, { message: '...' }).
  // `formAction` adalah fungsi yang akan dipicu oleh form.
  const [state, formAction] = useActionState(createTodoAction, initialState);
  
  // `useRef` digunakan untuk mendapatkan referensi langsung ke elemen DOM form.
  const formRef = useRef(null);

  // `useEffect` digunakan untuk menjalankan "side effect" setelah render.
  // Dalam kasus ini, kita ingin mereset form setelah To-Do berhasil ditambahkan.
  useEffect(() => {
    // Jika ada pesan status dan pesan tersebut mengandung kata 'berhasil',
    if (state.message && state.message.includes('berhasil')) {
      // panggil metode `reset()` pada elemen form.
      formRef.current?.reset();
    }
  }, [state]); // Efek ini hanya akan berjalan kembali jika `state` berubah.

  // Fungsi pembungkus untuk `formAction` agar bisa melakukan optimistic update.
  const handleFormAction = (formData) => {
    // Mengambil judul dari data form.
    const title = formData.get('title');
    // Memanggil fungsi `onAddOptimistic` dari komponen induk dengan data To-Do sementara.
    // Ini akan memperbarui UI secara instan, sebelum server merespons.
    onAddOptimistic({ id: 'temp-id', title });
    // Memanggil Server Action yang sebenarnya untuk memproses data di server.
    formAction(formData);
  };

  return (
    // Elemen form. `ref` dihubungkan ke `formRef`.
    // `action` dihubungkan ke `handleFormAction` yang kita buat.
    <form ref={formRef} action={handleFormAction} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
      {/* Input field untuk judul To-Do. `name="title"` penting agar `formData.get('title')` berfungsi. */}
      <Input type="text" name="title" placeholder="Apa yang ingin kamu lakukan?" required />
      {/* Tombol submit kustom. */}
      <SubmitButton>Tambah</SubmitButton>
      {/* Menampilkan pesan status dari Server Action jika ada. */}
      {state?.message && <p style={{ marginLeft: '8px', alignSelf: 'center', margin: 0 }}>{state.message}</p>}
    </form>
  );
}
