"""Program utama untuk menguji seluruh fungsi pada modul math_operations."""

# Cara impor 1: impor seluruh modul, dipanggil dengan awalan nama modul.
import math_operations

# Cara impor 2: impor fungsi tertentu, dipanggil langsung tanpa awalan.
from math_operations import (
    luas_lingkaran,
    keliling_lingkaran,
    celsius_ke_fahrenheit,
    celsius_ke_kelvin,
)

# Cara impor 3: impor dengan alias.
import math_operations as mo


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


def uji_persegi():
    """Uji fungsi luas dan keliling persegi dengan beberapa sisi."""
    cetak_judul("PERSEGI")
    for sisi in (4, 7.5, 10):
        luas = math_operations.luas_persegi(sisi)
        keliling = math_operations.keliling_persegi(sisi)
        print(f"Sisi {sisi:>5} -> Luas: {luas:>8.2f} | "
              f"Keliling: {keliling:>7.2f}")


def uji_persegi_panjang():
    """Uji fungsi luas dan keliling persegi panjang."""
    cetak_judul("PERSEGI PANJANG")
    for panjang, lebar in ((5, 3), (8, 2.5), (12, 7)):
        luas = mo.luas_persegi_panjang(panjang, lebar)
        keliling = mo.keliling_persegi_panjang(panjang, lebar)
        print(f"P {panjang:>4} x L {lebar:>4} -> Luas: {luas:>7.2f} | "
              f"Keliling: {keliling:>6.2f}")


def uji_lingkaran():
    """Uji fungsi luas dan keliling lingkaran serta konstanta PI."""
    cetak_judul("LINGKARAN")
    print(f"Nilai konstanta PI = {math_operations.PI}")
    for jari_jari in (7, 10, 3.5):
        luas = luas_lingkaran(jari_jari)
        keliling = keliling_lingkaran(jari_jari)
        print(f"r {jari_jari:>4} -> Luas: {luas:>8.2f} | "
              f"Keliling: {keliling:>7.2f}")


def uji_suhu():
    """Uji fungsi konversi suhu dari Celsius."""
    cetak_judul("KONVERSI SUHU")
    print(f"{'Celsius':>8} | {'Fahrenheit':>10} | {'Kelvin':>8}")
    print("-" * 34)
    for celsius in (-10, 0, 25, 37, 100):
        fahrenheit = celsius_ke_fahrenheit(celsius)
        kelvin = celsius_ke_kelvin(celsius)
        print(f"{celsius:>8} | {fahrenheit:>10.2f} | {kelvin:>8.2f}")


def main():
    """Jalankan seluruh pengujian fungsi modul math_operations."""
    uji_persegi()
    uji_persegi_panjang()
    uji_lingkaran()
    uji_suhu()


if __name__ == "__main__":
    main()
