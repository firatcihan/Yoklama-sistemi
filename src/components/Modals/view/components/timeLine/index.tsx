import { History } from "lucide-react";
import dayjs from "dayjs";

export default function TimeLine({
  createTime,
  lastUpdateTime,
}: {
  createTime: string;
  lastUpdateTime: string;
}) {
  function formatUTCDate(dateString: string): string {
    return dayjs.utc(dateString).format("MMMM D, YYYY [at] h:mm A");
  }

  return (
    <div className="rounded-lg bg-gray-50 p-4 space-y-3">
      <h4 className="text-md font-medium text-gray-500 flex items-center">
        <History className="mr-2" />
        Timeline
      </h4>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Created</span>
          <span className="text-gray-900">{formatUTCDate(createTime)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Last Updated</span>
          <span className="text-gray-900">{formatUTCDate(lastUpdateTime)}</span>
        </div>
      </div>
    </div>
  );
}
