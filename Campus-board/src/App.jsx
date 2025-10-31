// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { NoticeProvider } from "./context/NoticeContext";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Default from "./Pages/Default";
import AllNotices from "./Pages/AllNotices";
import CreatePost from "./Pages/CreatePost";
import LostFound from "./Pages/LostFound";
import { UserProvider, useUser } from "./context/UserContext";
import Login from "./Pages/Login";
import ClaimedItems from "./Pages/ClaimedItems";
import Signup from "./Pages/Signup";
import ClaimsReview from "./Pages/ClaimsReview";

import "./App.css";

// Wrapper to protect routes
function ProtectedRoute({ children }) {
  const { user } = useUser();
  return user ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  const { user } = useUser();
  return (
    <Routes>
      {/* Redirect root to login if not logged in */}
      <Route path="/" element={user ? <Default /> : <Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/allnotices"
        element={
          <ProtectedRoute>
            <AllNotices />
          </ProtectedRoute>
        }
      />
      <Route
        path="/createpost"
        element={
          <ProtectedRoute>
            {user?.role === "admin" ? <CreatePost /> : <Navigate to="/allnotices" replace />}
          </ProtectedRoute>
        }
      />
      <Route
        path="/lostfound"
        element={
          <ProtectedRoute>
            <LostFound />
          </ProtectedRoute>
        }
      />
      <Route
        path="/claimed"
        element={
          <ProtectedRoute>
            <ClaimedItems />
          </ProtectedRoute>
        }
      />
      {/* NEW: Claims review route */}
      <Route
        path="/claims"
        element={
          <ProtectedRoute>
            {user?.role === "admin" ? <ClaimsReview /> : <Navigate to="/allnotices" replace />}
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <UserProvider>
      <NoticeProvider>
        <Router>
          <div className="flex">
            <Sidebar />
            <div className="ml-64 flex flex-col min-h-screen w-full">
              <main className="flex-1 min-h-screen bg-gray-100 overflow-y-auto p-4">
                <AppRoutes />
              </main>
            </div>
          </div>
        </Router>
      </NoticeProvider>
    </UserProvider>
  );
}

export default App;
