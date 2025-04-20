import { ModalProps } from "@/components/Modals/allModals.ts";
import EditHeader from "@/components/Modals/edit/components/editHeader";
import EditTeacherForm from "@/components/Modals/edit/editTeacher/editTeacherForm";

export default function EditTeacherModal({ close }: ModalProps) {
  return (
    <div className="w-[380px] sm:w-[500px] bg-white relative">
      <EditHeader close={close} />
      <EditTeacherForm close={close} />
    </div>
  );
}
