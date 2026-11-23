# Praktikum Pengembangan Aplikasi Web - Pertemuan 6
**RESTful API Manajemen Mahasiswa dan Matakuliah dengan Pyramid Framework & PostgreSQL**

## Identitas Praktikan
- **Nama:** Roberto Charlos Sagala
- **NIM:** 123140113
- **Kelas:** [Isi Kelas Praktikum Kamu]
- **Mata Kuliah:** Pengembangan Aplikasi Web

---

## Deskripsi Aplikasi
Aplikasi ini merupakan layanan backend RESTful API berbasis **Python Pyramid Framework** yang terintegrasi dengan database **PostgreSQL** menggunakan **SQLAlchemy ORM** dan **Alembic** untuk migrasi skema tabel. Aplikasi menyediakan operasi CRUD (*Create, Read, Update, Delete*) lengkap beserta validasi input dalam format JSON untuk entitas **Mahasiswa** dan **Matakuliah**.

---

## Struktur Direktori
```text
roberto_123140113_pertemuan6/
├── pyramid_mahasiswa/
│   ├── alembic/
│   │   └── versions/
│   ├── models/
│   │   ├── __init__.py
│   │   ├── meta.py
│   │   ├── mahasiswa.py
│   │   └── matakuliah.py
│   ├── scripts/
│   │   └── initialize_db.py
│   ├── views/
│   │   ├── default.py
│   │   ├── notfound.py
│   │   ├── mahasiswa.py
│   │   └── matakuliah.py
│   ├── __init__.py
│   └── routes.py
├── development.ini
├── production.ini
├── setup.py
├── .gitignore
└── README.md
```

---

## Panduan Instalasi & Menjalankan Server

1. **Aktifkan Virtual Environment & Instal Dependensi**
   ```bash
   python -m venv venv
   venv\Scripts\activate
   pip install -e .
   pip install "psycopg[binary]"
   ```

2. **Konfigurasi Database PostgreSQL**
   Pastikan layanan PostgreSQL aktif dan database `pyramid_mahasiswa` beserta kredensial user pada parameter `sqlalchemy.url` di file `development.ini` sudah sesuai.

3. **Jalankan Migrasi Database (Alembic)**
   ```bash
   alembic -c development.ini upgrade head
   ```

4. **Isi Data Awal (Seeding)**
   ```bash
   python -m pyramid_mahasiswa.scripts.initialize_db development.ini
   ```

5. **Jalankan Server Pengembangan**
   ```bash
   pserve development.ini --reload
   ```
   Server berjalan pada `http://localhost:6543`.

---

## Daftar Endpoint RESTful API

### 1. Endpoint Mahasiswa (`/api/mahasiswa`)
| Method | Endpoint | Deskripsi |
| :--- | :--- | :--- |
| `GET` | `/api/mahasiswa` | Mengambil seluruh daftar data mahasiswa |
| `GET` | `/api/mahasiswa/{id}` | Mengambil detail data mahasiswa berdasarkan ID |
| `POST` | `/api/mahasiswa` | Menambahkan data mahasiswa baru |
| `PUT` | `/api/mahasiswa/{id}` | Memperbarui data mahasiswa berdasarkan ID |
| `DELETE` | `/api/mahasiswa/{id}` | Menghapus data mahasiswa berdasarkan ID |

### 2. Endpoint Matakuliah (`/api/matakuliah`)
| Method | Endpoint | Deskripsi |
| :--- | :--- | :--- |
| `GET` | `/api/matakuliah` | Mengambil seluruh daftar data matakuliah |
| `GET` | `/api/matakuliah/{id}` | Mengambil detail data matakuliah berdasarkan ID |
| `POST` | `/api/matakuliah` | Menambahkan data matakuliah baru (validasi field wajib & integer positif) |
| `PUT` | `/api/matakuliah/{id}` | Memperbarui data matakuliah berdasarkan ID |
| `DELETE` | `/api/matakuliah/{id}` | Menghapus data matakuliah berdasarkan ID |

---

## Dokumentasi Hasil Pengujian (cURL)

### Pengujian Endpoint Mahasiswa & Matakuliah