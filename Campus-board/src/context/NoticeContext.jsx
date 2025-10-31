// src/context/NoticeContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const NoticeContext = createContext();

const API_BASE =
  import.meta.env.VITE_API_URL?.replace(/\/+$/, "") || "http://127.0.0.1:8000";

export const NoticeProvider = ({ children }) => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNotices = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`${API_BASE}/notices`);
      if (!res.ok) throw new Error(`GET /notices failed: ${res.status}`);
      const data = await res.json();
      setNotices(data);
    } catch (e) {
      console.error(e);
      setError("Failed to load notices.");
    } finally {
      setLoading(false);
    }
  };

  const addNotice = async (notice) => {
    // Backend auto-generates id; do NOT send user-provided id
    const payload = {
      title: notice.title,
      author: notice.author,
      department: notice.department,
      category: notice.category,
      date: notice.date,
      time: notice.time,
    };

    // include username header (read from localStorage) so backend can verify admin
    const stored = localStorage.getItem("user");
    const username = stored ? JSON.parse(stored).username : null;
    const headers = { "Content-Type": "application/json" };
    if (username) headers.username = username;

    const res = await fetch(`${API_BASE}/notices`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`POST /notices failed: ${res.status}`);
    await fetchNotices();
  };

  const deleteNotice = async (id) => {
    const res = await fetch(`${API_BASE}/notices/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error(`DELETE /notices/${id} failed: ${res.status}`);
    await fetchNotices();
  };

  const updateNotice = async (id, updates) => {
    const res = await fetch(`${API_BASE}/notices/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error(`PUT /notices/${id} failed: ${res.status}`);
    await fetchNotices();
  };

  const getNotice = async (id) => {
    const res = await fetch(`${API_BASE}/notices/${id}`);
    if (!res.ok) throw new Error(`GET /notices/${id} failed: ${res.status}`);
    return res.json();
  };

  // -------- new functions for claim workflow --------
  const requestClaim = async (id) => {
    try {
      const stored = localStorage.getItem("user");
      const username = stored ? JSON.parse(stored).username : null;
      if (!username) throw new Error("Not logged in");

      const res = await fetch(`${API_BASE}/notices/${id}/claim`, {
        method: "POST",
        headers: { "Content-Type": "application/json", username },
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || `Claim failed: ${res.status}`);
      }
      await fetchNotices();
      return true;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const fetchPendingClaims = async () => {
    try {
      const stored = localStorage.getItem("user");
      const username = stored ? JSON.parse(stored).username : null;
      const headers = username ? { username } : {};
      const res = await fetch(`${API_BASE}/claims`, { headers });
      if (!res.ok) throw new Error("Failed to fetch pending claims");
      return res.json();
    } catch (e) {
      console.error(e);
      return [];
    }
  };

  const approveClaim = async (id) => {
    try {
      const stored = localStorage.getItem("user");
      const username = stored ? JSON.parse(stored).username : null;
      const res = await fetch(`${API_BASE}/claims/${id}/approve`, {
        method: "POST",
        headers: { username },
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || `Approve failed: ${res.status}`);
      }
      await fetchNotices();
      return true;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const rejectClaim = async (id) => {
    try {
      const stored = localStorage.getItem("user");
      const username = stored ? JSON.parse(stored).username : null;
      const res = await fetch(`${API_BASE}/claims/${id}/reject`, {
        method: "POST",
        headers: { username },
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || `Reject failed: ${res.status}`);
      }
      await fetchNotices();
      return true;
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  // --------------------------------------------------

  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <NoticeContext.Provider
      value={{
        notices,
        loading,
        error,
        fetchNotices,
        addNotice,
        deleteNotice,
        updateNotice,
        getNotice,
        requestClaim,
        fetchPendingClaims,
        approveClaim,
        rejectClaim,
      }}
    >
      {children}
    </NoticeContext.Provider>
  );
};

export const useNotices = () => useContext(NoticeContext);
