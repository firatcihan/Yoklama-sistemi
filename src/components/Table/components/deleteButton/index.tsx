import React from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu.tsx";
import useModalStore from "@/stores/modal";
import { Trash2 } from "lucide-react";

interface DeleteButtonProps {
  teacherId?: string;
  studentId?: string;
  lectureId?: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  teacherId,
  studentId,
  lectureId,
}) => {
  const { setModal } = useModalStore();

  const handleDelete = () => {
    if (teacherId) {
      setModal({ name: "deleteTeacher", data: teacherId });
    } else if (studentId) {
      setModal({ name: "deleteStudent", data: studentId });
    } else if (lectureId) {
      console.log(lectureId);
      setModal({ name: "deleteLecture", data: lectureId });
    }
  };

  return (
    <DropdownMenuItem onClick={handleDelete}>
      <div className="flex items-center justify-center">
        <div>
          <Trash2 className="h-4 w-4 mr-2 text-red-500 " />
        </div>
        <p className="text-red-500">
          Delete {teacherId ? "Teacher" : studentId ? "Student" : "Lecture"}
        </p>
      </div>
    </DropdownMenuItem>
  );
};

export default DeleteButton;
