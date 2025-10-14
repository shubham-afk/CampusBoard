// src/Pages/AllNotices.jsx
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
import { useUser } from "@/context/UserContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useNotices } from "@/context/NoticeContext";

export default function AllNotices() {
  const { user } = useUser();
  const { notices, loading, error, deleteNotice } = useNotices();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const filteredNotices = notices
    .filter((n) => n.category !== "lost" && n.category !== "found")
    .filter((notice) => {
      const matchesSearch = [notice.title, notice.author, notice.department]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        filterCategory === "all" || notice.category === filterCategory;

      return matchesSearch && matchesCategory;
    });

  return (
    <div className="w-full h-full min-h-screen p-6 bg-slate-50">
      <Card className="w-full h-full shadow-md border border-slate-200 rounded-xl flex flex-col">
        <CardHeader className="pb-4 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-semibold text-indigo-700 tracking-tight">
              📋 All Notices
            </CardTitle>
          </div>
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
                {/* No 'lost-found' here anymore */}
                <SelectItem value="event">Event</SelectItem>
                <SelectItem value="sale">Sale</SelectItem>
                <SelectItem value="job">Job</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* States */}
          {loading && <div className="text-sm text-gray-600">Loading...</div>}
          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
              {error}
            </div>
          )}

          {/* Table */}
          {!loading && (
            <div className="overflow-x-auto rounded-lg flex-1">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50 hover:bg-slate-100">
                    <TableHead className="w-[30%]">Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
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
                      <TableCell>{notice.date}</TableCell>
                      <TableCell>{notice.time}</TableCell>
                      <TableCell className="text-right">
                        {user?.role === "admin" && (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteNotice(notice.id)}
                          >
                            Delete
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {filteredNotices.length === 0 && !loading && (
                <div className="text-center py-10 text-gray-500">
                  No notices found.
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
