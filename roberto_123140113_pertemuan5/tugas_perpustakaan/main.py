from library_item import Book, Magazine
from library import Library
from member import Member


def garis(judul):
    print(f"\n=== {judul} ===")


perpus = Library("Perpustakaan ITERA")

garis("1. Menambahkan item")
perpus.tambah_item(Book("B001", "Laskar Pelangi", "Andrea Hirata"))
perpus.tambah_item(Book("B002", "Bumi Manusia", "Pramoedya Ananta Toer"))
perpus.tambah_item(Magazine("M001", "National Geographic", "Januari 2026"))
perpus.tambah_item(Magazine("M002", "Tempo", "Februari 2026"))
perpus.tambah_item(Book("B001", "Duplikat", "-"))  # ditolak: ID sama

garis("2. Katalog tersedia")
perpus.tampilkan_katalog()

garis("3. Mencari item")
item = perpus.cari_by_id("B002")
print("Cari id B002   :", item.get_detail() if item else "Tidak ditemukan")
for hasil in perpus.cari_by_judul("tempo"):
    print("Cari 'tempo'   :", hasil.get_detail())
print("Cari id X999   :", perpus.cari_by_id("X999") or "Tidak ditemukan")

garis("4. Status ketersediaan")
anggota = Member("A01", "Roberto")
buku = perpus.cari_by_id("B001")
print("Sebelum dipinjam, is_dipinjam =", buku.is_dipinjam)
anggota.pinjam(buku)
print("Setelah dipinjam, is_dipinjam =", buku.is_dipinjam)
print("Pinjam lagi (harus gagal)     :", anggota.pinjam(buku))
print("\nKatalog tersedia setelah peminjaman:")
perpus.tampilkan_katalog()

garis("5. Pengembalian & denda")
anggota.kembalikan(buku)
print("Setelah dikembalikan, is_dipinjam =", buku.is_dipinjam)
print("Denda buku 3 hari    : Rp", buku.hitung_denda(3))
print("Denda majalah 3 hari : Rp", perpus.cari_by_id("M001").hitung_denda(3))
