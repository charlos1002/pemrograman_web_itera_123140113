import { useBooks } from '../../context/BookContext.jsx';
import useBookStats from '../../hooks/useBookStats.js';
import './Stats.css';

// Halaman statistik: ringkasan jumlah buku per status
export default function Stats() {
  const { books } = useBooks();
  const stats = useBookStats(books);
  const rows = [
    { key: 'milik', label: 'Milik' },
    { key: 'baca', label: 'Sedang dibaca' },
    { key: 'beli', label: 'Ingin dibeli' },
  ];
  return (
    <section className="stats">
      <h2>Total koleksi: {stats.total} buku</h2>
      {rows.map((r) => (
        <div key={r.key} className="stat-row">
          <span>{r.label}</span>
          <div className="bar"><div className={`fill status-bg-${r.key}`} style={{ width: `${stats.percent[r.key]}%` }} /></div>
          <span>{stats[r.key]} ({stats.percent[r.key]}%)</span>
        </div>
      ))}
    </section>
  );
}
