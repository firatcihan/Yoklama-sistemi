import AssignHeader from "@/components/Modals/assign/components/assignHeader";
import { ModalProps } from "@/components/Modals/allModals.ts";
import XSeparator from "@/components/XSeparator";
import { Button } from "@/components/ui/button.tsx";
import { UserPlus } from "lucide-react";
import AssignTable from "@/components/Modals/assign/components/assignTable";
import UserInfoColumn from "@/components/Modals/assign/components/userInfoColumn";
import useGetStudentById from "@/api/dashboard/students/getStudentById.ts";
import useChangeStudentLectures from "@/api/dashboard/students/changeStudentLectures.ts";
import useModalStore from "@/stores/modal";
import { PulseLoader } from "react-spinners";
import React from "react";
import ModalLoader from "@/components/Modals/components/modalLoader";

export default function StudentAssignLectureModal({ close }: ModalProps) {
  const { modal } = useModalStore();
  const { mutate: assignUserToLecture, isPending: assignPending } =
    useChangeStudentLectures();
  const {
    data: studentData,
    isPending,
    isSuccess,
    isError,
  } = useGetStudentById({
    id: modal[0] && modal[0].data ? modal[0].data : "",
  });

  React.useEffect(() => {
    if (studentData?.assignedClasses) {
      setSelectedLectures(studentData.assignedClasses);
    }
  }, [studentData]);

  interface selectedLecturesInterface {
    id: string;
    lectureCode: string;
  }

  const [selectedLectures, setSelectedLectures] = React.useState<
    selectedLecturesInterface[]
  >([]);

  const handleToggleLecture = (lecture: selectedLecturesInterface) => {
    setSelectedLectures((prev) => {
      const exists = prev.some((l) => l.id === lecture.id);
      if (exists) {
        return prev.filter((l) => l.id !== lecture.id);
      } else {
        return [...prev, lecture];
      }
    });
  };

  const handleSubmit = () => {
    if (studentData) {
      const data = {
        studentId: studentData.id,
        lectures: selectedLectures,
      };
      console.log(data);
      assignUserToLecture(data);
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
  if (!studentData) return null;

  if (isError) {
    return (
      <div className="w-[340px] sm:w-[500px] md:w-[600px] p-2.5">
        <AssignHeader close={close} />
        <XSeparator extraClasses="!w-[100%] !mt-0 !mb-4" />
        <div className="flex items-center justify-center h-full">
          <p>Student not found</p>
        </div>
      </div>
    );
  }

  if (isSuccess && studentData) {
    return (
      <div className="w-[340px] sm:w-[500px] md:w-[600px] p-2.5">
        <AssignHeader close={close} />
        <XSeparator extraClasses="!w-[100%] !mt-0 !mb-4" />
        <UserInfoColumn
          name={studentData.name}
          email={studentData.email}
          studentNumber={studentData.studentNumber}
        />
        <AssignTable
          selectedLectures={selectedLectures}
          onLectureToggle={handleToggleLecture}
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
            {assignPending ? (
              <PulseLoader color="#ffffff" />
            ) : (
              <p className="flex items-center justify-center">
                <UserPlus size={20} className="mr-2" /> Seçimleri Kaydet
              </p>
            )}
          </Button>
        </div>
      </div>
    );
  }
}
