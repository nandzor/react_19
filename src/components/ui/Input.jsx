// Mengimpor library React.
import React from 'react';

// Mendefinisikan objek gaya untuk komponen Input.
const inputStyle = {
  padding: '8px',                   // Padding di dalam input field.
  border: '1px solid #ccc',         // Border abu-abu tipis.
  borderRadius: '4px',              // Sudut yang sedikit melengkung.
  fontSize: '14px',                 // Ukuran font.
  // Lebar diatur 100% dikurangi total padding horizontal (8px * 2 + border 1px * 2 = 18px)
  // agar pas di dalam container tanpa menyebabkan overflow.
  width: 'calc(100% - 18px)',
};

// Komponen Input yang dapat digunakan kembali.
// Menerima semua properti (props) dan meneruskannya ke elemen <input> HTML.
export function Input(props) {
  // Merender elemen <input> HTML.
  // Menerapkan gaya yang telah didefinisikan.
  // `...props` menyebarkan semua properti yang diterima (seperti `type`, `name`, `placeholder`, `value`, `onChange`)
  // ke elemen input asli.
  return <input style={inputStyle} {...props} />;
}
