import { Link, Outlet } from 'react-router-dom';

export default function PlayerLayout() {
  return (
    <div className="flex h-screen">
      <nav className="w-64 bg-blue-800 text-white p-4">
        {/* relative URLs: “.” → /player, “archives” → /player/archives */}
        <Link to="."       className="block mb-2">Dashboard</Link>
        <Link to="archives" className="block">Bet Archives</Link>
      </nav>

      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
