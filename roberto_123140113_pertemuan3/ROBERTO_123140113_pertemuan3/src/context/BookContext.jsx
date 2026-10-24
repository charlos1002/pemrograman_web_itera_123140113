import { createContext, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../hooks/useLocalStorage.js';

const BookContext = createContext(null);

// Provider menyimpan seluruh state global: daftar buku, filter, dan kata kunci pencarian
export function BookProvider({ children }) {
  const [books, setBooks] = useLocalStorage('books', []); // persisten
  const [statusFilter, setStatusFilter] = useState('semua');
  const [query, setQuery] = useState('');

  const addBook = (data) =>
    setBooks((prev) => [...prev, { ...data, id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}` }]);

  const updateBook = (id, data) =>
    setBooks((prev) => prev.map((b) => (b.id === id ? { ...b, ...data } : b)));

  const deleteBook = (id) => setBooks((prev) => prev.filter((b) => b.id !== id));

  // Gabungan filter status + pencarian judul/penulis (tidak peka huruf besar-kecil)
  const filteredBooks = useMemo(() => {
    const q = query.trim().toLowerCase();
    return books.filter((b) => {
      const okStatus = statusFilter === 'semua' || b.status === statusFilter;
      const okQuery = !q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q);
      return okStatus && okQuery;
    });
  }, [books, statusFilter, query]);

  const value = {
    books, filteredBooks, addBook, updateBook, deleteBook,
    statusFilter, setStatusFilter, query, setQuery,
  };
  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

BookProvider.propTypes = { children: PropTypes.node.isRequired };

// Hook akses context dengan pengaman jika dipakai di luar Provider
export function useBooks() {
  const ctx = useContext(BookContext);
  if (!ctx) throw new Error('useBooks harus dipakai di dalam BookProvider');
  return ctx;
}
