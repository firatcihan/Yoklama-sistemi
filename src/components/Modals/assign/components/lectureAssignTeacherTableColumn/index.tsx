import { Plus } from "lucide-react";
import classNames from "classnames";

interface teacherOnClickFuncProps {
  name: string;
  id: string;
  email: string;
}

interface LectureAssignTableColumnProps {
  name: string;
  email: string;
  id: string;
  teacherOnClickFunc: (teacher: teacherOnClickFuncProps) => void;
  isAssigned: boolean;
}

export default function LectureAssignTeacherTableColumn({
  name,
  email,
  id,
  teacherOnClickFunc,
  isAssigned,
}: LectureAssignTableColumnProps) {
  return (
    <div className="flex hover:bg-gray-100 rounded-sm h-12 shrink-0">
      <div className="w-[35%] flex items-center truncate">#{email}</div>
      <div className="w-[45%] flex items-center ">{name}</div>
      <div className="w-[20%] flex items-center justify-center">
        <div
          onClick={() => {
            teacherOnClickFunc({
              id: id,
              name: name,
              email: email,
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
