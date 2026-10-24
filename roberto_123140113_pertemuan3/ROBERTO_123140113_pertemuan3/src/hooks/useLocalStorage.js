import { useEffect, useState } from 'react';

// Custom hook #1: state yang otomatis tersimpan di localStorage.
export default function useLocalStorage(key, initialValue) {
  // Lazy initializer: localStorage hanya dibaca sekali saat pertama render
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue; // data rusak atau storage tidak tersedia
    }
  });

  // Setiap value berubah, simpan ulang ke localStorage
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* abaikan error kuota penuh */
    }
  }, [key, value]);

  return [value, setValue];
}
