import CreateStudentForm from "@/components/Modals/create/createStudent/createStudentForm";
import CreateHeader from "@/components/Modals/create/components/createHeader";

export default function CreateStudentModal({ close }: { close: () => void }) {
    return (
        <div className="w-[380px] sm:w-[500px] bg-white relative">
            <CreateHeader close={close} />
            <CreateStudentForm close={close} />
        </div>
    );
}
