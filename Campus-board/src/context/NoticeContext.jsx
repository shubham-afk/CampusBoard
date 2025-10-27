

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
    const res = await fetch(`${API_BASE}/notices`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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

  // Optional: for editing support later (your backend can add PUT /notices/{id})
  const updateNotice = async (id, updates) => {
    const res = await fetch(`${API_BASE}/notices/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error(`PUT /notices/${id} failed: ${res.status}`);
    await fetchNotices();
  };

  // Optional: fetch single (if you add GET /notices/{id} later)
  const getNotice = async (id) => {
    const res = await fetch(`${API_BASE}/notices/${id}`);
    if (!res.ok) throw new Error(`GET /notices/${id} failed: ${res.status}`);
    return res.json();
  };

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
      }}
    >
      {children}
    </NoticeContext.Provider>
  );
};

export const useNotices = () => useContext(NoticeContext);
