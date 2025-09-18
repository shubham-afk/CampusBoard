// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NoticeProvider } from "./context/NoticeContext";

import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Default from "./Pages/Default";
import AllNotices from "./Pages/AllNotices";
import CreatePost from "./Pages/CreatePost";

import "./App.css";

function App() {
  return (
    <NoticeProvider>
      <Router>
        <div className="flex">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <div className="ml-64 flex flex-col min-h-screen w-full">
            {/* Header (if needed, can add here) */}
            {/* <Header /> */}

            <main className="flex-1 min-h-screen bg-gray-100 overflow-y-auto p-4">
              <Routes>
                <Route path="/" element={<Default />} />
                <Route path="/allnotices" element={<AllNotices />} />
                <Route path="/createpost" element={<CreatePost />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </NoticeProvider>
  );
}

export default App;
