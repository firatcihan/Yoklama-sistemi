import GetAllAttendancesOnLectureByLectureCode from "@/api/dashboard/attendance/getAllAttendancesOnLectureByLectureCode.ts";
import { AttendanceInterface } from "@/api/dashboard/attendance/attendanceInterface.ts";
import useAuthStore from "@/stores/auth";

import { CheckCircle2, XCircle } from "lucide-react";
import classNames from "classnames";

export default function RecentClasses({
  lectureCode,
}: {
  lectureCode: string;
}) {
  const { user } = useAuthStore();
  const {
    data: allAttendancesInLecture,
    isLoading,
    isError,
  } = GetAllAttendancesOnLectureByLectureCode({
    lectureCode: lectureCode,
  });

  if (isError || !allAttendancesInLecture || !user?.id) {
    return <div>Error fetching attendance data</div>;
  }

  const sortedAllAttendancesInLecture = allAttendancesInLecture.sort(
    (a, b) => b.createdAt._seconds - a.createdAt._seconds,
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  if (allAttendancesInLecture || sortedAllAttendancesInLecture.length > 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Attendance
        </h2>
        {sortedAllAttendancesInLecture.map(
          (attendance: AttendanceInterface) => {
            const isPresent = attendance.attendanceRecords.some(
              (student) => student.id === user?.id,
            );

            const dbCreationDate = new Date(attendance.createdAt._seconds * 1000);
            const formatted = dbCreationDate.toLocaleString();

            const dbExpirationDate = new Date(attendance.expiresAt._seconds * 1000);
            const isActive = dbExpirationDate.getTime() > new Date().getTime();

            if(isActive) console.log("Active");
            return (
              <div className="space-y-4" key={attendance.attendanceId}>
                <div className="flex items-center justify-between py-3 !border-b last:border-0">
                  <div className="flex items-center space-x-3">
                    {isPresent ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                    <div>
                      <p className="font-medium text-gray-900">
                        {attendance.lectureName}
                      </p>
                      <p
                        className={classNames("text-sm", {
                          "text-blue-500 font-semibold underline": isActive,
                          "text-gray-500": !isActive,
                        })}
                      >
                        {isActive ? "Lesson is currently active!" : formatted}
                      </p>
                    </div>
                  </div>
                  {isPresent ? (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                      Present
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700">
                      Absent
                    </span>
                  )}
                </div>
              </div>
            );
          },
        )}
      </div>
    );
  }
}
