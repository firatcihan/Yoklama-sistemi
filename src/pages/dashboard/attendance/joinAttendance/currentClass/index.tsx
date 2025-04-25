import { BookOpen, CheckCircle2, Clock } from "lucide-react";
import { AttendanceInterface } from "@/api/dashboard/attendance/attendanceInterface.ts";
import useJoinAttendanceByUserId from "@/api/dashboard/attendance/joinAttendanceByUserId.ts";
import ModalLoader from "@/components/Modals/components/modalLoader";

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
          disabled={isError}
          onClick={handleJoinAttendance}
          className="w-full flex items-center justify-center py-3 px-4 !bg-blue-600 text-white font-medium rounded-lg hover:!bg-blue-700 focus:!outline-none focus:!ring-2 focus:!ring-offset-2 focus:!ring-blue-500 disabled:hover:!bg-blue-600 disabled:!opacity-50 disabled:!cursor-not-allowed !transition-colors"
        >
          {isPending ? (
            <ModalLoader color={"fff"} />
          ) : isError ? (
            "You already joined this attendance"
          ) : (
            <div className="flex items-center">
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Join Attendance
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
