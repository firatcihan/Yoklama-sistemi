import DashboardInfo from "@/pages/dashboard/components/dashboardInfo";
import DashboardNavColumns from "@/pages/dashboard/components/dashboardNavColumns";
import {
  BookOpen,
  CalendarClock,
  FilePen,
  GraduationCap,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/stores/auth";

export default function DashboardMain() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  if (!user) navigate("/auth/login");
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
        <DashboardNavColumns
          icon={<Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />}
          text="Manage Students"
          desc="Add, edit, or remove students from the system. View student
                attendance records and performance."
          route={"students"}
        />
        <DashboardNavColumns
          icon={
            <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
          }
          text="Manage Teachers"
          desc="Create and organize lectures, set schedules, and view lecture
                attendance statistics."
          route={"teachers"}
        />
        <DashboardNavColumns
          icon={<BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />}
          text="Manage Lectures"
          desc="Add or remove teachers, assign lectures, and manage teaching
                schedules."
          route={"lectures"}
        />
        <DashboardNavColumns
          icon={<FilePen className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />}
          text="Manage Attendances"
          desc="View and update attendance records for all lectures and students."
          route={"attendances"}
        />
        <DashboardNavColumns
          icon={
            <CalendarClock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
          }
          text="Create Attendance"
          desc="Start a new attendance session for a lecture with customizable
                settings."
          modalProps={{ name: "createAttendance", data: user?.id }}
        />
      </div>
      <DashboardInfo />
    </div>
  );
}
