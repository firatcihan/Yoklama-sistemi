import React from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu.tsx";
import useModalStore from "@/stores/modal";

interface actionsButtonProps {
  teacherId?: string;
  studentId?: string;
  lectureId?: string;
  modalName: string;
  text?: string;
  icon?: React.ReactNode;
}

const ActionsButton: React.FC<actionsButtonProps> = ({
  teacherId,
  studentId,
  lectureId,
  modalName,
  text,
  icon,
}) => {
  const { setModal } = useModalStore();

  const handleAction = () => {
    if (teacherId) {
      setModal({ name: modalName, data: teacherId });
    } else if (studentId) {
      setModal({ name: modalName, data: studentId });
    } else if (lectureId) {
      console.log(lectureId);
      setModal({ name: modalName, data: lectureId });
    }
  };

  return (
    <DropdownMenuItem onClick={handleAction}>
      <div className="flex items-center justify-center  gap-2">
        <p className="h-4 w-4">{icon}</p>
        <p>{text}</p>
      </div>
    </DropdownMenuItem>
  );
};

export default ActionsButton;
