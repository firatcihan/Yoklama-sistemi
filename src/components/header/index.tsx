import {
  BookOpen,
  CalendarClock,
  FilePen,
  GraduationCap,
  LogOut,
  Menu,
  PlusCircle,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/stores/auth";
import useModalStore from "@/stores/modal";
import { useState } from "react";
import CloseButton from "@/components/closeButton";

export default function Header({ variant = "teacher" }: { variant?: string }) {
  const { user, logoutUser } = useAuthStore();
  const { setModal } = useModalStore();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigateToPage = (page: string) => {
    setIsMobileMenuOpen(false);
    navigate(page);
  };
  return (
    <>
      <header className="bg-white shadow-xs sticky top-0 z-30 !border-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {variant !== "student" && (
                <div
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="!p-2 -ml-2 !bg-white cursor-pointer text-gray-600 hover:!text-gray-900 !outline-none !transition-colors rounded-lg !border-none hover:!border-none hover:!bg-gray-100 mr-2"
                >
                  <Menu className="w-6 h-6 sm:w-7 sm:h-8" />
                </div>
              )}
              <div
                onClick={() => {
                  if (variant !== "student") {
                    navigate("/dashboard");
                  }
                }}
                className="text-lg sm:text-2xl font-bold text-gray-900 flex items-center"
              >
                <CalendarClock className="w-7 h-7  sm:w-8 sm:h-8 mr-2 text-blue-600 hover:scale-110 cursor-pointer !transition-all" />
                <span className="sm:inline">Attendance System</span>
              </div>
            </div>
            {variant !== "student" && (
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
            )}
          </div>
        </div>
      </header>
      {variant !== "student" && (
        <div
          className={`
          fixed inset-0 z-40
          transition-opacity duration-300
          ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div
            className={`
            flex flex-col absolute inset-y-0 left-0 w-64 bg-white shadow-lg
            transform transition-transform duration-300 ease-out
            ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          `}
          >
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                <div className="my-[3px]">
                  <CloseButton close={() => setIsMobileMenuOpen(false)} />
                </div>
              </div>
            </div>
            <nav className="p-4 space-y-2 flex flex-col">
              <div
                onClick={() => navigateToPage("teacher")}
                className="w-full flex cursor-pointer items-center space-x-3 px-3 py-2 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors "
              >
                <CalendarClock className="w-5 h-5 text-blue-700" />
                <span>Create Attendance</span>
              </div>
              <div
                onClick={() => navigateToPage("students")}
                className="w-full flex cursor-pointer items-center space-x-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors "
              >
                <Users className="w-5 h-5 text-gray-500" />
                <span>Manage Students</span>
              </div>
              <div
                onClick={() => navigateToPage("teachers")}
                className="w-full flex cursor-pointer items-center space-x-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors "
              >
                <GraduationCap className="w-5 h-5 text-gray-500" />
                <span>Manage Teachers</span>
              </div>
              <div
                onClick={() => navigateToPage("lectures")}
                className="w-full flex cursor-pointer items-center space-x-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors "
              >
                <BookOpen className="w-5 h-5 text-gray-500" />
                <span>Manage Lectures</span>
              </div>
              <div
                onClick={() => navigateToPage("attendances")}
                className="w-full flex cursor-pointer items-center space-x-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors "
              >
                <FilePen className="w-5 h-5 text-gray-500" />
                <span>Manage Attendances</span>
              </div>
            </nav>
            <div className="mt-auto p-4">
              <div
                onClick={() => logoutUser()}
                className="w-full flex cursor-pointer items-center space-x-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors "
              >
                <LogOut className="w-5 h-5 text-gray-500" />
                <span>Sign Out</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
