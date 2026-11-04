"""Tugas 2: Program pengelolaan data nilai mahasiswa."""

BOBOT_UTS = 0.30
BOBOT_UAS = 0.40
BOBOT_TUGAS = 0.30

DATA_MAHASISWA = [
    {"nama": "Andi Pratama", "nim": "2024001",
     "nilai_uts": 85, "nilai_uas": 90, "nilai_tugas": 88},
    {"nama": "Budi Santoso", "nim": "2024002",
     "nilai_uts": 70, "nilai_uas": 75, "nilai_tugas": 80},
    {"nama": "Citra Lestari", "nim": "2024003",
     "nilai_uts": 60, "nilai_uas": 65, "nilai_tugas": 70},
    {"nama": "Dewi Anggraini", "nim": "2024004",
     "nilai_uts": 55, "nilai_uas": 50, "nilai_tugas": 60},
    {"nama": "Eko Wijaya", "nim": "2024005",
     "nilai_uts": 40, "nilai_uas": 45, "nilai_tugas": 50},
    {"nama": "Fitri Handayani", "nim": "2024006",
     "nilai_uts": 78, "nilai_uas": 82, "nilai_tugas": 75},
]


def hitung_nilai_akhir(nilai_uts, nilai_uas, nilai_tugas):
    """Hitung nilai akhir berdasarkan bobot UTS, UAS, dan tugas.

    Args:
        nilai_uts (float): Nilai Ujian Tengah Semester (bobot 30%).
        nilai_uas (float): Nilai Ujian Akhir Semester (bobot 40%).
        nilai_tugas (float): Nilai tugas (bobot 30%).

    Returns:
        float: Nilai akhir hasil pembobotan.
    """
    return (BOBOT_UTS * nilai_uts
            + BOBOT_UAS * nilai_uas
            + BOBOT_TUGAS * nilai_tugas)


def tentukan_grade(nilai_akhir):
    """Tentukan grade huruf berdasarkan nilai akhir.

    Args:
        nilai_akhir (float): Nilai akhir mahasiswa.

    Returns:
        str: Grade huruf, yaitu "A", "B", "C", "D", atau "E".
    """
    if nilai_akhir >= 80:
        return "A"
    elif nilai_akhir >= 70:
        return "B"
    elif nilai_akhir >= 60:
        return "C"
    elif nilai_akhir >= 50:
        return "D"
    else:
        return "E"


def proses_data(daftar_mahasiswa):
    """Tambahkan kunci nilai_akhir dan grade ke setiap data mahasiswa.

    Args:
        daftar_mahasiswa (list): List berisi dictionary mahasiswa dengan
            kunci nama, nim, nilai_uts, nilai_uas, dan nilai_tugas.

    Returns:
        list: List dictionary yang sama, dilengkapi kunci nilai_akhir
            dan grade.
    """
    for mhs in daftar_mahasiswa:
        mhs["nilai_akhir"] = hitung_nilai_akhir(
            mhs["nilai_uts"], mhs["nilai_uas"], mhs["nilai_tugas"]
        )
        mhs["grade"] = tentukan_grade(mhs["nilai_akhir"])
    return daftar_mahasiswa


def cetak_tabel(daftar_mahasiswa):
    """Cetak data mahasiswa dalam format tabel di terminal.

    Args:
        daftar_mahasiswa (list): List dictionary mahasiswa yang sudah
            memiliki kunci nilai_akhir dan grade.

    Returns:
        None: Fungsi hanya mencetak ke layar.
    """
    garis = "+" + "-" * 5 + "+" + "-" * 20 + "+" + "-" * 12 + "+" \
        + "-" * 13 + "+" + "-" * 7 + "+"
    print(garis)
    print(f"| {'No':<3} | {'Nama':<18} | {'NIM':<10} | "
          f"{'Nilai Akhir':>11} | {'Grade':^5} |")
    print(garis)
    for nomor, mhs in enumerate(daftar_mahasiswa, start=1):
        print(f"| {nomor:<3} | {mhs['nama']:<18} | {mhs['nim']:<10} | "
              f"{mhs['nilai_akhir']:>11.2f} | {mhs['grade']:^5} |")
    print(garis)


def cetak_info_mahasiswa(judul, mhs):
    """Cetak ringkasan data satu mahasiswa.

    Args:
        judul (str): Label yang ditampilkan, misalnya "Nilai Tertinggi".
        mhs (dict): Dictionary mahasiswa dengan kunci nama, nim,
            nilai_akhir, dan grade.

    Returns:
        None: Fungsi hanya mencetak ke layar.
    """
    print(f"{judul}")
    print(f"  Nama        : {mhs['nama']}")
    print(f"  NIM         : {mhs['nim']}")
    print(f"  Nilai Akhir : {mhs['nilai_akhir']:.2f}")
    print(f"  Grade       : {mhs['grade']}")


def main():
    """Jalankan seluruh alur program pengelolaan nilai mahasiswa."""
    data = proses_data(DATA_MAHASISWA)

    print("DAFTAR NILAI MAHASISWA")
    cetak_tabel(data)

    tertinggi = max(data, key=lambda mhs: mhs["nilai_akhir"])
    terendah = min(data, key=lambda mhs: mhs["nilai_akhir"])

    print()
    cetak_info_mahasiswa("Mahasiswa dengan Nilai Tertinggi:", tertinggi)
    print()
    cetak_info_mahasiswa("Mahasiswa dengan Nilai Terendah:", terendah)


if __name__ == "__main__":
    main()
