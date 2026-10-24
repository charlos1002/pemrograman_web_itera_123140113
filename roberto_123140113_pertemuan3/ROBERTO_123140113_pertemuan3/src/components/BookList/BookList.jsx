import PropTypes from 'prop-types';
import './BookList.css';

const LABEL = { milik: 'Milik', baca: 'Sedang dibaca', beli: 'Ingin dibeli' };

const bookShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['milik', 'baca', 'beli']).isRequired,
});

// Satu baris buku. Warna sisi kiri (seperti punggung buku) mengikuti status.
function BookItem({ book, onEdit, onDelete }) {
  return (
    <li className={`book-item status-${book.status}`}>
      <div>
        <strong>{book.title}</strong>
        <p>{book.author}</p>
        <span className="badge">{LABEL[book.status]}</span>
      </div>
      <div className="item-actions">
        <button className="btn secondary small" onClick={() => onEdit(book)}>Edit</button>
        <button className="btn danger small" onClick={() => onDelete(book)}>Hapus</button>
      </div>
    </li>
  );
}
BookItem.propTypes = { book: bookShape.isRequired, onEdit: PropTypes.func.isRequired, onDelete: PropTypes.func.isRequired };

export default function BookList({ books, onEdit, onDelete }) {
  // Empty state: arahkan user ke aksi berikutnya
  if (books.length === 0) {
    return <p className="empty">Belum ada buku yang cocok. Tambahkan buku lewat form atau ubah filter.</p>;
  }
  return (
    <ul className="book-list">
      {books.map((b) => <BookItem key={b.id} book={b} onEdit={onEdit} onDelete={onDelete} />)}
    </ul>
  );
}

BookList.propTypes = {
  books: PropTypes.arrayOf(bookShape).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
