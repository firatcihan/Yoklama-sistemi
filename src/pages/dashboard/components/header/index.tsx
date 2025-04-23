import { CalendarClock, Menu, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/stores/auth";
import useModalStore from "@/stores/modal";

export default function Header() {
  const { user } = useAuthStore();
  const { setModal } = useModalStore();
  const navigate = useNavigate();
  return (
    <header className="bg-white shadow-xs sticky top-0 z-30 !border-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="sm:hidden !p-2 -ml-2 !bg-white cursor-pointer text-gray-600 hover:!text-gray-900 !outline-none !transition-colors rounded-lg !border-none hover:!border-none hover:!bg-gray-100 mr-2">
              <Menu className="w-6 h-6" />
            </div>
            <div
              onClick={() => navigate("/dashboard")}
              className="text-lg sm:text-2xl font-bold text-gray-900 flex items-center"
            >
              <CalendarClock className="w-7 h-7  sm:w-8 sm:h-8 mr-2 text-blue-600 hover:scale-110 cursor-pointer !transition-all" />
              <span className="hidden sm:inline">Attendance System</span>
            </div>
          </div>
          <div
            onClick={() =>
              setModal({ name: "createAttendance", data: user?.id })
            }
            className="inline-flex cursor-pointer items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-600 text-white text-sm rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <PlusCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-1.5" />

            <span className="hidden sm:inline">Create Attendance</span>
            <span className="sm:hidden">New</span>
          </div>
        </div>
      </div>
    </header>
  );
}
