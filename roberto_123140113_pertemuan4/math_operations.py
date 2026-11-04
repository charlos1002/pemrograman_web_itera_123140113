"""Modul operasi matematika: geometri dan konversi suhu."""

PI = 3.14159
OFFSET_KELVIN = 273.15


def luas_persegi(sisi):
    """Hitung luas persegi.

    Args:
        sisi (float): Panjang sisi persegi.

    Returns:
        float: Luas persegi (sisi * sisi).
    """
    return sisi * sisi


def keliling_persegi(sisi):
    """Hitung keliling persegi.

    Args:
        sisi (float): Panjang sisi persegi.

    Returns:
        float: Keliling persegi (4 * sisi).
    """
    return 4 * sisi


def luas_persegi_panjang(panjang, lebar):
    """Hitung luas persegi panjang.

    Args:
        panjang (float): Panjang persegi panjang.
        lebar (float): Lebar persegi panjang.

    Returns:
        float: Luas persegi panjang (panjang * lebar).
    """
    return panjang * lebar


def keliling_persegi_panjang(panjang, lebar):
    """Hitung keliling persegi panjang.

    Args:
        panjang (float): Panjang persegi panjang.
        lebar (float): Lebar persegi panjang.

    Returns:
        float: Keliling persegi panjang (2 * (panjang + lebar)).
    """
    return 2 * (panjang + lebar)


def luas_lingkaran(jari_jari):
    """Hitung luas lingkaran.

    Args:
        jari_jari (float): Jari-jari lingkaran.

    Returns:
        float: Luas lingkaran (PI * jari_jari * jari_jari).
    """
    return PI * jari_jari * jari_jari


def keliling_lingkaran(jari_jari):
    """Hitung keliling lingkaran.

    Args:
        jari_jari (float): Jari-jari lingkaran.

    Returns:
        float: Keliling lingkaran (2 * PI * jari_jari).
    """
    return 2 * PI * jari_jari


def celsius_ke_fahrenheit(celsius):
    """Konversi suhu dari Celsius ke Fahrenheit.

    Args:
        celsius (float): Suhu dalam derajat Celsius.

    Returns:
        float: Suhu dalam derajat Fahrenheit (celsius * 9 / 5 + 32).
    """
    return celsius * 9 / 5 + 32


def celsius_ke_kelvin(celsius):
    """Konversi suhu dari Celsius ke Kelvin.

    Args:
        celsius (float): Suhu dalam derajat Celsius.

    Returns:
        float: Suhu dalam Kelvin (celsius + 273.15).
    """
    return celsius + OFFSET_KELVIN
