import AssignTableColumn from "@/components/Modals/assign/components/assignTableColumn";
import useGetAllClasses from "@/api/dashboard/lectures/getAllClasses.ts";
import { GetStudentInterface } from "@/api/dashboard/students/studentInterface.ts";

export default function AssignTable({
  studentData,
}: {
  studentData: GetStudentInterface;
}) {
  const { data: allClasses } = useGetAllClasses();

  if (!studentData) return null;
  if (!allClasses) return null;
  return (
    <div className="flex flex-col">
      <div className="flex bg-gray-50 sticky top-0 z-10">
        <div className="w-[25%]">Code</div>
        <div className="w-[55%]">Name</div>
        <div className="w-[20%] flex items-center justify-center">Assign</div>
      </div>
      <div className="flex flex-col gap-1 max-h-64 overflow-y-auto mb-6">
        {allClasses.map((lecture) => (
          <AssignTableColumn
            studentId={studentData.id}
            lectureName={lecture.name}
            lectureCode={lecture.lectureCode}
            isAssigned={
              studentData.assignedClasses?.some(
                (studentLecture) =>
                  studentLecture.lectureCode === lecture.lectureCode,
              ) || false
            }
            key={lecture.id}
          />
        ))}
      </div>
    </div>
  );
}
