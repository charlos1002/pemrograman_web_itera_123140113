'use strict';

/* ===== Konstanta ===== */
const STORAGE_KEY = 'kasir_keranjang';
const COUPON_KEY = 'kasir_kupon';
const MIN_HARGA = 500;
const MIN_DISKON_OTOMATIS = 50000;
const RATE_DISKON = 0.10;
const KODE_PROMO = 'HEMAT10';

/* ===== State ===== */
let keranjang = [];
let kuponAktif = false;

/* ===== Elemen DOM ===== */
const $ = (id) => document.getElementById(id);
const form = $('form-barang');
const inNama = $('nama'), inHarga = $('harga'), inQty = $('qty');
const inBayar = $('bayar'), inKupon = $('kupon');

/* ===== Helper ===== */
const rupiah = (n) => 'Rp ' + new Intl.NumberFormat('id-ID').format(Math.round(n));

function tampilError(input, idPesan, pesan) {
  $(idPesan).textContent = pesan;
  input.classList.toggle('invalid', Boolean(pesan));
}

/* ===== LocalStorage ===== */
function simpan() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(keranjang));
    localStorage.setItem(COUPON_KEY, JSON.stringify(kuponAktif));
  } catch (e) { console.warn('Gagal menyimpan ke localStorage', e); }
}

function muat() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    keranjang = Array.isArray(data) ? data : [];
    kuponAktif = JSON.parse(localStorage.getItem(COUPON_KEY)) === true;
  } catch (e) {
    keranjang = []; kuponAktif = false;
  }
}

/* ===== Validasi ===== */
function validasiNama() {
  const nilai = inNama.value.trim();
  let pesan = '';
  if (nilai === '') pesan = 'Nama barang wajib diisi.';
  else if (nilai.length < 3) pesan = 'Nama barang minimal 3 karakter.';
  tampilError(inNama, 'err-nama', pesan);
  return !pesan;
}

function validasiHarga() {
  const mentah = inHarga.value.trim();
  const nilai = Number(mentah);
  let pesan = '';
  if (mentah === '' || Number.isNaN(nilai)) pesan = 'Harga wajib diisi dengan angka.';
  else if (nilai <= 0) pesan = 'Harga harus berupa angka positif (lebih dari 0).';
  else if (nilai < MIN_HARGA) pesan = 'Harga satuan minimal Rp 500.';
  tampilError(inHarga, 'err-harga', pesan);
  return !pesan;
}

function validasiQty() {
  const mentah = inQty.value.trim();
  const nilai = Number(mentah);
  let pesan = '';
  if (mentah === '' || Number.isNaN(nilai)) pesan = 'Jumlah wajib diisi dengan angka.';
  else if (!Number.isInteger(nilai)) pesan = 'Jumlah harus berupa bilangan bulat.';
  else if (nilai < 1) pesan = 'Jumlah minimal 1.';
  tampilError(inQty, 'err-qty', pesan);
  return !pesan;
}

/* ===== Perhitungan ===== */
function hitung() {
  const total = keranjang.reduce((jml, b) => jml + b.harga * b.qty, 0);
  const diskonOtomatis = total >= MIN_DISKON_OTOMATIS;
  const dapatDiskon = total > 0 && (diskonOtomatis || kuponAktif);
  const diskon = dapatDiskon ? total * RATE_DISKON : 0;
  const totalAkhir = total - diskon;
  let sumber = '';
  if (dapatDiskon) sumber = kuponAktif ? ` (${KODE_PROMO})` : ' (otomatis 10%)';
  return { total, diskon, totalAkhir, sumber };
}

/* ===== Render ===== */
function renderTabel() {
  const tbody = $('isi-keranjang');
  tbody.textContent = '';
  keranjang.forEach((b, i) => {
    const tr = document.createElement('tr');
    const sel = (teks, kelas) => {
      const td = document.createElement('td');
      td.textContent = teks;
      if (kelas) td.className = kelas;
      return td;
    };
    tr.append(
      sel(i + 1), sel(b.nama), sel(rupiah(b.harga), 'num'),
      sel(b.qty, 'num'), sel(rupiah(b.harga * b.qty), 'num')
    );
    const tdAksi = document.createElement('td');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn btn-hapus';
    btn.textContent = 'Hapus';
    btn.setAttribute('aria-label', 'Hapus ' + b.nama);
    btn.addEventListener('click', () => hapusItem(b.id));
    tdAksi.appendChild(btn);
    tr.appendChild(tdAksi);
    tbody.appendChild(tr);
  });
  $('kosong').classList.toggle('hidden', keranjang.length > 0);
}

function renderRingkasan() {
  const { total, diskon, totalAkhir, sumber } = hitung();
  $('total').textContent = rupiah(total);
  $('label-diskon').textContent = 'Diskon' + sumber;
  $('diskon').textContent = diskon > 0 ? '- ' + rupiah(diskon) : rupiah(0);
  $('total-akhir').textContent = rupiah(totalAkhir);
  renderKembalian();
}

function renderKembalian() {
  const el = $('kembalian');
  const { totalAkhir } = hitung();
  const mentah = inBayar.value.trim();
  el.className = 'kembalian';
  if (mentah === '' || totalAkhir === 0) { el.textContent = ''; return; }
  const bayar = Number(mentah);
  if (Number.isNaN(bayar) || bayar < 0) {
    el.textContent = 'Nominal uang bayar tidak valid.';
    el.classList.add('netral');
  } else if (bayar < totalAkhir) {
    el.textContent = 'Uang belum mencukupi, kurang ' + rupiah(totalAkhir - bayar) + '.';
    el.classList.add('kurang');
  } else {
    el.textContent = 'Kembalian: ' + rupiah(bayar - totalAkhir);
    el.classList.add('ok');
  }
}

function renderKupon() {
  const info = $('info-kupon');
  info.className = 'hint' + (kuponAktif ? ' ok' : '');
  info.textContent = kuponAktif ? `Kode ${KODE_PROMO} aktif: diskon 10%.` : '';
  if (kuponAktif) inKupon.value = KODE_PROMO;
}

function renderSemua() {
  renderTabel();
  renderKupon();
  renderRingkasan();
}

/* ===== Aksi ===== */
function tambahBarang(e) {
  e.preventDefault();
  // jalankan semua validasi agar semua pesan error tampil sekaligus
  const hasil = [validasiNama(), validasiHarga(), validasiQty()];
  if (hasil.includes(false)) return;

  keranjang.push({
    id: Date.now() + Math.random(),
    nama: inNama.value.trim(),
    harga: Number(inHarga.value),
    qty: Number(inQty.value)
  });
  simpan();
  renderSemua();
  form.reset();
  [inNama, inHarga, inQty].forEach((i) => i.classList.remove('invalid'));
  ['err-nama', 'err-harga', 'err-qty'].forEach((id) => { $(id).textContent = ''; });
  inNama.focus();
}

function hapusItem(id) {
  keranjang = keranjang.filter((b) => b.id !== id);
  if (keranjang.length === 0) kuponAktif = false;
  simpan();
  renderSemua();
}

function pakaiKupon() {
  const kode = inKupon.value.trim().toUpperCase();
  const info = $('info-kupon');
  if (kode === KODE_PROMO) {
    if (keranjang.length === 0) {
      info.className = 'hint bad';
      info.textContent = 'Tambahkan barang ke keranjang sebelum memakai kode promo.';
      return;
    }
    kuponAktif = true;
    simpan();
    renderSemua();
  } else {
    kuponAktif = false;
    simpan();
    renderSemua();
    info.className = 'hint bad';
    info.textContent = kode === '' ? 'Masukkan kode promo terlebih dahulu.' : 'Kode promo tidak dikenali.';
  }
}

function transaksiBaru() {
  if (keranjang.length > 0 && !confirm('Kosongkan keranjang dan mulai transaksi baru?')) return;
  keranjang = [];
  kuponAktif = false;
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(COUPON_KEY);
  inBayar.value = '';
  inKupon.value = '';
  renderSemua();
}

/* ===== Event listener ===== */
form.addEventListener('submit', tambahBarang);
inNama.addEventListener('blur', validasiNama);
inHarga.addEventListener('blur', validasiHarga);
inQty.addEventListener('blur', validasiQty);
inBayar.addEventListener('input', renderKembalian);
$('btn-kupon').addEventListener('click', pakaiKupon);
$('btn-reset').addEventListener('click', transaksiBaru);

/* ===== Inisialisasi ===== */
muat();
renderSemua();
