import { useParams } from "react-router-dom";

import RecentClasses from "@/pages/dashboard/attendance/joinAttendance/recentClasses";
import StudentInfoColumn from "@/pages/dashboard/attendance/joinAttendance/studentInfoColumn";
import useGetAttendanceSessionById from "@/api/dashboard/attendance/getAttendanceSessionById.ts";
import toast from "react-hot-toast";
import CurrentClass from "@/pages/dashboard/attendance/joinAttendance/currentClass";

export default function JoinAttendance() {
  const { lectureCode, sessionId } = useParams<{
    lectureCode: string;
    sessionId: string;
  }>();

  const { data, isError, isLoading } = useGetAttendanceSessionById({
    id: sessionId || "",
    lectureCode: lectureCode || "",
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  if (isError) {
    toast.error("Error fetching attendance data");
    return null;
  }
  if (data) {
    return (
      <div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="mb-6">
            <StudentInfoColumn lectureCode={lectureCode || ""}/>
          </div>
          <CurrentClass attendanceData={data} />
          <RecentClasses lectureCode={lectureCode || ""} />
        </div>
      </div>
    );
  }
}
