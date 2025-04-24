import { Outlet } from "react-router-dom";
//import NavbarPhone from "../../../components/navbar-phone";
import Modal from "@/components/Modals";
import useModalStore from "@/stores/modal";
import Header from "@/pages/dashboard/components/header";

export default function DashboardLayout() {
  const { modal } = useModalStore();
  return (
    <div className="w-safe h-safe flex flex-col !bg-[#F9FAFB]">
      {modal && <Modal />}
      <Header variant="teacher" />
      <Outlet />
    </div>
  );
}
