// Mengimpor objek 'api' dari lapisan abstraksi API.
import { api } from '@/lib/api';

/**
 * Fungsi untuk mengambil semua data To-Do.
 * Fungsi ini bertindak sebagai perantara antara komponen UI (melalui React Query)
 * dan implementasi API yang sebenarnya.
 * Ini adalah praktik yang baik untuk memisahkan logika pengambilan data dari detail implementasi API.
 * @returns {Promise<Array<object>>} - Sebuah promise yang akan resolve dengan array objek To-Do.
 */
export async function getTodos() {
  // Memanggil metode `getTodos` dari objek api dan mengembalikan hasilnya.
  return api.getTodos();
}
