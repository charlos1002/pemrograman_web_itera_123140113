# Aplikasi Kasir Sederhana

**Nama** : Roberto Charlos Sagala
**NIM** : 123140113
**Kelas** : Praktikum Pengembangan Aplikasi Web - RB

## Deskripsi Aplikasi

Aplikasi web kasir sederhana untuk mencatat belanja pelanggan. Kasir memasukkan nama barang, harga satuan, dan jumlah; sistem memvalidasi input, menampilkannya di tabel keranjang, lalu menghitung subtotal, total belanja, diskon, total akhir, dan kembalian secara otomatis. Isi keranjang disimpan di `localStorage` sehingga tidak hilang saat halaman di-refresh. Dibuat dengan HTML, CSS, dan JavaScript murni tanpa framework.

## Panduan Menjalankan

1. Unduh repositori GitHub ini sebagai ZIP (**Code → Download ZIP**) atau clone dengan perintah:
   ```bash
   git clone https://github.com/<username>/<nama-repo>.git
   ```
2. Jika mengunduh ZIP, ekstrak file terlebih dahulu.
3. Buka folder hasil ekstrak/clone, lalu buka file `index.html` di browser lokal (klik dua kali, atau klik kanan → *Open with* → browser).
4. Aplikasi siap dipakai, tidak perlu instalasi atau server.

## Daftar Fitur

**Validasi form**
- [x] Nama barang wajib diisi, minimal 3 karakter
- [x] Harga satuan wajib angka positif, minimal Rp 500
- [x] Qty wajib bilangan bulat, minimal 1
- [x] Pesan error merah di bawah input yang salah
- [x] Barang tidak masuk keranjang jika ada input tidak valid
- [x] Form otomatis di-reset setelah barang berhasil ditambahkan

**Kalkulator keuangan**
- [x] Subtotal per baris (harga × qty)
- [x] Total belanja otomatis
- [x] Diskon 10% otomatis jika total ≥ Rp 50.000
- [x] Kode promo `HEMAT10`
- [x] Tampilan nominal diskon dan total akhir
- [x] Input uang bayar dan kembalian otomatis
- [x] Pesan "uang belum mencukupi" jika bayar kurang

**Keranjang dan localStorage**
- [x] Tabel keranjang (No, Nama Barang, Harga Satuan, Qty, Subtotal, Aksi)
- [x] Tombol Hapus per item dengan perhitungan ulang otomatis
- [x] Keranjang tersimpan di `localStorage` (`JSON.stringify` / `JSON.parse`)
- [x] Keranjang dimuat ulang saat halaman di-refresh
- [x] Tombol Transaksi Baru untuk mengosongkan keranjang dan `localStorage`

## Screenshot

<!-- Letakkan screenshot di folder screenshots/ lalu ganti placeholder di bawah -->

**Tampilan utama**

&nbsp;
<img width="1920" height="922" alt="Screenshot 2026-10-19 180314" src="https://github.com/user-attachments/assets/ee8c9345-b3c5-489a-8742-b380b07ca102" />

&nbsp;

**Validasi form (pesan error)**

&nbsp;
<img width="426" height="560" alt="Screenshot 2026-10-19 181954" src="https://github.com/user-attachments/assets/5a3e6557-833e-4138-8e73-9ca93b8bd772" />

&nbsp;

**Keranjang, diskon, dan kembalian**

&nbsp;
<img width="432" height="621" alt="Screenshot 2026-10-19 180326" src="https://github.com/user-attachments/assets/d8b53bdd-bf08-4c97-b26f-de6ae496ff29" />

&nbsp;

## Penjelasan Teknis Singkat

**Penanganan validasi input.** Setiap field punya fungsi validasi sendiri (`validasiNama`, `validasiHarga`, `validasiQty`). Nilai dibaca sebagai string, di-`trim()`, lalu dicek berurutan: kosong, bukan angka (`Number.isNaN`), lalu aturan batas (harga ≥ 500, qty bilangan bulat lewat `Number.isInteger` dan ≥ 1). Jika gagal, fungsi mengisi pesan di elemen `<p class="error">` di bawah input dan memberi kelas `invalid`. Saat submit, ketiga validasi dijalankan sekaligus supaya semua pesan tampil bersamaan; jika ada yang gagal, fungsi berhenti sebelum `push` ke keranjang. Jika lolos, barang ditambahkan dan `form.reset()` dipanggil.

**Algoritma kalkulator keuangan.** Fungsi `hitung()` menjumlahkan `harga × qty` setiap item dengan `reduce()` untuk mendapat total belanja. Diskon 10% diberikan jika total ≥ Rp 50.000 atau kode `HEMAT10` aktif (tidak ditumpuk, maksimal 10%). Total akhir = total − diskon. Kembalian = uang bayar − total akhir; jika uang bayar lebih kecil, ditampilkan kekurangannya. Setiap perubahan (tambah, hapus, kupon, input bayar) memanggil fungsi render sehingga angka selalu terhitung ulang.

**Mekanisme serialisasi localStorage.** Array `keranjang` berisi objek `{id, nama, harga, qty}`. Setelah setiap perubahan, `simpan()` mengubah array menjadi teks dengan `JSON.stringify()` dan menyimpannya di kunci `kasir_keranjang`. Saat halaman dibuka, `muat()` membaca teks tersebut dan mengembalikannya ke array dengan `JSON.parse()` di dalam `try/catch`, sehingga data rusak atau kosong tidak membuat aplikasi error. Tombol Transaksi Baru memanggil `localStorage.removeItem()` dan mengosongkan state.
