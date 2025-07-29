// Mengimpor library React untuk dapat menggunakan JSX dan fitur React lainnya.
import React from 'react';

// Komponen Header yang menggunakan Tailwind CSS untuk styling
export function Header() {
  return (
    <header className="bg-gray-900 text-white text-center p-3 mb-4">
      <h1>React 19</h1>
    </header>
  );
}
