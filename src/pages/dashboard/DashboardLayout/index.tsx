import { Outlet } from "react-router-dom";
import Modal from "@/components/Modals";
import useModalStore from "@/stores/modal";
import Header from "@/components/header";


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
