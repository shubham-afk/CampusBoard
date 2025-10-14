// // Pages/LostFound.jsx
// import React from "react";
// import { useNotices } from "@/context/NoticeContext";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { motion } from "framer-motion";

// export default function LostFound() {
//   const { notices } = useNotices();

//   // Filter only "lost" or "found" posts
//   const lostFoundNotices = notices.filter(
//     (notice) => notice.category === "lost" || notice.category === "found"
//   );

//   return (
//     <div className="w-full min-h-screen bg-gradient-to-b from-indigo-50 to-white p-8">
//       <h1 className="text-3xl font-bold text-indigo-700 mb-8 text-center">
//         🧳 Lost & Found
//       </h1>

//       {lostFoundNotices.length === 0 ? (
//         <div className="text-center text-gray-500 text-lg mt-10">
//           No Lost or Found notices yet.
//         </div>
//       ) : (
//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//           {lostFoundNotices.map((notice, index) => (
//             <motion.div
//               key={notice.id}
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.05 }}
//               whileHover={{ scale: 1.05, y: -5 }}
//               className="cursor-pointer"
//             >
//               <Card className="shadow-lg border border-indigo-100 hover:shadow-2xl transition-all duration-300 rounded-2xl">
//                 <CardHeader className="bg-indigo-600 text-white rounded-t-2xl">
//                   <CardTitle className="text-lg font-semibold">
//                     {notice.category === "lost" ? "🕵️ Lost Item" : "🎉 Found Item"}
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="p-4 space-y-2">
//                   <h2 className="font-bold text-lg text-gray-800">
//                     {notice.title}
//                   </h2>
//                   <p className="text-sm text-gray-600">
//                     <span className="font-medium">Author:</span> {notice.author}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     <span className="font-medium">Department:</span>{" "}
//                     {notice.department}
//                   </p>
//                   <div className="flex justify-between text-sm text-gray-500 mt-3">
//                     <span>{notice.date}</span>
//                     <span>{notice.time}</span>
//                   </div>
//                   {/* <div className="mt-3">
//                     <span
//                       className={`px-3 py-1 text-xs rounded-full ${
//                         notice.status === "active"
//                           ? "bg-green-100 text-green-700"
//                           : "bg-gray-200 text-gray-600"
//                       }`}
//                     >
//                       {notice.status}
//                     </span>
//                   </div> */}
//                 </CardContent>
//               </Card>
//             </motion.div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
import React from "react";
import { useNotices } from "@/context/NoticeContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function LostFound() {     // ✅ MUST include "export default"
  const { notices, loading, error } = useNotices();

  // Filter only "lost" or "found" posts
  const lostFoundNotices = notices.filter(
    (notice) => notice.category === "lost" || notice.category === "found"
  );

  if (loading)
    return <div className="text-center text-gray-500 mt-10">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load Lost & Found notices.
      </div>
    );

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-indigo-50 to-white p-8">
      <h1 className="text-3xl font-bold text-indigo-700 mb-8 text-center">
        🧳 Lost & Found
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
                <CardHeader className="bg-indigo-600 text-white rounded-t-2xl">
                  <CardTitle className="text-lg font-semibold">
                    {notice.category === "lost"
                      ? "🕵️ Lost Item"
                      : "🎉 Found Item"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-2">
                  <h2 className="font-bold text-lg text-gray-800">
                    {notice.title}
                  </h2>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Author:</span> {notice.author}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Department:</span>{" "}
                    {notice.department}
                  </p>
                  <div className="flex justify-between text-sm text-gray-500 mt-3">
                    <span>{notice.date}</span>
                    <span>{notice.time}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
