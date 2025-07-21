// Menandakan ini adalah Komponen Klien.
'use client';

// Mengimpor hook `useFormStatus` dari `react-dom`.
// Hook ini memberikan informasi status dari form tempat komponen ini berada.
// PENTING: `useFormStatus` hanya bekerja untuk komponen yang di-render di dalam <form>.
import { useFormStatus } from 'react-dom';
// Mengimpor komponen Button UI generik.
import { Button } from '@/components/ui/Button';

// Komponen tombol submit yang secara otomatis mengetahui kapan form sedang dalam proses pengiriman.
// Menerima `children` (teks tombol) dan `className` sebagai props.
export function SubmitButton({ children, className }) {
  // Memanggil hook `useFormStatus` untuk mendapatkan status form.
  // `pending` adalah boolean yang bernilai `true` jika form sedang di-submit (menunggu respons dari Server Action),
  // dan `false` jika tidak.
  const { pending } = useFormStatus();

  return (
    // Menggunakan komponen Button UI.
    // `type="submit"` adalah atribut standar HTML untuk tombol pengirim form.
    // `disabled={pending}` akan menonaktifkan tombol saat `pending` bernilai true,
    // mencegah pengguna mengklik tombol berkali-kali.
    <Button type="submit" disabled={pending} className={className}>
      {/* Konten tombol berubah secara dinamis. */}
      {/* Jika `pending` true, tampilkan 'Menyimpan...'. */}
      {/* Jika tidak, tampilkan `children` (misalnya, 'Tambah' atau 'Hapus'). */}
      {pending ? 'Menyimpan...' : children}
    </Button>
  );
}
