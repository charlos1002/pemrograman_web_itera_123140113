# Di Python, semuanya adalah object (angka, string, fungsi, bahkan class).
x = 10
teks = "halo"

def sapa():
    pass

print(type(x), type(teks), type(sapa), type(int))
print(x.__add__(5))        # operator + sebenarnya memanggil method
print(teks.upper())        # string punya method
