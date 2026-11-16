class Kucing:
    def suara(self):
        return "Meong"

class Anjing:
    def suara(self):
        return "Guk"

for hewan in (Kucing(), Anjing()):
    print(hewan.suara())   # method sama, perilaku berbeda
