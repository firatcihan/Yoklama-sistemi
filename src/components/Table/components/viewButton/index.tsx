import React from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu.tsx";
import useModalStore from "@/stores/modal";
import { Eye } from "lucide-react";

interface ViewButtonProps {
  teacherId?: string;
  studentId?: string;
  lectureId?: string;
}

const ViewButton: React.FC<ViewButtonProps> = ({
  teacherId,
  studentId,
  lectureId,
}) => {
  const { setModal } = useModalStore();

  const handleView = () => {
    if (teacherId) {
      setModal({ name: "viewTeacher", data: teacherId });
    } else if (studentId) {
      setModal({ name: "viewStudent", data: studentId });
    } else if (lectureId) {
      console.log(lectureId);
      setModal({ name: "viewLecture", data: lectureId });
    }
  };

  return (
    <DropdownMenuItem onClick={handleView}>
      <div className="flex items-center justify-center">
        <div>
          <Eye className="h-4 w-4 mr-2 " />
        </div>
        <p>
          View {teacherId ? "Teacher" : studentId ? "Student" : "Lecture"}
        </p>
      </div>
    </DropdownMenuItem>
  );
};

export default ViewButton;
