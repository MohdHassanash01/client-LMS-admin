import { useState } from "react";
import CourseCard from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";



export default function Courses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const courses = [
    {
      id: "1",
      title: "Complete Web Development Bootcamp",
      instructor: "Sarah Johnson",
      // thumbnail: webDevThumb,
      studentCount: 1245,
      lessonCount: 48,
      progress: 67,
      status: "published" as const
    },
    {
      id: "2",
      title: "Data Science & Machine Learning",
      instructor: "Dr. Michael Chen",
      // thumbnail: dataThumb,
      studentCount: 892,
      lessonCount: 36,
      progress: 45,
      status: "published" as const
    },
    {
      id: "3",
      title: "Business Management Essentials",
      instructor: "Robert Martinez",
      // thumbnail: businessThumb,
      studentCount: 634,
      lessonCount: 24,
      progress: 82,
      status: "published" as const
    },
    {
      id: "4",
      title: "Digital Marketing Masterclass",
      instructor: "Emily Taylor",
      // thumbnail: marketingThumb,
      studentCount: 756,
      lessonCount: 30,
      progress: 58,
      status: "published" as const
    },
    {
      id: "5",
      title: "Advanced React Patterns",
      instructor: "Sarah Johnson",
      // thumbnail: webDevThumb,
      studentCount: 423,
      lessonCount: 22,
      progress: 34,
      status: "draft" as const
    },
    {
      id: "6",
      title: "Python for Beginners",
      instructor: "Dr. Michael Chen",
      // thumbnail: dataThumb,
      studentCount: 987,
      lessonCount: 40,
      progress: 71,
      status: "published" as const
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || course.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 p-5">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold" data-testid="text-page-title">Courses</h1>
          <p className="text-muted-foreground mt-1">Manage all your courses in one place</p>
        </div>
        <Button data-testid="button-create-course">
          <Plus className="h-4 w-4 mr-2" />
          Create Course
        </Button>
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
            data-testid="input-search-courses"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]" data-testid="select-status-filter">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Courses</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No courses found</p>
        </div>
      )}
    </div>
  );
}
