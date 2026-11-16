from library_item import Book, Magazine
from library import Library
from member import Member

MENU = """
===== MENU PERPUSTAKAAN =====
1. Tambah item
2. Tampilkan katalog
3. Cari item
4. Pinjam item
5. Kembalikan item
6. Keluar
"""


def input_wajib(prompt):
    """Minta input sampai tidak kosong."""
    while True:
        nilai = input(prompt).strip()
        if nilai:
            return nilai
        print("Input tidak boleh kosong.")


def tambah_item(perpus):
    jenis = input_wajib("Jenis item (1=Buku, 2=Majalah): ")
    if jenis not in ("1", "2"):
        print("Jenis tidak valid.")
        return
    item_id = input_wajib("ID     : ")
    judul = input_wajib("Judul  : ")
    if jenis == "1":
        item = Book(item_id, judul, input_wajib("Penulis: "))
    else:
        item = Magazine(item_id, judul, input_wajib("Edisi  : "))
    if perpus.tambah_item(item):
        print("Item berhasil ditambahkan.")


def cari_item(perpus):
    mode = input_wajib("Cari berdasarkan (1=ID, 2=Judul): ")
    if mode == "1":
        item = perpus.cari_by_id(input_wajib("ID: "))
        hasil = [item] if item else []
    elif mode == "2":
        hasil = perpus.cari_by_judul(input_wajib("Judul: "))
    else:
        print("Pilihan tidak valid.")
        return
    if not hasil:
        print("Item tidak ditemukan.")
    for item in hasil:
        status = "Dipinjam" if item.is_dipinjam else "Tersedia"
        print(f"{item.get_detail()} | Status: {status}")


def pinjam_item(perpus, anggota):
    item = perpus.cari_by_id(input_wajib("ID item yang dipinjam: "))
    if item is None:
        print("Item tidak ditemukan.")
    elif anggota.pinjam(item):
        print(f"{anggota.nama} berhasil meminjam: {item.judul}")
    else:
        print("Item sedang dipinjam.")


def kembalikan_item(perpus, anggota):
    item = perpus.cari_by_id(input_wajib("ID item yang dikembalikan: "))
    if item is None:
        print("Item tidak ditemukan.")
        return
    if not anggota.kembalikan(item):
        print("Item ini tidak sedang Anda pinjam.")
        return
    print(f"Item '{item.judul}' berhasil dikembalikan.")
    hari = input("Terlambat berapa hari? (Enter jika tidak terlambat): ").strip()
    if hari.isdigit() and int(hari) > 0:
        print(f"Denda: Rp {item.hitung_denda(int(hari))}")


def main():
    perpus = Library("Perpustakaan")
    anggota = Member("A01", input_wajib("Masukkan nama Anda: "))
    print(f"Selamat datang, {anggota.nama}!")

    while True:
        print(MENU)
        pilihan = input("Pilih menu (1-6): ").strip()
        print()
        if pilihan == "1":
            tambah_item(perpus)
        elif pilihan == "2":
            perpus.tampilkan_katalog()
        elif pilihan == "3":
            cari_item(perpus)
        elif pilihan == "4":
            pinjam_item(perpus, anggota)
        elif pilihan == "5":
            kembalikan_item(perpus, anggota)
        elif pilihan == "6":
            print("Terima kasih, sampai jumpa!")
            break
        else:
            print("Pilihan tidak valid, masukkan angka 1-6.")


if __name__ == "__main__":
    main()
