// Mengimpor library React untuk dapat menggunakan JSX dan fitur React lainnya.
import React from 'react';

// Mendefinisikan objek gaya untuk komponen Header.
// Ini adalah pendekatan "CSS-in-JS" sederhana.
export function Header() {
  return (
    <header className="bg-dark text-white text-center p-3 mb-4">
      <h1>React 19</h1>
    </header>
  );
}
