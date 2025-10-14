// // Pages/CreatePost.jsx
// import React, { useState } from "react";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import { useNotices } from "@/context/NoticeContext";
// import { useNavigate } from "react-router-dom";

// export default function AddNoticeForm() {
//   const { addNotice } = useNotices();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     id: "",
//     title: "",
//     author: "",
//     date: "",
//     time: "",
//     department: "",
//     category: "lost",
//     // status: "active",
//   });

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.id]: e.target.value });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     addNotice(form);
//     navigate("/allnotices");
//   };

//   return (
//     <div className="flex items-center justify-center min-h-[80vh]">
//       <Card className="max-w-xl w-full shadow-lg border border-slate-200 rounded-xl">
//         <CardHeader>
//           <CardTitle className="text-indigo-700 text-2xl font-semibold">
//             ➕ Add New Notice
//           </CardTitle>
//         </CardHeader>

//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-5">
//             {["id", "title", "author", "date", "time", "department"].map(
//               (field) => (
//                 <div key={field} className="flex flex-col space-y-2">
//                   <Label htmlFor={field}>
//                     {field.charAt(0).toUpperCase() + field.slice(1)}
//                   </Label>
//                   <Input
//                     id={field}
//                     type={
//                       field === "id"
//                         ? "number"
//                         : field === "date"
//                           ? "date"
//                           : field === "time"
//                             ? "time"
//                             : "text"
//                     }
//                     value={form[field]}
//                     onChange={handleChange}
//                     placeholder={`Enter ${field}`}
//                   />
//                 </div>
//               )
//             )}

//             {/* Category */}
//             <div className="flex flex-col space-y-2">
//               <Label htmlFor="category">Category</Label>
//               <Select
//                 value={form.category}
//                 onValueChange={(val) => setForm({ ...form, category: val })}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select Category" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="lost">Lost</SelectItem>
//                   <SelectItem value="found">Found</SelectItem>
//                   <SelectItem value="event">Event</SelectItem>
//                   <SelectItem value="sale">Sale</SelectItem>
//                   <SelectItem value="job">Job</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Status */}
//             {/* <div className="flex flex-col space-y-2">
//               <Label htmlFor="status">Status</Label>
//               <Select
//                 value={form.status}
//                 onValueChange={(val) => setForm({ ...form, status: val })}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select Status" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="active">Active</SelectItem>
//                   <SelectItem value="resolved">Resolved</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div> */}

//             <CardFooter className="flex justify-end space-x-3 pt-4">
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => navigate("/allnotices")}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 type="submit"
//                 className="bg-indigo-600 hover:bg-indigo-700 text-white"
//               >
//                 Submit
//               </Button>
//             </CardFooter>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


// src/Pages/CreatePost.jsx
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useNotices } from "@/context/NoticeContext";
import { useNavigate } from "react-router-dom";

export default function AddNoticeForm() {
  const { addNotice } = useNotices();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    author: "",
    date: "",
    time: "",
    department: "",
    category: "lost",
  });
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setSubmitting(true);
    try {
      await addNotice(form);
      // Optional: redirect lost/found to /lostfound else /allnotices
      if (form.category === "lost" || form.category === "found")
        navigate("/lostfound");
      else navigate("/allnotices");
    } catch (e) {
      console.error(e);
      setErr("Failed to submit notice.");
    } finally {
      setSubmitting(false);
    }
  };

  const requiredMissing =
    !form.title || !form.author || !form.date || !form.time || !form.department;

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="max-w-xl w-full shadow-lg border border-slate-200 rounded-xl">
        <CardHeader>
          <CardTitle className="text-indigo-700 text-2xl font-semibold">
            ➕ Add New Notice
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {["title", "author", "date", "time", "department"].map((field) => (
              <div key={field} className="flex flex-col space-y-2">
                <Label htmlFor={field}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </Label>
                <Input
                  id={field}
                  type={
                    field === "date" ? "date" : field === "time" ? "time" : "text"
                  }
                  value={form[field]}
                  onChange={handleChange}
                  placeholder={`Enter ${field}`}
                  required
                />
              </div>
            ))}

            {/* Category */}
            <div className="flex flex-col space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={form.category}
                onValueChange={(val) => setForm({ ...form, category: val })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lost">Lost</SelectItem>
                  <SelectItem value="found">Found</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                  <SelectItem value="sale">Sale</SelectItem>
                  <SelectItem value="job">Job</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {err && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
                {err}
              </div>
            )}

            <CardFooter className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/allnotices")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                disabled={submitting || requiredMissing}
              >
                {submitting ? "Submitting..." : "Submit"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
