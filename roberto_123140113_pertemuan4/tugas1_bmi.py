"""Tugas 1: Program penghitung BMI (Body Mass Index)."""


def hitung_bmi(berat, tinggi):
    """Hitung nilai BMI dari berat dan tinggi badan.

    Args:
        berat (float): Berat badan dalam kilogram (kg).
        tinggi (float): Tinggi badan dalam meter (m).

    Returns:
        float: Nilai BMI dengan rumus berat / (tinggi * tinggi).
    """
    return berat / (tinggi * tinggi)


def tentukan_kategori(bmi):
    """Tentukan kategori berat badan berdasarkan nilai BMI.

    Args:
        bmi (float): Nilai BMI yang sudah dihitung.

    Returns:
        str: Kategori berat badan (kurang, normal, berlebih, atau obesitas).
    """
    if bmi < 18.5:
        return "Berat badan kurang"
    elif bmi < 25:
        return "Berat badan normal"
    elif bmi < 30:
        return "Berat badan berlebih"
    else:
        return "Obesitas"


def main():
    """Minta input berat dan tinggi, lalu tampilkan BMI dan kategorinya."""
    berat = float(input("Masukkan berat badan (kg)  : "))
    tinggi = float(input("Masukkan tinggi badan (m)  : "))

    if berat <= 0 or tinggi <= 0:
        print("Berat dan tinggi badan harus lebih besar dari 0.")
        return

    bmi = hitung_bmi(berat, tinggi)
    kategori = tentukan_kategori(bmi)

    print("\n=== HASIL PERHITUNGAN BMI ===")
    print(f"Berat badan : {berat:.1f} kg")
    print(f"Tinggi badan: {tinggi:.2f} m")
    print(f"Nilai BMI   : {bmi:.2f}")
    print(f"Kategori    : {kategori}")


if __name__ == "__main__":
    main()
