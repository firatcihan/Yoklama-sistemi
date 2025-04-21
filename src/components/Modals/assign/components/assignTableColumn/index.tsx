import { Plus } from "lucide-react";
import classNames from "classnames";
import useAssignUserToLecture from "@/api/dashboard/students/assignStudentToLecture.ts";
import useUnssignUserFromLecture from "@/api/dashboard/students/unassignStudentFromLecture.ts";

interface AssignTableColumnProps {
  lectureCode: string;
  lectureName: string;
  isAssigned: boolean;
  studentId: string;
}

export default function AssignTableColumn({
  lectureCode,
  lectureName,
  isAssigned,
  studentId,
}: AssignTableColumnProps) {

    console.log("studentId", studentId);
    console.log("lectureCode", lectureCode);
    console.log("lectureName", lectureName);

  const { mutate: assignUserToLecture } = useAssignUserToLecture();
  const { mutate: unassignUserFromLecture } = useUnssignUserFromLecture();

  const handleStudentAssign = () => {
    if (isAssigned) {
      unassignUserFromLecture({
        lectureCode: lectureCode,
        studentId: studentId,
      });
    } else {
      assignUserToLecture({
        lectureCode: lectureCode,
        studentId: studentId,
      });
    }
  };

  return (
    <div className="flex hover:bg-gray-100 rounded-sm h-12 shrink-0">
      <div className="w-[25%] flex items-center ">#{lectureCode}</div>
      <div className="w-[55%] flex items-center ">{lectureName}</div>
      <div className="w-[20%] flex items-center justify-center">
        <div
          onClick={() => handleStudentAssign()}
          className={classNames(
            "h-7 w-7 rounded-full bg-blue-500 flex items-center justify-center hover:scale-115 transition-all duration-200",
            {
              "bg-red-500": isAssigned,
              "rotate-45": isAssigned,
            },
          )}
        >
          <Plus size={20} color="#ffff" />
        </div>
      </div>
    </div>
  );
}
