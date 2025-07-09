// Mengimpor library React.
import React from 'react';

// Mendefinisikan gaya untuk elemen spinner.
const spinnerStyle = {
  // Border abu-abu transparan sebagai dasar lingkaran.
  border: '4px solid rgba(0, 0, 0, 0.1)',
  width: '36px',        // Lebar spinner.
  height: '36px',       // Tinggi spinner.
  borderRadius: '50%',  // Membuat elemen menjadi lingkaran sempurna.
  // Warna pada salah satu sisi border untuk menciptakan efek berputar.
  borderLeftColor: '#09f',
  // Menerapkan animasi 'spin' yang didefinisikan di bawah.
  // Animasi berjalan selama 1 detik, dengan timing 'ease', dan berulang tanpa henti (infinite).
  animation: 'spin 1s ease infinite',
};

// Mendefinisikan animasi 'spin' menggunakan CSS keyframes dalam bentuk string.
// Ini adalah cara untuk menyertakan CSS dinamis atau keyframes langsung di dalam komponen React.
const keyframes = `
@keyframes spin {
  /* Pada awal animasi (0%), tidak ada rotasi. */
  0% {
    transform: rotate(0deg);
  }
  /* Pada akhir animasi (100%), elemen telah berputar 360 derajat. */
  100% {
    transform: rotate(360deg);
  }
}
`;

// Komponen Spinner untuk menunjukkan status loading.
export function Spinner() {
  return (
    // Menggunakan React Fragment (<>) untuk mengelompokkan elemen tanpa menambahkan node tambahan ke DOM.
    <>
      {/* Tag <style> digunakan untuk menyuntikkan definisi keyframes ke dalam dokumen. */}
      {/* Browser akan membaca ini dan memahami animasi 'spin'. */}
      <style>{keyframes}</style>
      {/* Elemen div yang sebenarnya akan menjadi spinner visual, dengan gaya yang telah didefinisikan. */}
      <div style={spinnerStyle}></div>
    </>
  );
}
