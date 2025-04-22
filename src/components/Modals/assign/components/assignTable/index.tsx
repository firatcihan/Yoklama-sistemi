import AssignTableColumn from "@/components/Modals/assign/components/assignTableColumn";
import useGetAllClasses from "@/api/dashboard/lectures/getAllClasses.ts";
import { GetStudentInterface } from "@/api/dashboard/students/studentInterface.ts";
import ModalLoader from "@/components/Modals/components/modalLoader";

interface selectedLecturesInterface {
  id: string;
  lectureCode: string;
}

interface AssignTableProps {
  studentData: GetStudentInterface;
  selectedLectures: selectedLecturesInterface[];
  onLectureToggle: (lec: selectedLecturesInterface) => void;
}

export default function AssignTable({
  studentData,
  selectedLectures,
  onLectureToggle,
}: AssignTableProps) {
  const { data: allClasses } = useGetAllClasses();

  if (studentData && allClasses) {
    return (
      <div className="flex flex-col">
        <div className="flex bg-gray-50 sticky top-0 z-10">
          <div className="w-[25%]">Code</div>
          <div className="w-[55%]">Name</div>
          <div className="w-[20%] flex items-center justify-center">Assign</div>
        </div>
        <div className="flex flex-col gap-1 max-h-64 overflow-y-auto mb-6">
          {allClasses.map((lecture) => {
            const isAssigned = selectedLectures.some(
              (sl) => sl.id === lecture.id,
            );
            return (
              <AssignTableColumn
                key={lecture.id}
                lectureId={lecture.id}
                lectureCode={lecture.lectureCode}
                lectureName={lecture.name}
                isAssigned={isAssigned}
                onClickFunc={onLectureToggle}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return <ModalLoader />;
  }
}
