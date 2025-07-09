// Mengimpor library React.
import React from 'react';

// Komentar ini memberikan saran kepada developer untuk mengganti styling inline
// dengan solusi yang lebih scalable seperti CSS Modules atau Tailwind CSS.
// Ganti dengan library styling favorit Anda (CSS Modules, Tailwind, etc.)

// Mendefinisikan gaya dasar untuk tombol.
const buttonStyle = {
  padding: '8px 16px',      // Padding di dalam tombol.
  border: 'none',           // Hilangkan border default.
  borderRadius: '4px',      // Beri sudut yang sedikit melengkung.
  backgroundColor: '#007bff',// Warna latar biru standar.
  color: 'white',           // Warna teks putih.
  cursor: 'pointer',        // Ubah kursor menjadi tangan saat hover.
  fontSize: '14px',         // Ukuran font.
};

// Mendefinisikan gaya tambahan untuk tombol saat dalam keadaan 'disabled'.
const disabledStyle = {
  backgroundColor: '#cccccc', // Warna abu-abu untuk menunjukkan non-aktif.
  cursor: 'not-allowed',    // Kursor menunjukkan bahwa tombol tidak bisa diklik.
};

// Komponen Button yang dapat digunakan kembali.
// Menggunakan destructuring untuk mendapatkan `children` dan `props` lainnya.
// `children` adalah konten di dalam tag Button (misal: <Button>Click Me</Button>).
// `...props` mengumpulkan semua properti lain yang diberikan (misal: onClick, disabled).
export function Button({ children, ...props }) {
  // Menentukan gaya yang akan diterapkan.
  // Jika properti `disabled` bernilai true, gabungkan gaya dasar dengan gaya disabled.
  // Jika tidak, gunakan hanya gaya dasar.
  const style = props.disabled ? { ...buttonStyle, ...disabledStyle } : buttonStyle;

  // Merender elemen <button> HTML.
  // Menerapkan gaya yang sudah ditentukan.
  // Menyebarkan semua `props` lainnya ke elemen button,
  // ini memungkinkan kita meneruskan event handler seperti `onClick` atau atribut `type`.
  return (
    <button style={style} {...props}>
      {children}
    </button>
  );
}
