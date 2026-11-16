class Rekening:
    def __init__(self, saldo):
        self.__saldo = saldo      # private

    @property
    def saldo(self):
        return self.__saldo

    def setor(self, jumlah):
        if jumlah > 0:
            self.__saldo += jumlah

r = Rekening(1000)
r.setor(500)
print(r.saldo)
# print(r.__saldo)  # AttributeError
