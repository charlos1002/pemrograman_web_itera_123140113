import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, renderHook, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage.js';
import useBookStats from '../hooks/useBookStats.js';
import BookForm from '../components/BookForm/BookForm.jsx';
import BookList from '../components/BookList/BookList.jsx';
import BookFilter from '../components/BookFilter/BookFilter.jsx';
import App from '../App.jsx';

beforeEach(() => localStorage.clear());

const sample = [
  { id: '1', title: 'Laskar Pelangi', author: 'Andrea Hirata', status: 'milik' },
  { id: '2', title: 'Bumi', author: 'Tere Liye', status: 'baca' },
  { id: '3', title: 'Cantik Itu Luka', author: 'Eka Kurniawan', status: 'beli' },
];

describe('useLocalStorage', () => {
  it('menyimpan nilai ke localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('k', []));
    act(() => result.current[1]([1, 2]));
    expect(JSON.parse(localStorage.getItem('k'))).toEqual([1, 2]);
  });
});

describe('useBookStats', () => {
  it('menghitung jumlah dan persentase per status', () => {
    const { result } = renderHook(() => useBookStats(sample));
    expect(result.current.total).toBe(3);
    expect(result.current.baca).toBe(1);
    expect(result.current.percent.milik).toBe(33);
  });
});

describe('BookForm', () => {
  it('menampilkan error saat kolom kosong dan tidak memanggil onSubmit', () => {
    const onSubmit = vi.fn();
    render(<BookForm onSubmit={onSubmit} />);
    fireEvent.click(screen.getByRole('button', { name: 'Tambah buku' }));
    expect(screen.getByText('Judul buku wajib diisi.')).toBeInTheDocument();
    expect(screen.getByText('Nama penulis wajib diisi.')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('mengirim data valid', () => {
    const onSubmit = vi.fn();
    render(<BookForm onSubmit={onSubmit} />);
    fireEvent.change(screen.getByLabelText('Judul'), { target: { value: 'Bumi' } });
    fireEvent.change(screen.getByLabelText('Penulis'), { target: { value: 'Tere Liye' } });
    fireEvent.click(screen.getByRole('button', { name: 'Tambah buku' }));
    expect(onSubmit).toHaveBeenCalledWith({ title: 'Bumi', author: 'Tere Liye', status: 'beli' });
  });
});

describe('BookList', () => {
  it('menampilkan empty state dan daftar buku', () => {
    const { rerender } = render(<BookList books={[]} onEdit={() => {}} onDelete={() => {}} />);
    expect(screen.getByText(/Belum ada buku/)).toBeInTheDocument();
    rerender(<BookList books={sample} onEdit={() => {}} onDelete={() => {}} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  it('memanggil onEdit dengan buku yang dipilih', () => {
    const onEdit = vi.fn();
    render(<BookList books={sample} onEdit={onEdit} onDelete={() => {}} />);
    fireEvent.click(screen.getAllByText('Edit')[1]);
    expect(onEdit).toHaveBeenCalledWith(sample[1]);
  });
});

describe('BookFilter', () => {
  it('memanggil callback saat status dipilih', () => {
    const onStatusChange = vi.fn();
    render(<BookFilter status="semua" query="" onStatusChange={onStatusChange} onQueryChange={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: 'Milik' }));
    expect(onStatusChange).toHaveBeenCalledWith('milik');
  });
});

describe('App (integrasi)', () => {
  it('menambah buku lalu mencari berdasarkan penulis', () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    fireEvent.change(screen.getByLabelText('Judul'), { target: { value: 'Bumi' } });
    fireEvent.change(screen.getByLabelText('Penulis'), { target: { value: 'Tere Liye' } });
    fireEvent.click(screen.getByRole('button', { name: 'Tambah buku' }));
    expect(screen.getByText('Bumi')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Cari buku'), { target: { value: 'xyz' } });
    expect(screen.queryByText('Bumi')).not.toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Cari buku'), { target: { value: 'tere' } });
    expect(screen.getByText('Bumi')).toBeInTheDocument();
  });
});
