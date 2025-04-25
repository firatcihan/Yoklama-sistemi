import { ReactNode } from "react";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";

interface StudentStatsProps {
  title: string;
  value: string;
  description: string;
  icon: ReactNode;
  trend: string;
  trendDirection: "up" | "down";
}

export function StudentStats({
  title,
  value,
  description,
  icon,
  trend,
  trendDirection,
}: StudentStatsProps) {
  return (
    <div className="rounded-lg border bg-white shadow-sm dark:bg-gray-900">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              {title}
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {value}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {description}
            </div>
          </div>
          <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            {icon}
          </div>
        </div>
        <div className="mt-4">
          <div
            className={`text-xs flex items-center ${
              trendDirection === "up"
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {trendDirection === "up" ? (
              <ArrowUpIcon className="h-3 w-3 mr-1" />
            ) : (
              <ArrowDownIcon className="h-3 w-3 mr-1" />
            )}
            {trend} from last period
          </div>
        </div>
      </div>
    </div>
  );
}
