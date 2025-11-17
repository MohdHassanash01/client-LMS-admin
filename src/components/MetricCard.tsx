import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
}

export default function MetricCard({ title, value, change, changeType = "neutral", icon: Icon }: MetricCardProps) {
  const changeColor = 
    changeType === "positive" ? "text-green-600 dark:text-green-400" : 
    changeType === "negative" ? "text-red-600 dark:text-red-400" : 
    "text-muted-foreground";

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold font-mono">{value}</div>
        {change && (
          <p className={`text-xs mt-1 ${changeColor}`}>
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
