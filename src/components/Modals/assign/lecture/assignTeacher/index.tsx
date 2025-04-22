import { ModalProps } from "@/components/Modals/allModals.ts";
import useModalStore from "@/stores/modal";
import useAssignTeacherToLecture from "@/api/dashboard/lectures/assignTeacherToLecture.ts";
import useGetLectureById from "@/api/dashboard/lectures/getLectureById.ts";
import React from "react";
import AssignHeader from "@/components/Modals/assign/components/assignHeader";
import XSeparator from "@/components/XSeparator";
import ModalLoader from "@/components/Modals/components/modalLoader";
import LectureInfoColumn from "@/components/Modals/assign/components/lectureInfoColumn";
import LectureAssignTeacherTable from "@/components/Modals/assign/components/lectureAssignTeacherTable";
import { Button } from "@/components/ui/button.tsx";
import { PulseLoader } from "react-spinners";
import { UserPlus } from "lucide-react";

export default function LectureAssignTeacherModal({ close }: ModalProps) {
  const { modal } = useModalStore();
  const { mutate: assignMutate, isPending: assignPending } =
    useAssignTeacherToLecture();

  const {
    data: lectureData,
    isPending,
    isSuccess,
    isError,
  } = useGetLectureById({
    id: modal[0] && modal[0].data ? modal[0].data : "",
  });

  React.useEffect(() => {
    if (
      lectureData &&
      lectureData?.instructor.name &&
      lectureData?.instructor.name.length > 0
    ) {
      setSelectedTeacher(lectureData?.instructor);
    }
  }, [lectureData]);

  interface selectedTeacherInterface {
    name: string;
    email: string;
    id: string;
  }

  const [selectedTeacher, setSelectedTeacher] =
    React.useState<selectedTeacherInterface>({} as selectedTeacherInterface);

  React.useEffect(() => {
    console.log(selectedTeacher);
  }, [selectedTeacher]);

  const handleToggleLecture = (instructor: selectedTeacherInterface) => {
    setSelectedTeacher((prev) => {
      if (prev.id === instructor.id) {
        return {} as selectedTeacherInterface;
      } else {
        return instructor;
      }
    });
  };

  const handleSubmit = () => {
    if (lectureData) {
      const data = {
        lectureId: lectureData.id,
        instructor: {
          id: selectedTeacher.id,
          name: selectedTeacher.name,
          email: selectedTeacher.email,
        },
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
        <LectureAssignTeacherTable
          selectedTeacher={selectedTeacher}
          onTeacherToggle={handleToggleLecture}
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
