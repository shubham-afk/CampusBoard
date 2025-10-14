import { Link } from "react-router-dom";
import logo from "../Logo/Logo.png";

export default function Sidebar() {
  return (
    <aside className="bg-gradient-to-b from-slate-800 to-slate-700 text-white w-64 h-screen fixed top-0 left-0 z-50">
      <Link
        to="/"
        className="flex flex-col items-center justify-center pt-6 pb-4 border-b border-slate-700 cursor-pointer hover:bg-slate-700 transition"
      >
        <img
          src={logo}
          alt="CampusBoard Logo"
          className="h-10 w-10 object-contain mb-2"
        />
        <span className="text-2xl font-bold text-indigo-400">CampusBoard</span>
      </Link>
      <nav className="flex flex-col space-y-3 pt-10 px-4">
        <Link
          to="/allnotices"
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-amber-400 hover:text-slate-800 transition-all font-semibold"
        >
          📋 All Notices
        </Link>
        <Link
          to="/createpost"
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-amber-400 hover:text-slate-800 transition-all font-semibold"
        >
          ➕ Create Post
        </Link>
        <Link
          to="/lostfound"
          className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-amber-400 hover:text-slate-800 transition-all font-semibold"
        >
          🧳 Lost & Found
        </Link>

      </nav>
    </aside>
  );
}
