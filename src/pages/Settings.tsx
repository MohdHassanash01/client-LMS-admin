import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function Settings() {
  return (
    <div className="space-y-8 max-w-4xl p-6">
      <div>
        <h1 className="text-3xl font-bold" data-testid="text-page-title">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your platform settings and preferences</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Platform Information</CardTitle>
          <CardDescription>Update your platform details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="platform-name">Platform Name</Label>
            <Input id="platform-name" defaultValue="LearnHub" data-testid="input-platform-name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-email">Admin Email</Label>
            <Input id="admin-email" type="email" defaultValue="admin@learnhub.com" data-testid="input-admin-email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="support-email">Support Email</Label>
            <Input id="support-email" type="email" defaultValue="support@learnhub.com" data-testid="input-support-email" />
          </div>
          <Button data-testid="button-save-info">Save Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Configure email notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>New Student Enrollments</Label>
              <p className="text-sm text-muted-foreground">Receive notifications when students enroll</p>
            </div>
            <Switch defaultChecked data-testid="switch-enrollment-notifications" />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Course Completion</Label>
              <p className="text-sm text-muted-foreground">Get notified when students complete courses</p>
            </div>
            <Switch defaultChecked data-testid="switch-completion-notifications" />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Weekly Reports</Label>
              <p className="text-sm text-muted-foreground">Receive weekly analytics reports</p>
            </div>
            <Switch data-testid="switch-weekly-reports" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Course Settings</CardTitle>
          <CardDescription>Configure default course settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Auto-publish Courses</Label>
              <p className="text-sm text-muted-foreground">Automatically publish new courses</p>
            </div>
            <Switch data-testid="switch-auto-publish" />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable Course Reviews</Label>
              <p className="text-sm text-muted-foreground">Allow students to review courses</p>
            </div>
            <Switch defaultChecked data-testid="switch-course-reviews" />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Certificate Generation</Label>
              <p className="text-sm text-muted-foreground">Generate certificates on course completion</p>
            </div>
            <Switch defaultChecked data-testid="switch-certificates" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
