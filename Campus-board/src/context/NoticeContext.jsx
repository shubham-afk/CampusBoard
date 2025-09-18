// context/NoticeContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const NoticeContext = createContext();

export const NoticeProvider = ({ children }) => {
  const [notices, setNotices] = useState(() => {
    const stored = localStorage.getItem("notices");
    return stored
      ? JSON.parse(stored)
      : [
          {
            id: 1,
            title: "PhD Viva Voice of Ms. Poonam S. Jindal (Biotechnology)",
            author: "Admin",
            date: "Yesterday",
            time: "02:00 PM",
            department: "Placement Office",
          },
          {
            id: 2,
            title:
              "Wipro Ltd. Ltd. Submission of Bio-data for pre-final year students",
            author: "Placement Office",
            date: "Yesterday",
            time: "01:00 PM",
            department: "Placement Office",
          },
        ];
  });

  // Persist notices to localStorage whenever changed
  useEffect(() => {
    localStorage.setItem("notices", JSON.stringify(notices));
  }, [notices]);

  // Add a new notice
  const addNotice = (notice) => {
    const newNotice = {
      ...notice,
      id:
        notice.id ||
        (notices.length > 0 ? notices[notices.length - 1].id + 1 : 1), // auto-increment
    };
    setNotices((prev) => [...prev, newNotice]);
  };

  return (
    <NoticeContext.Provider value={{ notices, addNotice }}>
      {children}
    </NoticeContext.Provider>
  );
};

export const useNotices = () => useContext(NoticeContext);
