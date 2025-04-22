import { Plus } from "lucide-react";
import classNames from "classnames";

interface selectedLecturesInterface {
  id: string;
  lectureCode: string;
}

interface AssignTableColumnProps {
  lectureCode: string;
  lectureName: string;
  lectureId: string;
  onClickFunc: (lecture: selectedLecturesInterface) => void;
  isAssigned: boolean;
}

export default function AssignTableColumn({
  lectureCode,
  lectureName,
  lectureId,
  onClickFunc,
  isAssigned,
}: AssignTableColumnProps) {
  return (
    <div className="flex hover:bg-gray-100 rounded-sm h-12 shrink-0">
      <div className="w-[25%] flex items-center ">#{lectureCode}</div>
      <div className="w-[55%] flex items-center ">{lectureName}</div>
      <div className="w-[20%] flex items-center justify-center">
        <div
          onClick={() =>
            onClickFunc({ id: lectureId, lectureCode: lectureCode })
          }
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
