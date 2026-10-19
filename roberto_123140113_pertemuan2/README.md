Nama : Roberto Charlos Sagala

NIM : 123140113

Kelas : Praktikum Pengembangan Aplikasi Web RB

Deskripsi Aplikasi

Planner Kuliah adalah website yang membantu mahasiswa untuk mengatur jadwal perkuliahan serta tugas-tugas perkuliahan mereka. Di website ini, mahasiswa dapat menambahkan jadwal mereka. Pada awal dashboard, akan langsung ditampilkan 7 hari; mahasiswa dapat menambahkan jadwal sesuai dengan harinya. Selain menambahkan, mahasiswa juga dapat menghapus dan mengedit jadwal yang sudah ditambahkan.

Fitur lainnya adalah Tugas. Di sini mahasiswa dapat menambahkan tugas beserta deadline-nya. Sama seperti fitur jadwal, pada fitur tugas mahasiswa juga dapat menambah, mengedit, menghapus, dan sekedar mencoret tugas yang telah diselesaikan.

Screenshot Aplikasi

Daftar Fitur ES6+ yang Diimplementasikan

Deklarasi Variabel (let dan const)

Penggunaan const untuk konstanta global (script.js, baris 4–7).

Penggunaan let dan const di dalam blok fungsi atau loop, seperti deklarasi let body dan const items (script.js, baris 223–227).

Arrow Functions (Minimal 3)

const uid = () => ... — Pembuat ID unik (script.js, baris 9).

const esc = (text = '') => ... — Fungsi escaping HTML (script.js, baris 12).

const todayIndex = () => ... — Pencari indeks hari ini (script.js, baris 16).

const dayDiff = (from, to) => ... — Penghitung selisih hari (script.js, baris 19).

Template Literals

Interpolasi string pada pemformatan ID unik (script.js, baris 9).

Rendering elemen jadwal perkuliahan dinamis pada fungsi scheduleTemplate (script.js, baris 238–248).

Rendering kartu tugas dinamis pada fungsi taskTemplate (script.js, baris 259–275).

Fungsi Asinkron (async/await)

async init() — Inisialisasi aplikasi secara asinkron (script.js, baris 80–86).

async loadQuote() — Mengambil data kutipan acak dari API luar menggunakan fetch dan await (script.js, baris 153–162).

Classes

class ScheduleItem — Model data untuk item jadwal (script.js, baris 26–39).

class TaskItem — Model data untuk item tugas (script.js, baris 41–65).

class DashboardApp — Kelas utama pengelola state dan UI aplikasi (script.js, baris 68–277).
