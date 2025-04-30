import useModalStore from "@/stores/modal";
import XSeparator from "@/components/XSeparator";
import { Button } from "@/components/ui/button.tsx";
import { UserPlus } from "lucide-react";
import LectureInfoColumn from "@/components/Modals/assign/components/lectureInfoColumn";
import { ModalProps } from "@/components/Modals/allModals.ts";
import { PulseLoader } from "react-spinners";
import CloseButton from "@/components/closeButton";
import React from "react";
import useManageAttendanceParticipants from "@/api/dashboard/attendance/manageAttendanceParticipants.ts";
import LectureAttendanceAssignTable from "@/components/Modals/assign/manageAttendanceParticipants/lectureAttendanceAssignTable";

export default function ManageAttendanceParticipants({ close }: ModalProps) {
  const { modal } = useModalStore();

  const { mutate: assignMutate, isPending: assignPending } =
    useManageAttendanceParticipants({
      sessionId: modal[0] && modal[0].data ? modal[0].data.sessionId : "",
      lectureCode: modal[0] && modal[0].data ? modal[0].data.lectureCode : "",
    });

  interface selectedStudentsInterface {
    name: string;
    studentNumber: string;
  }

  const selected = modal[0] && modal[0].data ? modal[0].data.participants : [];
  const formatted: selectedStudentsInterface[] = selected.map(
    ({ name, studentNumber }: { name: string; studentNumber: string }) => ({
      name,
      studentNumber,
    }),
  );

  const [selectedStudents, setSelectedStudents] =
    React.useState<selectedStudentsInterface[]>(formatted);

  const handleToggleLecture = (student: selectedStudentsInterface) => {
    setSelectedStudents((prev) => {
      const exists = prev.some(
        (l) => l.studentNumber === student.studentNumber,
      );
      if (exists) {
        return prev.filter((l) => l.studentNumber !== student.studentNumber);
      } else {
        return [...prev, student];
      }
    });
  };

  const handleSubmit = () => {
    assignMutate({
      studentsToChange: selectedStudents,
    });
  };

  if (!modal[0].data) return null;

  return (
    <div className="w-[340px] sm:w-[500px] md:w-[600px] p-2.5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[18px] font-semibold leading-6">
            Manage students on attendance
          </p>
        </div>
        <CloseButton close={close} />
      </div>
      <XSeparator extraClasses="!w-[100%] !mt-0 !mb-4" />
      <LectureInfoColumn
        lectureName={modal[0].data.lectureName}
        lectureCode={modal[0].data.lectureCode}
      />
      <LectureAttendanceAssignTable
        selectedStudents={selectedStudents}
        onStudentToggle={handleToggleLecture}
        lectureCode={modal[0] && modal[0].data ? modal[0].data.lectureCode : ""}
      />
      <div className="flex justify-end ">
        <Button
          variant="destructive"
          className="!bg-[#dc2625] hover:!bg-[#dc2625]/90"
          type="button"
          onClick={close}
        >
          Vazgeç
        </Button>
        <Button
          onClick={handleSubmit}
          variant="destructive"
          className="bg-primary hover:!bg-[#1e376d]/90 ml-3"
        >
          <div className="flex items-center justify-center">
            {assignPending ? (
              <PulseLoader color="#ffffff" />
            ) : (
              <p className="flex items-center justify-center">
                <UserPlus size={20} className="mr-2" /> Seçimleri Kaydet
              </p>
            )}
          </div>
        </Button>
      </div>
    </div>
  );
}
