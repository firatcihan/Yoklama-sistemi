import { Outlet } from "react-router-dom";
import NavbarPhone from "../../../components/navbar-phone";

export default function DashboardLayout() {
  return (
    <div className="w-safe h-safe flex flex-col">
      <div className="mb-10">
        <NavbarPhone />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
