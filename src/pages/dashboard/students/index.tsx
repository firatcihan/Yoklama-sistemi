import { studentColumns, Student } from "@/components/Table/StudentColumns.tsx";
import { DataTable } from "@/components/Table/dataTable.tsx";
import useGetStudents from "@/api/dashboard/students/getStudents.ts";
import useGetStudentsCreateInfo from "@/api/dashboard/students/getStudentsCreateInfo.ts";
import { FileSpreadsheet, School, UserPlus, Users } from "lucide-react";
import useModalStore from "@/stores/modal";
import { Button } from "@/components/ui/button.tsx";
import { StatsCard } from "@/pages/dashboard/students/studentStats";
import useGetLast2WeeksAttendances from "@/api/dashboard/info/geLast2WeekAttendances.ts";
import useAuthStore from "@/stores/auth";

export default function ManageStudents() {
  const { setModal } = useModalStore();
  const { user } = useAuthStore();
  const { data, isLoading, isError } = useGetStudents();
  const students: Student[] =
    data && data.length > 0
      ? data?.map((student) => ({
          id: student.id,
          name: student.name,
          email: student.email,
          assignedClasses:
            student.assignedClasses?.map((cls) => cls.lectureCode).join(", ") ||
            "",
          studentNumber: student.studentNumber,
        }))
      : [];
  const { data: createInfo, isLoading: createInfoLoading } =
    useGetStudentsCreateInfo();

  const { data: attendanceData, isLoading: attendanceLoading } =
    useGetLast2WeeksAttendances({ teacherId: user?.id || "" });

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (isError) {
    return <div>error...</div>;
  }

  function calculateAttendancePercentage(
    currentWeekCount: number,
    previousWeekCount: number,
  ) {
    if (previousWeekCount === 0) {
      return currentWeekCount === 0 ? 0 : 100;
    }
    const percentageChange =
      ((currentWeekCount - previousWeekCount) / previousWeekCount) * 100;
    return percentageChange;
  }

  const attendancePercentage = calculateAttendancePercentage(
    attendanceData?[0]?.totalAttendancesCount,
    attendanceData?[1]?.totalAttendancesCount
  );

  const studentPercentage = calculateAttendancePercentage(
    createInfo?.createdThisWeek || 0,
    createInfo?.createdLastWeek || 0,
  );
  console.log(studentPercentage);
  console.log(attendancePercentage);
  return (
    <div className="container mx-auto py-6 space-y-6 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <p className="text-3xl font-bold tracking-tight">
            Student Management
          </p>
          <p className="text-muted-foreground mt-1 font-medium">
            Manage student information, enrollment, and attendance records
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="hidden md:flex">
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button
            onClick={() => setModal({ name: "createStudent", data: "student" })}
            className="hover:!bg-[#1447e6] !transition-colors !bg-[#155dfc] !outline-none "
          >
            <UserPlus className="mr-1 h-5 w-5" />
            Add Student
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard
          isLoading={createInfoLoading}
          variant="week"
          title="Total Students"
          value={data?.length.toString() || "unknown"}
          description="Active enrollment"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          trend={studentPercentage}
          trendDirection={
            studentPercentage[0] === "+"
              ? "up"
              : studentPercentage[0] === "-"
                ? "down"
                : "neutral"
          }
        />
        <StatsCard
          isLoading={attendanceLoading}
          variant="week"
          title="Average Attendance"
          value={`${attendanceData?.[0]?.totalAttendanceRate || "0"}%`}
          description="Last 7 days"
          icon={<School className="h-4 w-4 text-muted-foreground" />}
          trend={attendancePercentage}
          trendDirection="up"
        />
        <StatsCard
          isLoading={createInfoLoading}
          title="Absent Today"
          variant="day"
          value="7"
          description={`Out of ${data?.length?.toString() || "unknown"} students`}
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          trend="-3"
          trendDirection="down"
        />
      </div>
      <div className="py-10 flex flex-col border border-[#e5e5e5] rounded-lg shadow">
        <div className="mb-3 px-10">
          <p className="text-[19px] font-semibold leading-none tracking-tight">
            Students Directory
          </p>
          <p className="text-sm font-semibold text-muted-foreground">
            View and manage all student information and records
          </p>
        </div>
        <div className="sm:px-10 max-sm:flex max-sm:items-center max-sm:justify-center max-sm:w-full">
          <DataTable
            columns={studentColumns}
            data={students}
            variant="student"
          />
        </div>
      </div>
    </div>
  );
}
