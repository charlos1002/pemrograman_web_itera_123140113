# --- Prosedural: data dan fungsi terpisah ---
mobil_nama = "Avanza"
mobil_kecepatan = 0

def tambah_kecepatan(kecepatan, nilai):
    return kecepatan + nilai

mobil_kecepatan = tambah_kecepatan(mobil_kecepatan, 20)
print(f"[Prosedural] {mobil_nama}: {mobil_kecepatan} km/jam")


# --- OOP: data dan perilaku dibungkus dalam class ---
class Mobil:
    def __init__(self, nama):
        self.nama = nama
        self.kecepatan = 0

    def tambah_kecepatan(self, nilai):
        self.kecepatan += nilai

m = Mobil("Avanza")
m.tambah_kecepatan(20)
print(f"[OOP] {m.nama}: {m.kecepatan} km/jam")
