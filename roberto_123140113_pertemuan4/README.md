# Tugas Pertemuan 4: Dasar Pemrograman Python

## Identitas Mahasiswa

 Nama       :  Roberto Charlos Sagala   
 NIM       :  123140113  



## Deskripsi Program

### Soal 1: Program Penghitung BMI (`tugas1_bmi.py`)

Program meminta berat badan (kg) dan tinggi badan (m) lewat `input()`. Program menolak nilai nol atau negatif, lalu menghitung BMI, menentukan kategorinya, dan mencetak hasil dengan dua angka desimal.

| Fungsi | Parameter | Nilai Kembalian | Kegunaan |
|--------|-----------|-----------------|----------|
| `hitung_bmi(berat, tinggi)` | berat (kg), tinggi (m) | `float` | Menghitung `berat / (tinggi * tinggi)` |
| `tentukan_kategori(bmi)` | nilai BMI | `str` | Menentukan kategori dengan `if-elif-else` |
| `main()` | tidak ada | tidak ada | Mengatur alur input, perhitungan, dan cetak hasil |

Kategori BMI:

| Nilai BMI | Kategori |
|-----------|----------|
| kurang dari 18.5 | Berat badan kurang |
| 18.5 sampai kurang dari 25 | Berat badan normal |
| 25 sampai kurang dari 30 | Berat badan berlebih |
| 30 atau lebih | Obesitas |

### Soal 2: Pengelolaan Data Nilai Mahasiswa (`tugas2_nilai_mahasiswa.py`)

Program menyimpan enam data mahasiswa dalam list berisi dictionary dengan kunci `nama`, `nim`, `nilai_uts`, `nilai_uas`, dan `nilai_tugas`. Program menghitung nilai akhir dan grade setiap mahasiswa, mencetak tabel, lalu menampilkan mahasiswa dengan nilai akhir tertinggi dan terendah.

Rumus nilai akhir: `(30% x UTS) + (40% x UAS) + (30% x Tugas)`

| Fungsi | Parameter | Nilai Kembalian | Kegunaan |
|--------|-----------|-----------------|----------|
| `hitung_nilai_akhir(nilai_uts, nilai_uas, nilai_tugas)` | tiga nilai | `float` | Menghitung nilai akhir berbobot |
| `tentukan_grade(nilai_akhir)` | nilai akhir | `str` | Menentukan grade A sampai E |
| `proses_data(daftar_mahasiswa)` | list dictionary | `list` | Menambahkan kunci `nilai_akhir` dan `grade` |
| `cetak_tabel(daftar_mahasiswa)` | list dictionary | tidak ada | Mencetak tabel dengan perataan f-string |
| `cetak_info_mahasiswa(judul, mhs)` | label, dictionary | tidak ada | Mencetak ringkasan satu mahasiswa |
| `main()` | tidak ada | tidak ada | Mengatur alur program, memakai `max()` dan `min()` |

Kriteria grade:

| Nilai Akhir | Grade |
|-------------|-------|
| 80 atau lebih | A |
| 70 sampai 79 | B |
| 60 sampai 69 | C |
| 50 sampai 59 | D |
| kurang dari 50 | E |

### Soal 3: Modul Matematika Python

**`math_operations.py` (modul)**

Modul menyimpan konstanta `PI = 3.14159` dan `OFFSET_KELVIN = 273.15`, serta delapan fungsi.

| Fungsi | Parameter | Nilai Kembalian |
|--------|-----------|-----------------|
| `luas_persegi(sisi)` | sisi | luas persegi |
| `keliling_persegi(sisi)` | sisi | keliling persegi |
| `luas_persegi_panjang(panjang, lebar)` | panjang, lebar | luas persegi panjang |
| `keliling_persegi_panjang(panjang, lebar)` | panjang, lebar | keliling persegi panjang |
| `luas_lingkaran(jari_jari)` | jari-jari | luas lingkaran |
| `keliling_lingkaran(jari_jari)` | jari-jari | keliling lingkaran |
| `celsius_ke_fahrenheit(celsius)` | suhu Celsius | suhu Fahrenheit |
| `celsius_ke_kelvin(celsius)` | suhu Celsius | suhu Kelvin |

**`main.py` (program utama)**

Program memanggil seluruh fungsi modul dengan beberapa nilai uji, lalu mencetak hasilnya dalam format rapi. `main.py` memakai tiga cara impor:

```python
import math_operations                      # impor seluruh modul
from math_operations import luas_lingkaran  # impor fungsi tertentu
import math_operations as mo                # impor dengan alias
```

### Tambahan: Menu Utama (`menu_utama.py`)

Menu utama menampilkan tiga pilihan: BMI, nilai mahasiswa, dan modul matematika. Anda mengetik semua angka sendiri. Setelah satu program selesai, menu menawarkan dua pilihan: kembali ke menu utama atau keluar. Program meminta ulang input yang salah, misalnya huruf saat diminta angka.

## Cara Menjalankan

Clone atau download repository ini dalam bentuk zip. letakan di satu folder, lalu jalankan dengan cmd atau terminal dengan "python main.py" atau "python menu_utama.py"  

Jika program meminta input berat dan tinggi badan. Gunakan titik atau koma untuk desimal pada menu utama, dan titik pada `tugas1_bmi.py` (contoh: `1.75`).

## Bukti Eksekusi Program


### Soal 1: Program Penghitung BMI

![Hasil eksekusi Soal 1](screenshots/soal1.png)

### Soal 2: Pengelolaan Data Nilai Mahasiswa

![Hasil eksekusi Soal 2](screenshots/soal2.png)

### Soal 3: Modul Matematika Python

![Hasil eksekusi Soal 3](screenshots/soal3.png)
