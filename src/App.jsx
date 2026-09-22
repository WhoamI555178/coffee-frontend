import { Routes, Route, Link } from 'react-router-dom';
import Menu from './components/Menu';
import Cart from './components/Cart';
import Admin from './components/Admin';

function App() {
  return (
    <div className="min-h-screen bg-[#fdf8f5]">
      {/* навігаційна панель */}
      <nav className="bg-amber-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold tracking-wider">☕ Кав'ярня</Link>
          <div className="space-x-6 font-semibold">
            <Link to="/" className="hover:text-amber-200">Меню</Link>
            <Link to="/cart" className="hover:text-amber-200">Кошик 🛒</Link>
            <Link to="/admin" className="hover:text-amber-200">Адмінка ⚙️</Link>
          </div>
        </div>
      </nav>

      {/* маршрутизація сторінок */}
      <div className="pt-6">
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;