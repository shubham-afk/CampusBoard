// src/Pages/LostFound.jsx
import React from "react";
import { useNotices } from "@/context/NoticeContext";
import { useUser } from "@/context/UserContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function LostFound() {
  const { notices, fetchNotices, requestClaim } = useNotices();
  const { user } = useUser();

  const lostFoundNotices = notices.filter(
    (n) => n.category === "lost" || n.category === "found"
  );

  const handleClaim = async (id) => {
    if (!user) {
      alert("Please log in to claim an item.");
      return;
    }

    try {
      await requestClaim(id);
      await fetchNotices();
      alert("✅ Claim submitted — the item is under review by admin.");
    } catch (e) {
      alert(e.message || "Failed to submit claim.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-indigo-50 to-white p-8">
      <h1 className="text-3xl font-bold text-indigo-700 mb-8 text-center">
        🕵️ Lost & Found
      </h1>

      {lostFoundNotices.length === 0 ? (
        <div className="text-center text-gray-500 text-lg mt-10">
          No Lost or Found notices yet.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {lostFoundNotices.map((notice, index) => (
            <motion.div
              key={notice.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="cursor-pointer"
            >
              <Card className="shadow-lg border border-indigo-100 hover:shadow-2xl transition-all duration-300 rounded-2xl">
                <CardHeader
                  className={`${
                    notice.category === "lost"
                      ? "bg-indigo-600"
                      : "bg-green-600"
                  } text-white rounded-t-2xl`}
                >
                  <CardTitle className="text-lg font-semibold">
                    {notice.category === "lost" ? "🕵️ Lost Item" : "🎉 Found Item"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-2">
                  <h2 className="font-bold text-lg text-gray-800">{notice.title}</h2>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Author:</span> {notice.author}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Department:</span> {notice.department}
                  </p>
                  <div className="flex justify-between text-sm text-gray-500 mt-3">
                    <span>{notice.date}</span>
                    <span>{notice.time}</span>
                  </div>

                  {/* Claim button visible when item is lost, not pending, not approved, and user is not admin */}
                  {notice.category === "lost" &&
                    notice.claim_status !== "pending" &&
                    !notice.claimed_by &&
                    user?.role !== "admin" && (
                      <Button
                        onClick={() => handleClaim(notice.id)}
                        className="w-full mt-3 bg-indigo-600 hover:bg-indigo-700 text-white"
                      >
                        Claim
                      </Button>
                    )}

                  {/* Under review */}
                  {notice.claim_status === "pending" && (
                    <div className="mt-3 text-sm font-medium text-amber-600">
                      ⏳ Under review
                      {notice.claim_requested_by ? ` — claimed by ${notice.claim_requested_by}` : ""}
                    </div>
                  )}

                  {/* Approved claimed */}
                  {notice.claim_status === "approved" && notice.claimed_by && (
                    <div className="mt-3 text-sm font-medium text-green-600">
                      ✅ Claimed by {notice.claimed_by}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
