import CreateHeader from "@/components/Modals/create/components/createHeader";
import CreateLectureForm from "@/components/Modals/create/createLecture/createLectureForm";
import { ModalProps } from "@/components/Modals/allModals.ts";

export default function CreateLectureModal({ close }: ModalProps) {
  return (
    <div className="w-[380px] sm:w-[500px] bg-white relative">
      <CreateHeader close={close} />
      <CreateLectureForm close={close} />
    </div>
  );
}
