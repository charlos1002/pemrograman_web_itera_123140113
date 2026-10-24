import { useMemo } from 'react';

// Custom hook #2: menghitung statistik koleksi dari daftar buku.
export default function useBookStats(books) {
  return useMemo(() => {
    const total = books.length;
    const count = (status) => books.filter((b) => b.status === status).length;
    const milik = count('milik');
    const baca = count('baca');
    const beli = count('beli');
    const percent = (n) => (total === 0 ? 0 : Math.round((n / total) * 100));
    return {
      total, milik, baca, beli,
      percent: { milik: percent(milik), baca: percent(baca), beli: percent(beli) },
    };
  }, [books]);
}
