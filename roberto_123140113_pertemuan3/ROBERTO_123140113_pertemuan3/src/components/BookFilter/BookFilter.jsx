import PropTypes from 'prop-types';
import './BookFilter.css';

const OPTIONS = [
  { value: 'semua', label: 'Semua' },
  { value: 'milik', label: 'Milik' },
  { value: 'baca', label: 'Sedang dibaca' },
  { value: 'beli', label: 'Ingin dibeli' },
];

// Komponen controlled: pencarian teks + tombol filter status
export default function BookFilter({ status, query, onStatusChange, onQueryChange }) {
  return (
    <div className="book-filter">
      <input type="search" placeholder="Cari judul atau penulis" aria-label="Cari buku"
        value={query} onChange={(e) => onQueryChange(e.target.value)} />
      <div className="filter-buttons" role="group" aria-label="Filter status">
        {OPTIONS.map((o) => (
          <button key={o.value} type="button" aria-pressed={status === o.value}
            className={status === o.value ? 'active' : ''} onClick={() => onStatusChange(o.value)}>
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

BookFilter.propTypes = {
  status: PropTypes.oneOf(['semua', 'milik', 'baca', 'beli']).isRequired,
  query: PropTypes.string.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onQueryChange: PropTypes.func.isRequired,
};
