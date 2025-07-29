// Mengimpor library React.
import React from 'react';

// Komponen Button yang menggunakan Tailwind CSS untuk styling
export function Button({ children, className, ...props }) {
  return (
    <button className={`btn ${className}`} {...props}>
      {children}
    </button>
  );
}
