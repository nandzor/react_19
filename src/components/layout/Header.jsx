// Mengimpor library React untuk dapat menggunakan JSX dan fitur React lainnya.
import React from 'react';

// Mendefinisikan objek gaya untuk komponen Header.
// Ini adalah pendekatan "CSS-in-JS" sederhana.
const headerStyle = {
  backgroundColor: '#20232a', // Warna latar belakang gelap, khas tema React.
  color: '#61dafb',          // Warna teks biru muda, warna logo React.
  padding: '20px',            // Padding di dalam header.
  textAlign: 'center',        // Pusatkan teks di dalam header.
  fontSize: '24px',           // Ukuran font untuk judul.
  marginBottom: '20px',       // Margin di bawah header untuk memberi jarak.
};

// Mendefinisikan dan mengekspor komponen fungsional Header.
// `export` memungkinkan komponen ini diimpor dan digunakan di file lain.
export function Header() {
  // Komponen ini merender elemen <header> HTML.
  return (
    // Menerapkan gaya yang telah didefinisikan ke elemen header.
    <header style={headerStyle}>
      {/* Judul utama aplikasi. */}
      <h1>React 19</h1>
    </header>
  );
}
