class Library:
    """Menyimpan dan mengelola koleksi item perpustakaan."""

    def __init__(self, nama):
        self.nama = nama
        self.__koleksi = []   # private

    def tambah_item(self, item):
        if any(i.item_id == item.item_id for i in self.__koleksi):
            print(f"ID {item.item_id} sudah ada, item tidak ditambahkan.")
            return False
        self.__koleksi.append(item)
        return True

    def tampilkan_katalog(self):
        """Menampilkan item yang tersedia (belum dipinjam)."""
        tersedia = [i for i in self.__koleksi if not i.is_dipinjam]
        if not tersedia:
            print("Tidak ada item yang tersedia.")
        for item in tersedia:
            print(item.get_detail())   # polymorphism

    def cari_by_id(self, item_id):
        for item in self.__koleksi:
            if item.item_id == item_id:
                return item
        return None

    def cari_by_judul(self, kata_kunci):
        kata_kunci = kata_kunci.lower()
        return [i for i in self.__koleksi if kata_kunci in i.judul.lower()]
