import { NavLink, Route, Routes } from 'react-router-dom';
import { BookProvider } from './context/BookContext.jsx';
import Home from './pages/Home/Home.jsx';
import Stats from './pages/Stats/Stats.jsx';

// Root aplikasi: Provider membungkus semua halaman, Routes mengatur navigasi
export default function App() {
  return (
    <BookProvider>
      <header className="app-header">
        <h1>Rak Buku Pribadi</h1>
        <nav>
          <NavLink to="/" end>Koleksi</NavLink>
          <NavLink to="/stats">Statistik</NavLink>
        </nav>
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="*" element={<p>Halaman tidak ditemukan.</p>} />
        </Routes>
      </main>
    </BookProvider>
  );
}
