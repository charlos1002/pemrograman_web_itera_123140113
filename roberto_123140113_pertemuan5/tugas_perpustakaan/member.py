class Member:
    """Anggota perpustakaan yang dapat meminjam dan mengembalikan item."""

    def __init__(self, member_id, nama):
        self._member_id = member_id
        self._nama = nama
        self.__item_dipinjam = []   # private

    @property
    def nama(self):
        return self._nama

    @property
    def jumlah_pinjaman(self):
        return len(self.__item_dipinjam)

    def pinjam(self, item):
        if item.pinjam():
            self.__item_dipinjam.append(item)
            return True
        return False

    def kembalikan(self, item):
        if item in self.__item_dipinjam and item.kembalikan():
            self.__item_dipinjam.remove(item)
            return True
        return False
