import CreateStudentForm from "@/components/Modals/create/createStudent/createStudentForm";
import CreateHeader from "@/components/Modals/create/components/createHeader";
import {ModalProps} from "@/components/Modals/allModals.ts";

export default function CreateStudentModal({ close }: ModalProps) {
    return (
        <div className="w-[380px] sm:w-[500px] bg-white relative">
            <CreateHeader close={close} />
            <CreateStudentForm close={close} />
        </div>
    );
}
