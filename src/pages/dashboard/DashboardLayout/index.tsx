import { Outlet } from "react-router-dom";
//import NavbarPhone from "../../../components/navbar-phone";
import Modal from "@/components/Modals";
import useModalStore from "@/stores/modal";

export default function DashboardLayout() {
  const { modal } = useModalStore();
  return (
    <div className="w-safe h-safe flex flex-col">
      {modal && <Modal />}
      <div>
        <Outlet />
      </div>
    </div>
  );
}
