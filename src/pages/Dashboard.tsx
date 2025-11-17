import MetricCard from "@/components/MetricCard";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, TrendingUp, DollarSign, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChartCard from "@/components/ChartCard";

export default function Dashboard() {
  const enrollmentData = [
    { name: 'Jan', value: 120 },
    { name: 'Feb', value: 190 },
    { name: 'Mar', value: 280 },
    { name: 'Apr', value: 250 },
    { name: 'May', value: 320 },
    { name: 'Jun', value: 410 }
  ];

  const recentActivity = [
    { student: "Emma Wilson", action: "Completed", course: "Web Development Bootcamp", time: "2 hours ago" },
    { student: "James Smith", action: "Enrolled in", course: "Data Science & ML", time: "4 hours ago" },
    { student: "Sophia Chen", action: "Started", course: "Digital Marketing", time: "5 hours ago" },
    { student: "Liam Brown", action: "Completed", course: "Business Management", time: "1 day ago" }
  ];

  const topCourses = [
    { name: "Complete Web Development", students: 1245, completion: 78 },
    { name: "Data Science & Machine Learning", students: 892, completion: 65 },
    { name: "Digital Marketing Masterclass", students: 756, completion: 82 },
    { name: "Business Leadership", students: 634, completion: 71 }
  ];

  return (
    <div className="space-y-8 p-5">
      <div>
        <h1 className="text-3xl font-bold" data-testid="text-page-title">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Total Students" 
          value="2,847" 
          change="+12% from last month" 
          changeType="positive"
          icon={Users}
        />
        <MetricCard 
          title="Active Courses" 
          value="42" 
          change="+3 new courses" 
          changeType="positive"
          icon={BookOpen}
        />
        <MetricCard 
          title="Completion Rate" 
          value="73%" 
          change="+5% from last month" 
          changeType="positive"
          icon={TrendingUp}
        />
        <MetricCard 
          title="Revenue" 
          value="$48,392" 
          change="+18% from last month" 
          changeType="positive"
          icon={DollarSign}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartCard title="Student Enrollment Trend" data={enrollmentData} />
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Performing Courses</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topCourses.map((course, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{course.name}</p>
                  <span className="text-xs text-muted-foreground">{course.students} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all"
                      style={{ width: `${course.completion}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium">{course.completion}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4 flex-wrap">
          <CardTitle className="text-lg">Recent Activity</CardTitle>
          <Button variant="outline" size="sm" data-testid="button-view-all">
            View All
            <ArrowUpRight className="h-4 w-4 ml-1" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0">
                <div>
                  <p className="text-sm">
                    <span className="font-medium">{activity.student}</span>
                    {' '}{activity.action}{' '}
                    <span className="text-muted-foreground">{activity.course}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
