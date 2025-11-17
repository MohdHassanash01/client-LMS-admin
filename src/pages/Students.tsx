import { useState } from "react";
import StudentTable from "@/components/StudentTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Download } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Students() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const students = [
    {
      id: "1",
      name: "Emma Wilson",
      email: "emma.wilson@example.com",
      enrolledCourses: 3,
      progress: 78,
      status: "active" as const,
      joinDate: "Jan 15, 2024"
    },
    {
      id: "2",
      name: "James Smith",
      email: "james.smith@example.com",
      enrolledCourses: 5,
      progress: 92,
      status: "active" as const,
      joinDate: "Dec 8, 2023"
    },
    {
      id: "3",
      name: "Sophia Chen",
      email: "sophia.chen@example.com",
      enrolledCourses: 2,
      progress: 45,
      status: "active" as const,
      joinDate: "Feb 3, 2024"
    },
    {
      id: "4",
      name: "Liam Brown",
      email: "liam.brown@example.com",
      enrolledCourses: 4,
      progress: 67,
      status: "active" as const,
      joinDate: "Nov 22, 2023"
    },
    {
      id: "5",
      name: "Olivia Davis",
      email: "olivia.davis@example.com",
      enrolledCourses: 1,
      progress: 23,
      status: "inactive" as const,
      joinDate: "Mar 10, 2024"
    },
    {
      id: "6",
      name: "Noah Martinez",
      email: "noah.martinez@example.com",
      enrolledCourses: 6,
      progress: 88,
      status: "active" as const,
      joinDate: "Oct 5, 2023"
    },
    {
      id: "7",
      name: "Ava Thompson",
      email: "ava.thompson@example.com",
      enrolledCourses: 3,
      progress: 56,
      status: "active" as const,
      joinDate: "Jan 28, 2024"
    },
    {
      id: "8",
      name: "Ethan Garcia",
      email: "ethan.garcia@example.com",
      enrolledCourses: 2,
      progress: 34,
      status: "suspended" as const,
      joinDate: "Dec 15, 2023"
    }
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || student.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 p-5">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold" data-testid="text-page-title">Students</h1>
          <p className="text-muted-foreground mt-1">Manage student enrollments and track progress</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" data-testid="button-export">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button data-testid="button-add-student">
            <Plus className="h-4 w-4 mr-2" />
            Add Student
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
            data-testid="input-search-students"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]" data-testid="select-status-filter">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Students</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <StudentTable students={filteredStudents} />

      {filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No students found</p>
        </div>
      )}
    </div>
  );
}
