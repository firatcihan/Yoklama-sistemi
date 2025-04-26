import { Outlet } from "react-router-dom";
import useAuthStore from "@/stores/auth";

export default function ManageAttendanceLayout() {
  const { user } = useAuthStore();
  if (!user) return;
  return (
    <div className="w-safe h-safe flex flex-col">
      <Outlet />
    </div>
  );
}
