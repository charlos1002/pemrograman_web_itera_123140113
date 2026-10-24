import { useState } from 'react';
import { useBooks } from '../../context/BookContext.jsx';
import BookForm from '../../components/BookForm/BookForm.jsx';
import BookFilter from '../../components/BookFilter/BookFilter.jsx';
import BookList from '../../components/BookList/BookList.jsx';
import './Home.css';

// Halaman utama: form di kiri, filter + daftar buku di kanan
export default function Home() {
  const { filteredBooks, addBook, updateBook, deleteBook, statusFilter, setStatusFilter, query, setQuery } = useBooks();
  const [editing, setEditing] = useState(null); // buku yang sedang diedit

  const handleSubmit = (data) => {
    if (editing) {
      updateBook(editing.id, data);
      setEditing(null);
    } else {
      addBook(data);
    }
  };

  const handleDelete = (book) => {
    if (window.confirm(`Hapus "${book.title}"?`)) {
      deleteBook(book.id);
      if (editing?.id === book.id) setEditing(null);
    }
  };

  return (
    <div className="home">
      <BookForm onSubmit={handleSubmit} initialBook={editing} onCancel={() => setEditing(null)} />
      <section>
        <BookFilter status={statusFilter} query={query} onStatusChange={setStatusFilter} onQueryChange={setQuery} />
        <BookList books={filteredBooks} onEdit={setEditing} onDelete={handleDelete} />
      </section>
    </div>
  );
}
