import { ArrowLeft, PlusCircle, School, Users } from "lucide-react";
import { useParams } from "react-router-dom";
import PageLoader from "@/components/pageLoader";
import { useGetAttendanceSessionById } from "@/api/dashboard/attendance/getAttendanceSessionById.ts";
import { useNavigate } from "react-router-dom";
import { DataTable } from "@/components/Table/dataTable.tsx";
import { attendanceStudentsColumns } from "@/components/Table/attendanceStudentsColumns.tsx";
import {StatsCard} from "@/components/statsCard";

export default function ShowSelectedLecture() {
  const { lectureCode, sessionId } = useParams<{
    lectureCode: string;
    sessionId: string;
  }>();

  const {
    data: sessionData,
    isLoading,
    isError,
  } = useGetAttendanceSessionById({
    id: sessionId!,
    lectureCode: lectureCode!,
  });
  const navigate = useNavigate();
  if (isLoading) return <PageLoader />;
  if (isError) return <div>Error loading lecture data</div>;
  if (!sessionData) return <div>No lecture data available</div>;

  // Type assertion to ensure sessionData is typed correctly
  const formattedDate = new Date(
    sessionData.createdAt._seconds * 1000,
  ).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto bg-white rounded-xl overflow-hidden mt-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="ml-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 !pl-0 !border-none !outline-none !bg-white hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Lectures
            </button>
            <p className="text-3xl font-bold text-gray-900">
              {sessionData.lectureName}
            </p>
            <p className="mt-2 text-lg text-gray-600">{formattedDate}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-2 mb-6">
          <StatsCard
            isLoading={isLoading}
            variant="week"
            title="Total Students"
            value="0%"
            description="Active enrollment"
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
            trend="+1.2%"
            trendDirection="down"
          />
          <StatsCard
            isLoading={isLoading}
            variant="week"
            title="Average Attendance"
            value="94.2%"
            description="Last 30 days"
            icon={<School className="h-4 w-4 text-muted-foreground" />}
            trend="+1.2%"
            trendDirection="up"
          />
          <StatsCard
            isLoading={isLoading}
            title="Absent Today"
            variant="day"
            value="7"
            description={`Out of students`}
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
            trend="-3"
            trendDirection="down"
          />
        </div>
        <div className="py-10 flex flex-col border border-[#e5e5e5] rounded-lg shadow">
          <div className="mb-3 px-10 sm:flex">
            <div>
              <p className="text-[19px] font-semibold leading-none tracking-tight">
                {lectureCode} Attendance Directory
              </p>
              <p className="text-sm font-semibold text-muted-foreground">
                View and manage all students who joined the attendance
              </p>
            </div>
            <div className="sm:ml-auto max-sm:w-[150px] max-sm:my-2 flex items-center cursor-pointer items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-600 text-white text-sm rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
              <PlusCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-1.5" />

              <span className="inline">Add student</span>
            </div>
          </div>
          <div className="sm:px-10 max-sm:flex max-sm:items-center max-sm:justify-center max-sm:w-full">
            <DataTable
              columns={attendanceStudentsColumns}
              data={sessionData.attendanceRecords}
              variant="student"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
