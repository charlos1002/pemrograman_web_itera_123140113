from abc import ABC, abstractmethod


class LibraryItem(ABC):
    """Abstract class dasar untuk semua item perpustakaan."""

    def __init__(self, item_id, judul):
        self._item_id = item_id      # protected
        self._judul = judul          # protected
        self.__is_dipinjam = False   # private

    @property
    def item_id(self):
        return self._item_id

    @property
    def judul(self):
        return self._judul

    @property
    def is_dipinjam(self):
        return self.__is_dipinjam

    def pinjam(self):
        if self.__is_dipinjam:
            return False
        self.__is_dipinjam = True
        return True

    def kembalikan(self):
        if not self.__is_dipinjam:
            return False
        self.__is_dipinjam = False
        return True

    @abstractmethod
    def get_detail(self):
        """Mengembalikan string detail item."""

    @abstractmethod
    def hitung_denda(self, hari_terlambat):
        """Mengembalikan denda keterlambatan (Rp)."""


class Book(LibraryItem):
    DENDA_PER_HARI = 1000

    def __init__(self, item_id, judul, penulis):
        super().__init__(item_id, judul)
        self._penulis = penulis

    def get_detail(self):
        return f"[Buku] {self._item_id} | {self._judul} | Penulis: {self._penulis}"

    def hitung_denda(self, hari_terlambat):
        return hari_terlambat * self.DENDA_PER_HARI


class Magazine(LibraryItem):
    DENDA_PER_HARI = 500

    def __init__(self, item_id, judul, edisi):
        super().__init__(item_id, judul)
        self._edisi = edisi

    def get_detail(self):
        return f"[Majalah] {self._item_id} | {self._judul} | Edisi: {self._edisi}"

    def hitung_denda(self, hari_terlambat):
        return hari_terlambat * self.DENDA_PER_HARI
