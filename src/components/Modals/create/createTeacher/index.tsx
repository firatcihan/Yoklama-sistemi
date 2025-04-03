import CreateTeacherForm from "@/components/Modals/create/createTeacher/createTeacherForm";
import CreateHeader from "@/components/Modals/create/components/createHeader";

export default function CreateTeacherModal({ close }: { close: () => void }) {
    return (
        <div className="w-[380px] sm:w-[500px] bg-white relative">
            <CreateHeader close={close} />
            <CreateTeacherForm close={close} />
        </div>
    );
}
