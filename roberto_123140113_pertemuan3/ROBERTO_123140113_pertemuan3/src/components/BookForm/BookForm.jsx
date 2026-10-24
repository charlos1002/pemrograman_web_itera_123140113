import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './BookForm.css';

const EMPTY = { title: '', author: '', status: 'beli' };

// Form tambah/edit buku. Jika initialBook ada, form berjalan dalam mode edit.
export default function BookForm({ onSubmit, initialBook = null, onCancel = () => {} }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  // Isi ulang form saat buku yang diedit berganti
  useEffect(() => {
    setForm(initialBook ? { title: initialBook.title, author: initialBook.author, status: initialBook.status } : EMPTY);
    setErrors({});
  }, [initialBook]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' })); // hapus error saat user mengetik
  };

  // Validasi kolom wajib isi
  const validate = () => {
    const next = {};
    if (!form.title.trim()) next.title = 'Judul buku wajib diisi.';
    if (!form.author.trim()) next.author = 'Nama penulis wajib diisi.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ title: form.title.trim(), author: form.author.trim(), status: form.status });
    if (!initialBook) setForm(EMPTY);
  };

  return (
    <form className="book-form" onSubmit={handleSubmit} noValidate>
      <h2>{initialBook ? 'Edit buku' : 'Tambah buku'}</h2>

      <label htmlFor="title">Judul</label>
      <input id="title" name="title" value={form.title} onChange={handleChange}
        className={errors.title ? 'invalid' : ''} aria-invalid={Boolean(errors.title)} />
      {errors.title && <p className="field-error" role="alert">{errors.title}</p>}

      <label htmlFor="author">Penulis</label>
      <input id="author" name="author" value={form.author} onChange={handleChange}
        className={errors.author ? 'invalid' : ''} aria-invalid={Boolean(errors.author)} />
      {errors.author && <p className="field-error" role="alert">{errors.author}</p>}

      <label htmlFor="status">Status</label>
      <select id="status" name="status" value={form.status} onChange={handleChange}>
        <option value="milik">Milik</option>
        <option value="baca">Sedang dibaca</option>
        <option value="beli">Ingin dibeli</option>
      </select>

      <div className="form-actions">
        <button type="submit" className="btn">{initialBook ? 'Simpan perubahan' : 'Tambah buku'}</button>
        {initialBook && <button type="button" className="btn secondary" onClick={onCancel}>Batal</button>}
      </div>
    </form>
  );
}

BookForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialBook: PropTypes.shape({
    id: PropTypes.string, title: PropTypes.string, author: PropTypes.string, status: PropTypes.string,
  }),
  onCancel: PropTypes.func,
};
