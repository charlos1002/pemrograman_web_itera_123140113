# Tugas Sistem Manajemen Perpustakaan (OOP Python)

## Identitas Mahasiswa

| | |
|---|---|
| **Nama Lengkap** | Roberto Charlos Sagala |
| **NIM** | 123140113 |
| **Kelas Praktikum** | RB |

## Deskripsi Program

Program ini adalah sistem perpustakaan sederhana berbasis terminal yang ada di folder `tugas_perpustakaan/`.

**Alur program** (`main.py`):
1. Membuat objek `Library`, lalu menambahkan beberapa `Book` dan `Magazine`.
2. Menampilkan katalog item yang tersedia.
3. Mencari item berdasarkan id atau judul.
4. Seorang `Member` meminjam item, lalu status ketersediaan berubah dan item tersebut hilang dari katalog.
5. Item dikembalikan dan denda keterlambatan dihitung.

**Penerapan 4 pilar OOP:**

- **Class** — `LibraryItem`, `Book`, `Magazine`, `Library`, dan `Member` masing-masing membungkus data dan perilaku sendiri. `main.py` membuat objek dari class-class tersebut.
- **Inheritance** — `Book` dan `Magazine` mewarisi `LibraryItem(ABC)` sehingga atribut dan method umum (`item_id`, `judul`, `pinjam()`, `kembalikan()`) tidak ditulis ulang. `LibraryItem` adalah abstract class yang tidak bisa diinstansiasi langsung.
- **Encapsulation** — `_judul` dan `_item_id` bersifat *protected*, sedangkan `__is_dipinjam` (di `LibraryItem`), `__koleksi` (di `Library`), dan `__item_dipinjam` (di `Member`) bersifat *private*. Data diakses lewat `@property` seperti `is_dipinjam`, dan hanya bisa diubah lewat method `pinjam()` / `kembalikan()`.
- **Polymorphism** — Abstract method `get_detail()` dan `hitung_denda()` diimplementasikan berbeda oleh `Book` dan `Magazine`. `Library.tampilkan_katalog()` cukup memanggil `item.get_detail()` tanpa peduli jenis itemnya.

## Struktur Folder

```
latihan/               # latihan konsep OOP
tugas_perpustakaan/
├── library_item.py    # LibraryItem (abstract), Book, Magazine
├── member.py          # Member
├── library.py         # Library
├── main.py            # skrip pengujian otomatis
└── menu.py            # aplikasi interaktif berbasis menu
```

## Panduan Menjalankan Program

Pastikan Python 3 sudah terpasang, lalu jalankan:

```bash
cd tugas_perpustakaan
python main.py
```

Untuk memakai aplikasi secara interaktif lewat menu:

```bash
python menu.py
```

Menu: 1) Tambah item, 2) Tampilkan katalog, 3) Cari item, 4) Pinjam item, 5) Kembalikan item, 6) Keluar. Data hanya tersimpan di memori selama program berjalan.

## Screenshot Output

### Penambahan Item
<!-- Tempel screenshot di bawah ini -->


### Menampilkan Katalog
<!-- Tempel screenshot di bawah ini -->


### Pencarian Item
<!-- Tempel screenshot di bawah ini -->


### Status Ketersediaan (Peminjaman & Pengembalian)
<!-- Tempel screenshot di bawah ini -->

