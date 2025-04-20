import React from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu.tsx";
import useModalStore from "@/stores/modal";
import { Pencil } from "lucide-react";

interface EditButtonProps {
  teacherId?: string;
  studentId?: string;
  lectureId?: string;
}

const EditButton: React.FC<EditButtonProps> = ({
  teacherId,
  studentId,
  lectureId,
}) => {
  const { setModal } = useModalStore();

  const handleEdit = () => {
    if (teacherId) {
      setModal({ name: "editTeacher", data: teacherId });
    } else if (studentId) {
      setModal({ name: "editStudent", data: studentId });
    } else if (lectureId) {
      console.log(lectureId);
      setModal({ name: "editLecture", data: lectureId });
    }
  };

  return (
    <DropdownMenuItem onClick={handleEdit}>
      <div className="flex items-center justify-center">
        <div>
          <Pencil className="h-4 w-4 mr-2 " />
        </div>
        <p>Edit {teacherId ? "Teacher" : studentId ? "Student" : "Lecture"}</p>
      </div>
    </DropdownMenuItem>
  );
};

export default EditButton;
