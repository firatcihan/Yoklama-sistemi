import { ModalProps } from "@/components/Modals/allModals.ts";
import EditHeader from "@/components/Modals/edit/components/editHeader";
import EditStudentForm from "@/components/Modals/edit/editStudent/editStudentForm";

export default function EditStudentModal({ close }: ModalProps) {
  return (
    <div className="w-[380px] sm:w-[500px] bg-white relative">
      <EditHeader close={close} />
      <EditStudentForm close={close} />
    </div>
  );
}
