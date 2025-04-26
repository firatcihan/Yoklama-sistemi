import { Outlet} from "react-router-dom";
import useAuthStore from "@/stores/auth";
import Header from "@/components/header";

export default function AttendanceLayout() {
  const { user } = useAuthStore();
  if (!user) return;
  return (
    <div className="w-safe h-safe flex flex-col">
      <div>
        <Header variant={user.role === "student" ? "student" : "teacher"} />
        <Outlet />
      </div>
    </div>
  );
}
