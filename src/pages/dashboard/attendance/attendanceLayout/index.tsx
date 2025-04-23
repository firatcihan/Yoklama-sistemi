import { Outlet } from "react-router-dom";

export default function AttendanceLayout() {
  return (
    <div className="w-safe h-safe flex flex-col">
      <div>
        <Outlet />
      </div>
    </div>
  );
}
