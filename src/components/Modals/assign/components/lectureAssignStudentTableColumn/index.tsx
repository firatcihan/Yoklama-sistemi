import { Plus } from "lucide-react";
import classNames from "classnames";

interface studentOnClickFuncProps {
  studentNumber: string;
  name: string;
}

interface LectureAssignTableColumnProps {
  studentNumber: string;
  name: string;
  studentOnClickFunc: (student: studentOnClickFuncProps) => void;
  isAssigned: boolean;
}

export default function LectureAssignStudentTableColumn({
  studentNumber,
  name,
  studentOnClickFunc,
  isAssigned,
}: LectureAssignTableColumnProps) {
  return (
    <div className="flex hover:bg-gray-100 rounded-sm h-12 shrink-0">
      <div className="w-[35%] flex items-center truncate">#{studentNumber}</div>
      <div className="w-[45%] flex items-center ">{name}</div>
      <div className="w-[20%] flex items-center justify-center">
        <div
          onClick={() => {
            studentOnClickFunc({
              name: name,
              studentNumber: studentNumber,
            });
          }}
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
