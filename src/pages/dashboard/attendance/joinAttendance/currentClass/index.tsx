import { BookOpen, CheckCircle2, Clock, X } from "lucide-react";
import { AttendanceInterface } from "@/api/dashboard/attendance/attendanceInterface.ts";
import useJoinAttendanceByUserId from "@/api/dashboard/attendance/joinAttendanceByUserId.ts";
import ModalLoader from "@/components/Modals/components/modalLoader";
import classNames from "classnames";

export default function CurrentClass({
  attendanceData,
  userId,
}: {
  attendanceData: AttendanceInterface;
  userId: string;
}) {
  const {
    mutate: joinAttendance,
    isPending,
    isError,
  } = useJoinAttendanceByUserId({
    sessionId: attendanceData.attendanceId,
    lectureCode: attendanceData.lectureCode,
  });
  const handleJoinAttendance = () => {
    joinAttendance({
      studentId: userId,
    });
  };

  const formattedTime = new Date(attendanceData.expiresAt._seconds * 1000);

  const isExpired = formattedTime.getTime() < Date.now();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Current Class
      </h2>
      <div className="flex items-start space-x-4 mb-3">
        <div className="p-3 bg-blue-50 rounded-lg">
          <BookOpen className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-base font-medium text-gray-900">
            {attendanceData.lectureName}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            #{attendanceData.lectureCode}
          </p>
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            09:00 AM - 10:30 AM
          </div>
        </div>
      </div>
      <div className="px-6 py-4 border-t">
        <button
          disabled={isError || isExpired || isPending}
          onClick={handleJoinAttendance}
          className={classNames(
            "w-full flex items-center justify-center py-3 px-4 text-white font-medium rounded-lg !border-none focus:!outline-none disabled:!opacity-50 disabled:!cursor-not-allowed !transition-colors",
            {
              "!bg-blue-600 hover:!bg-blue-700": !isExpired,
              "!bg-red-600 hover:!bg-red-700": isExpired,
            },
          )}
        >
          {isPending ? (
            <ModalLoader color={"fff"} />
          ) : isError ? (
            "You already joined this attendance"
          ) : isExpired ? (
            <p className="flex items-center justify-center">
              <X className="mr-2" />
              Attendance Expired
            </p>
          ) : (
            <p className="flex items-center justify-center">
              <CheckCircle2 className="mr-2" />
              Join Attendance
            </p>
          )}
        </button>
      </div>
    </div>
  );
}
