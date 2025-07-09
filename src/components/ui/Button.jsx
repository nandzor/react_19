// Mengimpor library React.
import React from 'react';

// Komentar ini memberikan saran kepada developer untuk mengganti styling inline
// dengan solusi yang lebih scalable seperti CSS Modules atau Tailwind CSS.
// Ganti dengan library styling favorit Anda (CSS Modules, Tailwind, etc.)

// Mendefinisikan gaya dasar untuk tombol.
export function Button({ children, className, ...props }) {
  return (
    <button className={`btn ${className}`} {...props}>
      {children}
    </button>
  );
}
