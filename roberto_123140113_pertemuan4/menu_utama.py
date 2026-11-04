"""Program menu utama: menghubungkan Tugas 1, Tugas 2, dan Tugas 3."""

import math_operations as mo
from tugas1_bmi import hitung_bmi, tentukan_kategori
from tugas2_nilai_mahasiswa import (
    proses_data,
    cetak_tabel,
    cetak_info_mahasiswa,
)


def baca_angka(pesan, minimum=None, maksimum=None):
    """Minta input angka dari pengguna dan ulangi sampai valid.

    Args:
        pesan (str): Teks yang ditampilkan saat meminta input.
        minimum (float, optional): Batas bawah yang diizinkan (inklusif).
        maksimum (float, optional): Batas atas yang diizinkan (inklusif).

    Returns:
        float: Angka valid yang dimasukkan pengguna.
    """
    while True:
        teks = input(pesan).strip().replace(",", ".")
        try:
            angka = float(teks)
        except ValueError:
            print("  Input harus berupa angka. Coba lagi.")
            continue
        if minimum is not None and angka < minimum:
            print(f"  Nilai minimal {minimum}. Coba lagi.")
        elif maksimum is not None and angka > maksimum:
            print(f"  Nilai maksimal {maksimum}. Coba lagi.")
        else:
            return angka


def baca_pilihan(pesan, pilihan_valid):
    """Minta pengguna memilih satu opsi dari daftar yang valid.

    Args:
        pesan (str): Teks yang ditampilkan saat meminta input.
        pilihan_valid (list): Daftar string pilihan yang diterima.

    Returns:
        str: Pilihan valid yang dimasukkan pengguna.
    """
    while True:
        pilihan = input(pesan).strip()
        if pilihan in pilihan_valid:
            return pilihan
        print(f"  Pilihan tidak valid. Masukkan salah satu: "
              f"{', '.join(pilihan_valid)}.")


def cetak_judul(teks):
    """Cetak judul bagian dengan garis pembatas.

    Args:
        teks (str): Teks judul yang ditampilkan.

    Returns:
        None: Fungsi hanya mencetak ke layar.
    """
    print()
    print("=" * 50)
    print(teks.center(50))
    print("=" * 50)


def jalankan_bmi():
    """Jalankan Tugas 1: hitung BMI dari berat dan tinggi input pengguna."""
    cetak_judul("PENGHITUNG BMI")
    berat = baca_angka("Masukkan berat badan (kg) : ", minimum=1)
    tinggi = baca_angka("Masukkan tinggi badan (m) : ", minimum=0.1)

    bmi = hitung_bmi(berat, tinggi)
    kategori = tentukan_kategori(bmi)

    print("\n--- Hasil ---")
    print(f"Berat badan : {berat:.1f} kg")
    print(f"Tinggi badan: {tinggi:.2f} m")
    print(f"Nilai BMI   : {bmi:.2f}")
    print(f"Kategori    : {kategori}")


def jalankan_nilai_mahasiswa():
    """Jalankan Tugas 2: input data mahasiswa, lalu tampilkan rekap nilai."""
    cetak_judul("DATA NILAI MAHASISWA")
    jumlah = int(baca_angka("Jumlah mahasiswa yang diinput: ", minimum=1))

    daftar = []
    for nomor in range(1, jumlah + 1):
        print(f"\nMahasiswa ke-{nomor}")
        nama = input("  Nama        : ").strip() or f"Mahasiswa {nomor}"
        nim = input("  NIM         : ").strip() or "-"
        daftar.append({
            "nama": nama,
            "nim": nim,
            "nilai_uts": baca_angka("  Nilai UTS   : ", 0, 100),
            "nilai_uas": baca_angka("  Nilai UAS   : ", 0, 100),
            "nilai_tugas": baca_angka("  Nilai Tugas : ", 0, 100),
        })

    data = proses_data(daftar)
    print("\nDAFTAR NILAI MAHASISWA")
    cetak_tabel(data)

    tertinggi = max(data, key=lambda mhs: mhs["nilai_akhir"])
    terendah = min(data, key=lambda mhs: mhs["nilai_akhir"])
    print()
    cetak_info_mahasiswa("Mahasiswa dengan Nilai Tertinggi:", tertinggi)
    print()
    cetak_info_mahasiswa("Mahasiswa dengan Nilai Terendah:", terendah)


def hitung_persegi():
    """Minta sisi persegi, lalu tampilkan luas dan kelilingnya."""
    sisi = baca_angka("Panjang sisi : ", minimum=0)
    print(f"Luas     : {mo.luas_persegi(sisi):.2f}")
    print(f"Keliling : {mo.keliling_persegi(sisi):.2f}")


def hitung_persegi_panjang():
    """Minta panjang dan lebar, lalu tampilkan luas dan kelilingnya."""
    panjang = baca_angka("Panjang : ", minimum=0)
    lebar = baca_angka("Lebar   : ", minimum=0)
    print(f"Luas     : {mo.luas_persegi_panjang(panjang, lebar):.2f}")
    print(f"Keliling : {mo.keliling_persegi_panjang(panjang, lebar):.2f}")


def hitung_lingkaran():
    """Minta jari-jari, lalu tampilkan luas dan keliling lingkaran."""
    print(f"(PI = {mo.PI})")
    jari_jari = baca_angka("Jari-jari : ", minimum=0)
    print(f"Luas     : {mo.luas_lingkaran(jari_jari):.2f}")
    print(f"Keliling : {mo.keliling_lingkaran(jari_jari):.2f}")


def konversi_fahrenheit():
    """Minta suhu Celsius, lalu tampilkan hasil dalam Fahrenheit."""
    celsius = baca_angka("Suhu (Celsius) : ")
    print(f"{celsius:.2f} C = {mo.celsius_ke_fahrenheit(celsius):.2f} F")


def konversi_kelvin():
    """Minta suhu Celsius, lalu tampilkan hasil dalam Kelvin."""
    celsius = baca_angka("Suhu (Celsius) : ", minimum=-273.15)
    print(f"{celsius:.2f} C = {mo.celsius_ke_kelvin(celsius):.2f} K")


def jalankan_modul_matematika():
    """Jalankan Tugas 3: pilih operasi geometri atau konversi suhu."""
    operasi = {
        "1": ("Persegi (luas & keliling)", hitung_persegi),
        "2": ("Persegi panjang (luas & keliling)", hitung_persegi_panjang),
        "3": ("Lingkaran (luas & keliling)", hitung_lingkaran),
        "4": ("Celsius ke Fahrenheit", konversi_fahrenheit),
        "5": ("Celsius ke Kelvin", konversi_kelvin),
    }

    cetak_judul("MODUL MATEMATIKA")
    for kode, (nama, _) in operasi.items():
        print(f"  {kode}. {nama}")
    pilihan = baca_pilihan("Pilih operasi (1-5): ", list(operasi))

    print(f"\n--- {operasi[pilihan][0]} ---")
    operasi[pilihan][1]()


def tampilkan_menu():
    """Tampilkan menu utama berisi tiga pilihan program."""
    cetak_judul("MENU UTAMA")
    print("  1. Program Penghitung BMI")
    print("  2. Pengelolaan Data Nilai Mahasiswa")
    print("  3. Modul Matematika (Geometri & Suhu)")


def main():
    """Jalankan menu utama secara berulang sampai pengguna memilih keluar."""
    program = {
        "1": jalankan_bmi,
        "2": jalankan_nilai_mahasiswa,
        "3": jalankan_modul_matematika,
    }

    while True:
        tampilkan_menu()
        pilihan = baca_pilihan("\nPilih program (1-3): ", list(program))
        program[pilihan]()

        print("\n" + "-" * 50)
        print("  1. Kembali ke menu utama")
        print("  2. Keluar dari program")
        lanjut = baca_pilihan("Pilih (1-2): ", ["1", "2"])
        if lanjut == "2":
            print("\nTerima kasih. Program selesai.")
            break


if __name__ == "__main__":
    main()
