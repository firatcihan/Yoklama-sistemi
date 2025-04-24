import { Outlet} from "react-router-dom";
import Header from "@/pages/dashboard/components/header";
import useAuthStore from "@/stores/auth";

export default function AttendanceLayout() {
  const { user } = useAuthStore();
  if (!user) return;
  return (
    <div className="w-safe h-safe flex flex-col !bg-[#F9FAFB]">
      <div>
        <Header variant={user.role === "student" ? "student" : "teacher"} />
        <Outlet />
      </div>
    </div>
  );
}
