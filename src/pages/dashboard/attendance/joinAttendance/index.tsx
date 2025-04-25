import { useParams } from "react-router-dom";
import RecentClasses from "@/pages/dashboard/attendance/joinAttendance/recentClasses";
import StudentInfoColumn from "@/pages/dashboard/attendance/joinAttendance/studentInfoColumn";
import useGetAttendanceSessionById from "@/api/dashboard/attendance/getAttendanceSessionById.ts";
import toast from "react-hot-toast";
import CurrentClass from "@/pages/dashboard/attendance/joinAttendance/currentClass";
import useAuthStore from "@/stores/auth";

export default function JoinAttendance() {
  const { lectureCode, sessionId } = useParams<{
    lectureCode: string;
    sessionId: string;
  }>();

  const { user } = useAuthStore();
  const { data, isError, isLoading } = useGetAttendanceSessionById({
    id: sessionId || "",
    lectureCode: lectureCode || "",
  });

  if (!user) return null;

  if (
    user.role !== "student" ||
    !user.assignedClasses?.some(
      (classes) => classes.lectureCode === lectureCode,
    )
  ) {
    return (
      <div className="mt-30">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            You are not assigned to this class.
          </h1>
          <p className="text-gray-600">
            Please contact your instructor for more information.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <div className="">loading...</div>;
  }

  if (isError) {
    toast.error("Error fetching attendance data");
    return null;
  }

  if (data) {
    const formattedTime = new Date(data.expiresAt._seconds * 1000);
    const isExpired = formattedTime.getTime() < new Date().getTime();

    return (
      <div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="mb-6">
            <StudentInfoColumn lectureCode={lectureCode || ""} />
          </div>
          <CurrentClass
            isExpired={isExpired}
            userId={user.id}
            attendanceData={data}
          />
          <RecentClasses lectureCode={lectureCode || ""} />
        </div>
      </div>
    );
  }
}
