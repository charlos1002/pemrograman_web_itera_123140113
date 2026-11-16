class Mahasiswa:
    def __init__(self, nama, nim):
        self.nama = nama
        self.nim = nim

    def perkenalan(self):
        return f"Halo, saya {self.nama} ({self.nim})"

m1 = Mahasiswa("Budi", "123140001")
m2 = Mahasiswa("Sari", "123140002")
print(m1.perkenalan())
print(m2.perkenalan())
