import { ModalProps } from "@/components/Modals/allModals.ts";
import EditHeader from "@/components/Modals/edit/components/editHeader";
import EditLectureForm from "@/components/Modals/edit/editLecture/editLectureForm";

export default function EditLectureModal({ close }: ModalProps) {
  return (
    <div className="w-[380px] sm:w-[500px] bg-white relative">
      <EditHeader close={close} />
      <EditLectureForm close={close} />
    </div>
  );
}
