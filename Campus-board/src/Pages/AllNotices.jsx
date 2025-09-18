// Pages/AllNotices.jsx
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNotices } from "@/context/NoticeContext";

export default function AllNotices() {
  const { notices } = useNotices();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Apply search + filtering
  const filteredNotices = notices.filter((notice) => {
    const matchesSearch = [notice.title, notice.author, notice.department]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      filterCategory === "all" || notice.category === filterCategory;

    const matchesStatus =
      filterStatus === "all" || notice.status === filterStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="w-full h-full min-h-screen p-6 bg-slate-50">
      <Card className="w-full h-full shadow-md border border-slate-200 rounded-xl flex flex-col">
        <CardHeader className="pb-4 border-b border-slate-200">
          <CardTitle className="text-2xl font-semibold text-indigo-700 tracking-tight">
            📋 All Notices
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 overflow-auto p-6 flex flex-col gap-4">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <Input
              type="text"
              placeholder="Search by title, author, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md"
            />

            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="lost-found">Lost/Found</SelectItem>
                <SelectItem value="event">Event</SelectItem>
                <SelectItem value="sale">Sale</SelectItem>
                <SelectItem value="job">Job</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-lg flex-1">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 hover:bg-slate-100">
                  <TableHead className="w-[30%]">Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNotices.map((notice) => (
                  <TableRow key={notice.id} className="hover:bg-indigo-50">
                    <TableCell className="font-medium">
                      {notice.title}
                    </TableCell>
                    <TableCell>{notice.author}</TableCell>
                    <TableCell>{notice.department}</TableCell>
                    <TableCell>{notice.category || "-"}</TableCell>
                    <TableCell>{notice.status || "active"}</TableCell>
                    <TableCell>{notice.date}</TableCell>
                    <TableCell>{notice.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filteredNotices.length === 0 && (
              <div className="text-center py-10 text-gray-500">
                No notices found.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
