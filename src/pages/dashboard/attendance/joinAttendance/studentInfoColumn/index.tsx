import { useState } from "react";
import { Award, ChevronDown, ChevronUp, Mail } from "lucide-react";
import useGetUserAttendancesOnLecture from "@/api/dashboard/attendance/getUserAttendancesOnLecture.ts";
import useAuthStore from "@/stores/auth";

export default function StudentInfoColumn({
  lectureCode,
}: {
  lectureCode: string;
}) {
  const { user } = useAuthStore();
  const { data: attendanceStats, isLoading } = useGetUserAttendancesOnLecture({
    studentId: user?.id || "",
    lectureCode: lectureCode,
  });
  const [isExpanded, setIsExpanded] = useState(false);

  if (isLoading) {
    return <div className="bg-white rounded-lg shadow-md p-4">loading</div>;
  }

  if (!user || !attendanceStats) return null;

  const attendancePercentage =
    attendanceStats.numberOfLessons > 0
      ? Math.round(
          (attendanceStats.numberOfAttendances /
            attendanceStats.numberOfLessons) *
            100,
        )
      : 0;
  console.log(attendancePercentage);

  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300">
      <div
        className="flex items-center p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="w-12 h-12 rounded-full bg-blue-100 border-2 border-blue-500 flex items-center justify-center">
          <span className="text-lg font-semibold text-blue-600">
            {initials}
          </span>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="font-medium text-gray-900">{user.name}</h3>
          <p className="text-sm text-gray-500">{user.studentNumber || ""}</p>
        </div>
        <div className="flex items-center">
          <div className="mr-4">
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-700">
                Attendance:
              </span>
              <span
                className={`ml-1 text-sm font-semibold ${
                  attendancePercentage >= 80
                    ? "text-green-600"
                    : attendancePercentage >= 60
                      ? "text-yellow-600"
                      : "text-red-600"
                }`}
              >
                {attendancePercentage}%
              </span>
            </div>
          </div>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>

      <div
        className={`bg-gray-50 px-4 py-3 transition-all duration-300 overflow-hidden ${
          isExpanded ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="grid md:grid-cols-2 gap-3">
          <div className="flex items-center">
            <Mail size={16} className="text-blue-500" />
            <span className="ml-2 text-sm text-gray-700">{user.email}</span>
          </div>
          <div className="flex items-center">
            <Award size={16} className="text-blue-500" />
            <span className="ml-2 text-sm text-gray-700">
              {attendanceStats.numberOfAttendances} /{" "}
              {attendanceStats.numberOfLessons} classes attended
            </span>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex justify-between mb-1">
            <span className="text-xs font-medium text-gray-700">
              Attendance Progress
            </span>
            <span className="text-xs font-medium text-gray-700">
              {attendancePercentage}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${
                attendancePercentage >= 80
                  ? "bg-green-500"
                  : attendancePercentage >= 60
                    ? "bg-yellow-500"
                    : "bg-red-500"
              }`}
              style={{ width: `${attendancePercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
