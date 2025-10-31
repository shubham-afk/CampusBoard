// src/Components/Sidebar.jsx
import { Link, useNavigate } from "react-router-dom";
import logo from "../Logo/Logo.png";
import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  return (
    <aside className="bg-gradient-to-b from-slate-800 to-slate-700 text-white w-64 h-screen fixed top-0 left-0 z-50 flex flex-col justify-between">
      {/* Top Logo Section */}
      <div>
        <Link
          to="/"
          className="flex flex-col items-center justify-center pt-6 pb-4 border-b border-slate-700 cursor-pointer hover:bg-slate-700 transition"
        >
          <img
            src={logo}
            alt="CampusTalks Logo"
            className="h-10 w-10 object-contain mb-2"
          />
          <span className="text-2xl font-bold text-indigo-400">CampusTalks</span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-3 pt-10 px-4">
          <Link
            to="/allnotices"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-amber-400 hover:text-slate-800 transition-all font-semibold"
          >
            📋 All Notices
          </Link>

          <Link
            to="/lostfound"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-amber-400 hover:text-slate-800 transition-all font-semibold"
          >
            🕵️ Lost & Found
          </Link>

          {/* Create Post only visible to admin */}
          {user?.role === "admin" && (
            <Link
              to="/createpost"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-amber-400 hover:text-slate-800 transition-all font-semibold"
            >
              ➕ Create Post
            </Link>
          )}

          {user?.role === "admin" && (
            <Link
              to="/claimed"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-amber-400 hover:text-slate-800 transition-all font-semibold"
            >
              🧾 Claimed Items
            </Link>
          )}

          {/* NEW: Claims review page for admin */}
          {user?.role === "admin" && (
            <Link
              to="/claims"
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-amber-400 hover:text-slate-800 transition-all font-semibold"
            >
              🛠️ Claims (Review)
            </Link>
          )}
        </nav>
      </div>

      {/* User Info + Login/Logout Section */}
      <div className="border-t border-slate-700 p-4 text-sm">
        {user ? (
          <div className="flex flex-col gap-2">
            <div className="flex flex-col text-center">
              <span className="font-semibold text-indigo-300">{user.username}</span>
              <span className="text-slate-400 text-xs capitalize">{user.role}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="bg-white/10 text-white hover:bg-amber-400 hover:text-slate-800 transition"
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="bg-white/10 text-white hover:bg-amber-400 hover:text-slate-800 transition w-full"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        )}
      </div>
    </aside>
  );
}
