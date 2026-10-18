'use strict';

/* ---------- Konstanta dan helper ---------- */
const DAYS = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
const STORAGE_KEYS = { schedule: 'planner.schedule', tasks: 'planner.tasks' };
const QUOTE_URL = 'https://dummyjson.com/quotes/random';
const FALLBACK_QUOTE = { quote: 'Mulai dari tugas yang paling dekat deadline-nya.', author: 'Planner Kuliah' };

// Arrow function 1: pembuat id unik
const uid = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;

// Arrow function 2: escape HTML agar input pengguna aman dirender lewat template literal
const esc = (text = '') =>
  String(text).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

// Arrow function 3: indeks hari ini (Senin = 0)
const todayIndex = () => (new Date().getDay() + 6) % 7;

// Arrow function 4: selisih hari kalender antara dua tanggal
const dayDiff = (from, to) => {
  const strip = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  return Math.round((strip(to) - strip(from)) / 86400000);
};

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
  weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
});

/* ---------- Model data ---------- */
class ScheduleItem {
  constructor({ id = uid(), day, course, room, start, end }) {
    this.id = id;
    this.day = Number(day);
    this.course = course.trim();
    this.room = room.trim();
    this.start = start;
    this.end = end;
  }

  get timeLabel() {
    return `${this.start} - ${this.end}`;
  }
}

class TaskItem {
  constructor({ id = uid(), title, course, deadline, description = '', done = false }) {
    this.id = id;
    this.title = title.trim();
    this.course = course.trim();
    this.deadline = deadline; // format datetime-local: YYYY-MM-DDTHH:mm
    this.description = description.trim();
    this.done = Boolean(done);
  }

  get deadlineDate() {
    return new Date(this.deadline);
  }

  get deadlineLabel() {
    return dateFormatter.format(this.deadlineDate);
  }

  get status() {
    const now = new Date();
    const days = dayDiff(now, this.deadlineDate);
    if (this.deadlineDate < now) return { cls: 'due--late', text: days === 0 ? 'Sudah lewat hari ini' : `Terlambat ${Math.abs(days)} hari` };
    if (days === 0) return { cls: 'due--soon', text: 'Deadline hari ini' };
    if (days <= 2) return { cls: 'due--soon', text: `${days} hari lagi` };
    return { cls: '', text: `${days} hari lagi` };
  }
}

/* ---------- Aplikasi ---------- */
class DashboardApp {
  constructor() {
    this.state = { view: 'jadwal', schedule: [], tasks: [] };
    this.els = {
      week: document.getElementById('week'),
      tasks: document.getElementById('tasks'),
      badge: document.getElementById('taskBadge'),
      quote: document.getElementById('quote'),
      scheduleDialog: document.getElementById('scheduleDialog'),
      scheduleForm: document.getElementById('scheduleForm'),
      scheduleError: document.getElementById('scheduleError'),
      scheduleTitle: document.getElementById('scheduleTitle'),
      taskDialog: document.getElementById('taskDialog'),
      taskForm: document.getElementById('taskForm'),
      taskError: document.getElementById('taskError'),
      taskTitle: document.getElementById('taskTitle'),
      coursePicker: document.getElementById('coursePicker'),
    };
  }

  /* --- siklus hidup --- */
  async init() {
    this.fillDaySelect();
    this.load();
    this.bindEvents();
    this.render();
    await this.loadQuote();
  }

  fillDaySelect() {
    this.els.scheduleForm.elements.day.innerHTML = DAYS
      .map((name, i) => `<option value="${i}">${name}</option>`)
      .join('');
  }

  /* --- state dan localStorage --- */
  setState(patch) {
    this.state = { ...this.state, ...patch };
    this.save();
    this.render();
  }

  load() {
    const read = (key) => {
      try {
        return JSON.parse(localStorage.getItem(key)) ?? [];
      } catch {
        return [];
      }
    };
    this.state = {
      ...this.state,
      schedule: read(STORAGE_KEYS.schedule).map((item) => new ScheduleItem(item)),
      tasks: read(STORAGE_KEYS.tasks).map((item) => new TaskItem(item)),
    };
  }

  save() {
    const { schedule, tasks } = this.state;
    localStorage.setItem(STORAGE_KEYS.schedule, JSON.stringify(schedule));
    localStorage.setItem(STORAGE_KEYS.tasks, JSON.stringify(tasks));
  }

  /* --- operasi jadwal (immutable) --- */
  addSchedule(data) {
    this.setState({ schedule: [...this.state.schedule, new ScheduleItem(data)] });
  }

  updateSchedule({ id, ...changes }) {
    this.setState({
      schedule: this.state.schedule.map((item) => (item.id === id ? new ScheduleItem({ ...item, ...changes }) : item)),
    });
  }

  removeSchedule(id) {
    this.setState({ schedule: this.state.schedule.filter((item) => item.id !== id) });
  }

  /* --- operasi tugas (immutable) --- */
  addTask(data) {
    this.setState({ tasks: [...this.state.tasks, new TaskItem(data)] });
  }

  updateTask({ id, ...changes }) {
    this.setState({
      tasks: this.state.tasks.map((item) => (item.id === id ? new TaskItem({ ...item, ...changes }) : item)),
    });
  }

  toggleTask(id) {
    const target = this.state.tasks.find((item) => item.id === id);
    if (target) this.updateTask({ id, done: !target.done });
  }

  removeTask(id) {
    this.setState({ tasks: this.state.tasks.filter((item) => item.id !== id) });
  }

  /* --- fetch data eksternal (async/await) --- */
  async loadQuote() {
    try {
      const response = await fetch(QUOTE_URL);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      this.showQuote(await response.json());
    } catch (error) {
      console.warn('Kutipan gagal dimuat:', error.message);
      this.showQuote(FALLBACK_QUOTE);
    }
  }

  showQuote({ quote, author }) {
    this.els.quote.textContent = `"${quote}" - ${author}`;
  }

  /* --- event --- */
  bindEvents() {
    document.addEventListener('click', (event) => {
      const el = event.target.closest('[data-action]');
      if (!el) return;
      const { action, id, day, view, course } = el.dataset;

      const handlers = {
        tab: () => this.setState({ view }),
        'add-schedule': () => this.openScheduleForm({ day: Number(day) }),
        'edit-schedule': () => this.openScheduleForm({ item: this.state.schedule.find((s) => s.id === id) }),
        'delete-schedule': () => {
          const item = this.state.schedule.find((s) => s.id === id);
          if (item && confirm(`Hapus jadwal "${item.course}"?`)) this.removeSchedule(id);
        },
        'add-task': () => this.openTaskForm(),
        'edit-task': () => this.openTaskForm({ item: this.state.tasks.find((t) => t.id === id) }),
        'delete-task': () => {
          const item = this.state.tasks.find((t) => t.id === id);
          if (item && confirm(`Hapus tugas "${item.title}"?`)) this.removeTask(id);
        },
        'pick-course': () => {
          const { course: input } = this.els.taskForm.elements;
          input.value = course;
          input.focus();
        },
        'close-dialog': () => el.closest('dialog').close(),
      };
      handlers[action]?.();
    });

    document.addEventListener('change', (event) => {
      const { action, id } = event.target.dataset;
      if (action === 'toggle-task') this.toggleTask(id);
    });

    this.els.scheduleForm.addEventListener('submit', (event) => this.submitSchedule(event));
    this.els.taskForm.addEventListener('submit', (event) => this.submitTask(event));
  }

  /* --- form jadwal --- */
  openScheduleForm({ day = 0, item = null } = {}) {
    const { scheduleForm, scheduleDialog, scheduleTitle, scheduleError } = this.els;
    scheduleForm.reset();
    scheduleError.textContent = '';
    scheduleTitle.textContent = item ? 'Edit jadwal' : `Tambah jadwal ${DAYS[day]}`;
    const values = item ?? { id: '', day, course: '', room: '', start: '', end: '' };
    Object.entries(values).forEach(([name, value]) => {
      if (scheduleForm.elements[name]) scheduleForm.elements[name].value = value;
    });
    scheduleDialog.showModal();
  }

  submitSchedule(event) {
    event.preventDefault();
    const { scheduleForm, scheduleDialog, scheduleError } = this.els;
    const data = Object.fromEntries(new FormData(scheduleForm));
    const { course, room, start, end, id } = data;

    if (![course, room, start, end].every((v) => v?.trim())) {
      scheduleError.textContent = 'Isi semua kolom sebelum menyimpan.';
      return;
    }
    if (end <= start) {
      scheduleError.textContent = 'Jam selesai harus lebih lambat dari jam mulai.';
      return;
    }
    id ? this.updateSchedule(data) : this.addSchedule({ ...data, id: undefined });
    scheduleDialog.close();
  }

  /* --- form tugas --- */
  openTaskForm({ item = null } = {}) {
    const { taskForm, taskDialog, taskTitle, taskError } = this.els;
    taskForm.reset();
    taskError.textContent = '';
    taskTitle.textContent = item ? 'Edit tugas' : 'Tambah tugas';
    this.renderCoursePicker();
    const values = item ?? { id: '', title: '', course: '', deadline: '', description: '' };
    Object.entries(values).forEach(([name, value]) => {
      if (taskForm.elements[name] && typeof value !== 'boolean') taskForm.elements[name].value = value;
    });
    taskDialog.showModal();
  }

  renderCoursePicker() {
    const courses = [...new Set(this.state.schedule.map(({ course }) => course))]
      .sort((a, b) => a.localeCompare(b));

    this.els.coursePicker.innerHTML = courses.length
      ? `<span class="picker__label">Pilih dari jadwal:</span>
         ${courses.map((name) => `<button type="button" class="chip chip--btn" data-action="pick-course" data-course="${esc(name)}">${esc(name)}</button>`).join('')}`
      : '<span class="picker__label">Tambahkan kelas di tab Jadwal agar muncul di sini.</span>';
  }

  submitTask(event) {
    event.preventDefault();
    const { taskForm, taskDialog, taskError } = this.els;
    const data = Object.fromEntries(new FormData(taskForm));
    const { title, course, deadline, id } = data;

    if (![title, course, deadline].every((v) => v?.trim())) {
      taskError.textContent = 'Nama tugas, mata kuliah, dan deadline wajib diisi.';
      return;
    }
    id ? this.updateTask(data) : this.addTask({ ...data, id: undefined });
    taskDialog.close();
  }

  /* --- render (template literals) --- */
  render() {
    const { view, schedule, tasks } = this.state;

    document.querySelectorAll('.tab').forEach((tab) => {
      const active = tab.dataset.view === view;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
    });
    document.getElementById('view-jadwal').hidden = view !== 'jadwal';
    document.getElementById('view-tugas').hidden = view !== 'tugas';

    this.els.badge.textContent = tasks.filter(({ done }) => !done).length;
    this.renderSchedule(schedule);
    this.renderTasks(tasks);
  }

  renderSchedule(schedule) {
    const today = todayIndex();
    this.els.week.innerHTML = DAYS.map((name, index) => {
      const items = schedule
        .filter(({ day }) => day === index)
        .sort((a, b) => a.start.localeCompare(b.start));

      const body = items.length
        ? `<ul class="list">${items.map((item) => this.scheduleTemplate(item)).join('')}</ul>`
        : '<p class="empty">Belum ada kelas.</p>';

      return `
        <article class="day ${index === today ? 'is-today' : ''}">
          <div class="day__head">
            <h3>${name}</h3>
            <button class="icon-btn" data-action="add-schedule" data-day="${index}" aria-label="Tambah jadwal hari ${name}">+</button>
          </div>
          ${body}
        </article>`;
    }).join('');
  }

  scheduleTemplate({ id, course, room, timeLabel }) {
    return `
      <li class="slot">
        <div class="slot__time">${esc(timeLabel)}</div>
        <div class="slot__course">${esc(course)}</div>
        <div class="slot__room">${esc(room)}</div>
        <div class="slot__actions">
          <button class="link-btn" data-action="edit-schedule" data-id="${id}">Edit</button>
          <button class="link-btn link-btn--danger" data-action="delete-schedule" data-id="${id}">Hapus</button>
        </div>
      </li>`;
  }

  renderTasks(tasks) {
    if (!tasks.length) {
      this.els.tasks.innerHTML = '<li class="empty">Belum ada tugas. Tekan "Tambahkan tugas" untuk mencatat yang pertama.</li>';
      return;
    }
    const sorted = [...tasks].sort((a, b) => a.done - b.done || a.deadlineDate - b.deadlineDate);
    this.els.tasks.innerHTML = sorted.map((task) => this.taskTemplate(task)).join('');
  }

  taskTemplate({ id, title, course, deadlineLabel, description, done, status }) {
    return `
      <li class="task ${done ? 'is-done' : ''}">
        <input type="checkbox" data-action="toggle-task" data-id="${id}" ${done ? 'checked' : ''} aria-label="Tandai ${esc(title)} selesai">
        <div>
          <div class="task__title">${esc(title)}</div>
          <div class="task__meta">
            <span class="chip">${esc(course)}</span>
            <span>${esc(deadlineLabel)}</span>
            ${done ? '' : `<span class="due ${status.cls}">${status.text}</span>`}
          </div>
          ${description ? `<p class="task__desc">${esc(description)}</p>` : ''}
          <div class="task__actions">
            <button class="link-btn" data-action="edit-task" data-id="${id}">Edit tugas</button>
            <button class="link-btn link-btn--danger" data-action="delete-task" data-id="${id}">Hapus tugas</button>
          </div>
        </div>
      </li>`;
  }
}

/* ---------- Jalankan ---------- */
const app = new DashboardApp();
app.init();
