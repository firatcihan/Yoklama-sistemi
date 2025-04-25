import { Outlet } from "react-router-dom";
//import NavbarPhone from "../../../components/navbar-phone";
import Modal from "@/components/Modals";
import useModalStore from "@/stores/modal";
import Header from "@/pages/dashboard/components/header";

export default function DashboardLayout() {
  const { modal } = useModalStore();
  return (
    <div className="min-w-screen h-safe flex flex-col !bg-[#fff]">
      {modal && <Modal />}
      <Header variant="teacher" />
      <Outlet />
    </div>
  );
}
