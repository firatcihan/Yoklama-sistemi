import { Outlet } from "react-router-dom";

export default function QrLayout() {
  return (
    <div className="w-safe h-safe flex flex-col !bg-white">
      <div>
        <Outlet />
      </div>
    </div>
  );
}
