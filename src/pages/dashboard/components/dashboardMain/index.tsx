import DashboardInfo from "@/pages/dashboard/components/dashboardInfo";
import { BookOpen, CalendarClock, GraduationCap, Users } from "lucide-react";
import useModalStore from "@/stores/modal";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/stores/auth";

export default function DashboardMain() {
  const { user } = useAuthStore();
  const { setModal } = useModalStore();
  const navigate = useNavigate();

  if (!user) navigate("/auth/login");
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
        <div
          onClick={() => navigate("students")}
          className="w-full bg-white border !border-[#e5e7eb] rounded-xl cursor-pointer !shadow-xs p-4 sm:p-6 text-left transition-all duration-200 hover:!shadow-md hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <div className="flex items-start space-x-3 sm:space-x-4">
            <div className="flex-shrink-0 p-2 sm:p-3 bg-blue-50 rounded-lg">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                Manage Students
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-gray-500 line-clamp-2">
                Add, edit, or remove students from the system. View student
                attendance records and performance.
              </p>
            </div>
          </div>
        </div>
        <div
          onClick={() => navigate("lectures")}
          className="w-full border !border-[#e5e7eb] bg-white rounded-xl cursor-pointer !shadow-xs p-4 sm:p-6 text-left transition-all duration-200 hover:!shadow-md hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <div className="flex items-start space-x-3 sm:space-x-4">
            <div className="flex-shrink-0 p-2 sm:p-3 bg-blue-50 rounded-lg">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                Manage Lectures
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-gray-500 line-clamp-2">
                Create and organize lectures, set schedules, and view lecture
                attendance statistics.
              </p>
            </div>
          </div>
        </div>
        <div
          onClick={() => navigate("teachers")}
          className="w-full bg-white border !border-[#e5e7eb] rounded-xl cursor-pointer !shadow-xs p-4 sm:p-6 text-left transition-all duration-200 hover:!shadow-md hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <div className="flex items-start space-x-3 sm:space-x-4">
            <div className="flex-shrink-0 p-2 sm:p-3 bg-blue-50 rounded-lg">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                Manage Teachers
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-gray-500 line-clamp-2">
                Add or remove teachers, assign lectures, and manage teaching
                schedules.
              </p>
            </div>
          </div>
        </div>
        <div
          onClick={() => setModal({ name: "createAttendance", data: user?.id })}
          className="w-full bg-white rounded-xl border !border-[#e5e7eb] cursor-pointer !shadow-xs p-4 sm:p-6 text-left transition-all duration-200 hover:!shadow-md hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <div className="flex items-start space-x-3 sm:space-x-4">
            <div className="flex-shrink-0 p-2 sm:p-3 bg-blue-50 rounded-lg">
              <CalendarClock className=" w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                Create Attendance
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-gray-500 line-clamp-2">
                Start a new attendance session for a lecture with customizable
                settings.
              </p>
            </div>
          </div>
        </div>
      </div>
      <DashboardInfo />
    </div>
  );
}
