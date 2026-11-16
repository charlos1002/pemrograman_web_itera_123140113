class Hewan:
    def __init__(self, nama):
        self.nama = nama

    def info(self):
        return f"{self.nama} adalah hewan"

class Kucing(Hewan):
    def suara(self):
        return "Meong"

k = Kucing("Tom")
print(k.info())   # diwarisi dari Hewan
print(k.suara())
