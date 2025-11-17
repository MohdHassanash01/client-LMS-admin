import ChartCard from "@/components/ChartCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Pie, PieChart, Cell } from "recharts";

export default function Analytics() {
  const enrollmentData = [
    { name: 'Jan', value: 120 },
    { name: 'Feb', value: 190 },
    { name: 'Mar', value: 280 },
    { name: 'Apr', value: 250 },
    { name: 'May', value: 320 },
    { name: 'Jun', value: 410 }
  ];

  const completionData = [
    { name: 'Web Dev', value: 78 },
    { name: 'Data Science', value: 65 },
    { name: 'Marketing', value: 82 },
    { name: 'Business', value: 71 },
    { name: 'Design', value: 58 }
  ];

  const categoryData = [
    { name: 'Technology', value: 45, color: 'hsl(var(--chart-1))' },
    { name: 'Business', value: 25, color: 'hsl(var(--chart-2))' },
    { name: 'Design', value: 20, color: 'hsl(var(--chart-3))' },
    { name: 'Marketing', value: 10, color: 'hsl(var(--chart-4))' }
  ];

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold" data-testid="text-page-title">Analytics</h1>
        <p className="text-muted-foreground mt-1">Track performance metrics and trends</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Student Enrollment Trend" data={enrollmentData} />
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Course Completion Rates</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={completionData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis 
                  dataKey="name" 
                  className="text-xs"
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis 
                  className="text-xs"
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }}
                />
                <Bar 
                  dataKey="value" 
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Course Categories Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={(entry) => `${entry.name}: ${entry.value}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Key Performance Indicators</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Average Course Rating</span>
                <span className="text-2xl font-bold font-mono">4.7/5</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: '94%' }} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Student Satisfaction</span>
                <span className="text-2xl font-bold font-mono">89%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: '89%' }} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Instructor Response Rate</span>
                <span className="text-2xl font-bold font-mono">92%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: '92%' }} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Average Completion Time</span>
                <span className="text-2xl font-bold font-mono">6.5w</span>
              </div>
              <p className="text-xs text-muted-foreground">weeks per course</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
