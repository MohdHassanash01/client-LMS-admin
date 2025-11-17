import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Student {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  enrolledCourses: number;
  progress: number;
  status: "active" | "inactive" | "suspended";
  joinDate: string;
}

interface StudentTableProps {
  students: Student[];
}

export default function StudentTable({ students }: StudentTableProps) {
  const statusColors = {
    active: "bg-green-500/10 text-green-700 dark:text-green-400",
    inactive: "bg-gray-500/10 text-gray-700 dark:text-gray-400",
    suspended: "bg-red-500/10 text-red-700 dark:text-red-400"
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Enrolled Courses</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Join Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id} className="hover-elevate" data-testid={`row-student-${student.id}`}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={student.avatar} />
                    <AvatarFallback>{getInitials(student.name)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium" data-testid={`text-student-name-${student.id}`}>{student.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground" data-testid={`text-student-email-${student.id}`}>
                {student.email}
              </TableCell>
              <TableCell data-testid={`text-enrolled-${student.id}`}>{student.enrolledCourses}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all"
                      style={{ width: `${student.progress}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium" data-testid={`text-progress-${student.id}`}>{student.progress}%</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge className={statusColors[student.status]} data-testid={`badge-status-${student.id}`}>
                  {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground" data-testid={`text-join-date-${student.id}`}>
                {student.joinDate}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" data-testid={`button-student-menu-${student.id}`}>
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem data-testid="menu-item-view-profile">View Profile</DropdownMenuItem>
                    <DropdownMenuItem data-testid="menu-item-send-message">Send Message</DropdownMenuItem>
                    <DropdownMenuItem data-testid="menu-item-suspend">Suspend</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
