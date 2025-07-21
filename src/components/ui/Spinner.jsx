// Mengimpor library React.
import React from 'react';

// Mendefinisikan gaya untuk elemen spinner.
export function Spinner() {
  return (
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}
