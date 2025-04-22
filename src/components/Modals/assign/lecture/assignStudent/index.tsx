import useModalStore from "@/stores/modal";
import AssignHeader from "@/components/Modals/assign/components/assignHeader";
import XSeparator from "@/components/XSeparator";
import ModalLoader from "@/components/Modals/components/modalLoader";
import LectureAssignStudentTable from "@/components/Modals/assign/components/lectureAssignStudentTable";
import { Button } from "@/components/ui/button.tsx";
import { UserPlus } from "lucide-react";
import useAssignStudentsToLecture from "@/api/dashboard/lectures/assignStudentsToLecture.ts";
import LectureInfoColumn from "@/components/Modals/assign/components/lectureInfoColumn";
import useGetLectureById from "@/api/dashboard/lectures/getLectureById.ts";
import React from "react";
import { ModalProps } from "@/components/Modals/allModals.ts";
import { PulseLoader } from "react-spinners";

export default function LectureAssignStudentModal({ close }: ModalProps) {
  const { modal } = useModalStore();
  const { mutate: assignMutate, isPending: assignPending } =
    useAssignStudentsToLecture();

  const {
    data: lectureData,
    isPending,
    isSuccess,
    isError,
  } = useGetLectureById({
    id: modal[0] && modal[0].data ? modal[0].data : "",
  });

  React.useEffect(() => {
    if (lectureData?.participants) {
      setSelectedStudents(lectureData?.participants);
    }
  }, [lectureData]);

  interface selectedStudentsInterface {
    name: string;
    studentNumber: string;
  }

  const [selectedStudents, setSelectedStudents] = React.useState<
    selectedStudentsInterface[]
  >([]);

  React.useEffect(() => {
    console.log(selectedStudents);
  }, [selectedStudents]);

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
    if (lectureData) {
      const data = {
        lectureId: lectureData.id,
        students: selectedStudents,
      };
      console.log(data);
      assignMutate(data);
    }
  };

  if (isPending) {
    return (
      <div className="w-[340px] sm:w-[500px] md:w-[600px] p-2.5">
        <AssignHeader close={close} />
        <XSeparator extraClasses="!w-[100%] !mt-0 !mb-4" />
        <ModalLoader />
      </div>
    );
  }
  if (!lectureData) return null;

  if (isError) {
    return (
      <div className="w-[340px] sm:w-[500px] md:w-[600px] p-2.5">
        <AssignHeader close={close} />
        <XSeparator extraClasses="!w-[100%] !mt-0 !mb-4" />
        <div className="flex items-center justify-center h-full">
          <p>Lecture not found</p>
        </div>
      </div>
    );
  }

  if (isSuccess && lectureData) {
    return (
      <div className="w-[340px] sm:w-[500px] md:w-[600px] p-2.5">
        <AssignHeader close={close} />
        <XSeparator extraClasses="!w-[100%] !mt-0 !mb-4" />
        <LectureInfoColumn
          lectureName={lectureData.name}
          lectureCode={lectureData.lectureCode}
        />
        <LectureAssignStudentTable
          selectedStudents={selectedStudents}
          onStudentToggle={handleToggleLecture}
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
            variant="destructive"
            className="bg-primary hover:!bg-[#1e376d]/90 ml-3"
            onClick={() => handleSubmit()}
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
}
