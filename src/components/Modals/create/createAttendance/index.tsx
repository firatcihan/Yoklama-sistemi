import { ModalProps } from "@/components/Modals/allModals.ts";
import CreateAttendanceHeader from "@/components/Modals/create/components/createAttendanceHeader";
import CreateAttendanceForm from "@/components/Modals/create/createAttendance/createAttendanceForm";

export default function CreateAttendanceModal({ close }: ModalProps) {
  return (
    <div className="w-[340px] sm:w-[500px] bg-white flex flex-col">
      <CreateAttendanceHeader close={close} />
      <div className="px-4 mb-5">
        <p className="leading-6 text-[18px] text-gray-500">
          Create a new attendance session by selecting a lecture, specifying the
          distance range, and setting an expiration time.
        </p>
      </div>
      <CreateAttendanceForm close={close} />
    </div>
  );
}
