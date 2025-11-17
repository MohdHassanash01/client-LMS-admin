import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreVertical, Users, BookOpen } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CourseCardProps {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  studentCount: number;
  lessonCount: number;
  progress: number;
  status: "published" | "draft" | "archived";
}

export default function CourseCard({ 
  title, 
  instructor, 
  thumbnail, 
  studentCount, 
  lessonCount,
  progress, 
  status 
}: CourseCardProps) {
  const statusColors = {
    published: "bg-green-500/10 text-green-700 dark:text-green-400",
    draft: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
    archived: "bg-gray-500/10 text-gray-700 dark:text-gray-400"
  };

  return (
    <Card className="overflow-hidden hover-elevate">
      <div className="aspect-video relative overflow-hidden bg-muted">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge className={statusColors[status]} data-testid={`badge-status-${status}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg line-clamp-2" data-testid="text-course-title">{title}</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" data-testid="button-course-menu">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem data-testid="menu-item-edit">Edit</DropdownMenuItem>
              <DropdownMenuItem data-testid="menu-item-duplicate">Duplicate</DropdownMenuItem>
              <DropdownMenuItem data-testid="menu-item-archive">Archive</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <p className="text-sm text-muted-foreground" data-testid="text-instructor">by {instructor}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span data-testid="text-student-count">{studentCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span data-testid="text-lesson-count">{lessonCount} lessons</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Completion</span>
            <span className="font-medium" data-testid="text-progress">{progress}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button variant="outline" className="w-full" data-testid="button-view-course">
          View Course
        </Button>
      </CardFooter>
    </Card>
  );
}
