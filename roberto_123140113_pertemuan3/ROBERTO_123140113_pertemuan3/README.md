# Rak Buku Pribadi

Aplikasi web untuk mencatat koleksi buku pribadi, dibuat dengan React dan Vite.

- Nama: Roberto
- NIM: 123140113
- Tugas: Pertemuan 3, Pengembangan Aplikasi Web

## Deskripsi Aplikasi

Rak Buku Pribadi membantu pengguna mencatat buku yang sudah dimiliki, sedang dibaca, atau ingin dibeli. Setiap buku punya judul, penulis, dan status. Data disimpan di browser lewat `localStorage`, jadi daftar buku tetap ada setelah halaman dimuat ulang.

Fitur utama:

- Tambah buku baru dengan judul, penulis, dan status (Milik, Sedang dibaca, Ingin dibeli).
- Edit dan hapus buku. Penghapusan meminta konfirmasi lebih dulu.
- Filter buku berdasarkan status.
- Cari buku berdasarkan judul atau nama penulis.
- Validasi form: judul dan penulis wajib diisi. Kolom kosong berwarna merah dan menampilkan pesan error.
- Halaman statistik yang menampilkan jumlah dan persentase buku untuk tiap status.

## Instalasi dan Cara Menjalankan

### Prasyarat

- Node.js versi 20 atau lebih baru. Cek dengan `node -v`.
- npm (terpasang bersama Node.js).

### Langkah instalasi

1. Buka terminal di folder project (folder yang berisi `package.json`).
2. Pasang semua dependensi:
   ```bash
   npm install
   ```
   Jika dependensi belum lengkap, pasang manual:
   ```bash
   npm install react-router-dom prop-types
   npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
   ```

### Menjalankan aplikasi

```bash
npm run dev
```

Buka `http://localhost:5173` di browser. Halaman statistik ada di `http://localhost:5173/stats`.

### Menjalankan test

```bash
npm test
```

Hasil yang benar: 8 test lulus.

### Build untuk produksi

```bash
npm run build
```

### Struktur folder

```
src/
├── __tests__/
│   └── app.test.jsx
├── components/
│   ├── BookForm/
│   │   ├── BookForm.jsx
│   │   └── BookForm.css
│   ├── BookList/
│   │   ├── BookList.jsx
│   │   └── BookList.css
│   └── BookFilter/
│       ├── BookFilter.jsx
│       └── BookFilter.css
├── pages/
│   ├── Home/
│   │   ├── Home.jsx
│   │   └── Home.css
│   └── Stats/
│       ├── Stats.jsx
│       └── Stats.css
├── hooks/
│   ├── useLocalStorage.js
│   └── useBookStats.js
├── context/
│   └── BookContext.jsx
├── App.jsx
├── main.jsx
├── index.css
└── setupTests.js
```

## Screenshot

Simpan gambar di folder `docs/screenshots/` dengan nama file seperti di bawah, atau ubah path-nya sesuai nama file Anda.

### Halaman Koleksi

<img width="1920" height="919" alt="image" src="https://github.com/user-attachments/assets/5c264ad0-171e-4d2d-84f0-62d372d23336" />


### Halaman Statistik

<img width="1920" height="904" alt="image" src="https://github.com/user-attachments/assets/1972be11-91e8-4840-b753-241ae2c5fa23" />


### Laporan Testing

<img width="1089" height="485" alt="image" src="https://github.com/user-attachments/assets/ce2cf6ba-c98d-413e-ba51-e74b46dcdfdd" />


## Penjelasan Fitur React yang Digunakan

### Functional components dan Hooks

Semua komponen berupa function component. State dan efek samping dikelola dengan hooks, tanpa class component.

### useState

Menyimpan state lokal yang berubah saat pengguna berinteraksi.

- `BookForm.jsx`: isi form (`form`) dan pesan error (`errors`).
- `Home.jsx`: buku yang sedang diedit (`editing`).
- `BookContext.jsx`: filter status dan kata kunci pencarian.

### useEffect

Menjalankan efek samping setelah render.

- `useLocalStorage.js`: menyimpan data ke `localStorage` setiap nilai berubah.
- `BookForm.jsx`: mengisi ulang form saat buku yang diedit berganti, dan mengosongkan error.

### useMemo

`BookContext.jsx` memakai `useMemo` untuk menghitung `filteredBooks`, dan `useBookStats.js` memakainya untuk menghitung statistik. Perhitungan hanya berjalan ulang saat datanya berubah.

### Komponen reusable

Tiga komponen menerima data dan fungsi lewat props, sehingga bisa dipakai di halaman lain.

| Komponen | Fungsi |
|---|---|
| `BookForm` | Form tambah dan edit buku, lengkap dengan validasi |
| `BookList` | Daftar buku dengan tombol Edit dan Hapus, serta tampilan saat daftar kosong |
| `BookFilter` | Kolom pencarian dan tombol filter status |

### Context API

`BookContext.jsx` menyediakan `BookProvider` dan hook `useBooks`. Daftar buku, fungsi `addBook`, `updateBook`, `deleteBook`, filter, dan pencarian tersedia untuk semua halaman tanpa perlu meneruskan props berlapis. `App.jsx` membungkus seluruh halaman dengan `BookProvider`.

### React Router

`App.jsx` mendefinisikan tiga rute dengan `Routes` dan `Route`:

- `/` menampilkan halaman Koleksi.
- `/stats` menampilkan halaman Statistik.
- `*` menampilkan pesan halaman tidak ditemukan.

Menu navigasi memakai `NavLink`, yang menandai menu aktif secara otomatis. `BrowserRouter` dipasang di `main.jsx`.

### Custom hooks

| Hook | Fungsi |
|---|---|
| `useLocalStorage(key, initialValue)` | Bekerja seperti `useState`, tetapi nilainya dibaca dari dan disimpan ke `localStorage` |
| `useBookStats(books)` | Menghitung total buku serta jumlah dan persentase per status |

### localStorage

Data buku tersimpan di key `books` lewat `useLocalStorage`. Pembacaan dan penulisan dibungkus `try/catch` agar aplikasi tetap jalan jika data rusak atau storage tidak tersedia.

### PropTypes

Setiap komponen mendefinisikan `propTypes` untuk memeriksa tipe props, termasuk bentuk objek buku (`id`, `title`, `author`, `status`) dan nilai status yang valid.

### Error handling pada form

`BookForm` memeriksa judul dan penulis sebelum data dikirim. Jika ada kolom kosong, form tidak terkirim, kolom berwarna merah, dan pesan error muncul di bawahnya. Pesan hilang saat pengguna mulai mengetik di kolom tersebut.

### Unit test

`src/__tests__/app.test.jsx` berisi 8 test dengan Vitest dan React Testing Library:

1. `useLocalStorage` menyimpan nilai ke `localStorage`.
2. `useBookStats` menghitung jumlah dan persentase.
3. `BookForm` menampilkan error saat kolom kosong.
4. `BookForm` mengirim data yang valid.
5. `BookList` menampilkan daftar buku dan tampilan kosong.
6. `BookList` memanggil `onEdit` dengan buku yang dipilih.
7. `BookFilter` memanggil callback saat status dipilih.
8. Integrasi: menambah buku lalu mencarinya berdasarkan nama penulis.

## Teknologi

- React 19
- Vite
- React Router
- PropTypes
- Vitest dan React Testing Library
