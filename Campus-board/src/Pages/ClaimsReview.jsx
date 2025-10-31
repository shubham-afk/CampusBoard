// src/Pages/ClaimsReview.jsx
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNotices } from "@/context/NoticeContext";
import { useUser } from "@/context/UserContext";

export default function ClaimsReview() {
  const { fetchPendingClaims, approveClaim, rejectClaim } = useNotices();
  const { user } = useUser();
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    if (user?.role === "admin") load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const load = async () => {
    const data = await fetchPendingClaims();
    setClaims(data || []);
  };

  const onApprove = async (id) => {
    try {
      await approveClaim(id);
      await load();
      alert("Approved.");
    } catch (e) {
      alert(e.message || "Failed to approve.");
    }
  };

  const onReject = async (id) => {
    try {
      await rejectClaim(id);
      await load();
      alert("Rejected.");
    } catch (e) {
      alert(e.message || "Failed to reject.");
    }
  };

  if (user?.role !== "admin") {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="bg-white p-6 rounded shadow text-center">
          <h2 className="text-xl font-semibold text-indigo-700">Access denied</h2>
          <p className="text-sm text-gray-600 mt-2">Only admins can review claims.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">🕵️ Claims (Under Review)</h1>
      {claims.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">No pending claims.</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {claims.map((c) => (
            <Card key={c.id} className="shadow-md border border-indigo-100">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-indigo-700">{c.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-1">
                <p><strong>Author:</strong> {c.author}</p>
                <p><strong>Department:</strong> {c.department}</p>
                <p><strong>Requested by:</strong> {c.claim_requested_by}</p>
                <p className="text-sm text-gray-500">{c.date} • {c.time}</p>

                <div className="flex gap-2 mt-3">
                  <Button onClick={() => onApprove(c.id)} className="bg-green-600 hover:bg-green-700 text-white">
                    Approve
                  </Button>
                  <Button variant="destructive" onClick={() => onReject(c.id)}>
                    Reject
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
