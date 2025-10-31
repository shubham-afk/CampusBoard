// src/Pages/ClaimedItems.jsx
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const API_BASE =
  import.meta.env.VITE_API_URL?.replace(/\/+$/, "") || "http://127.0.0.1:8000";

export default function ClaimedItems() {
  const [claimed, setClaimed] = useState([]);

  const fetchClaimed = async () => {
    try {
      const res = await fetch(`${API_BASE}/claimed`);
      if (!res.ok) throw new Error("Failed to fetch claimed items");
      const data = await res.json();
      setClaimed(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchClaimed();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
        🧾 Claimed Items (Admin View)
      </h1>

      {claimed.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">No claimed items yet.</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {claimed.map((item) => (
            <Card key={item.id} className="shadow-md border border-indigo-100">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-indigo-700">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-1">
                <p>
                  <strong>Author:</strong> {item.author}
                </p>
                <p>
                  <strong>Department:</strong> {item.department}
                </p>
                <p>
                  <strong>Date:</strong> {item.date}
                </p>
                <p>
                  <strong>Time:</strong> {item.time}
                </p>
                <p className="text-green-700 font-medium">Claimed by: {item.claimed_by}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
