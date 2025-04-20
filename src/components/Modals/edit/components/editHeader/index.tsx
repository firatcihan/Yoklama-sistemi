import XSeparator from "@/components/XSeparator";
import { X } from "lucide-react";
import useModalStore from "@/stores/modal";

export default function EditHeader({ close }: { close: () => void }) {
  const { modal } = useModalStore();
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-xl font-semibold mt-2">
        Edit{" "}
        {modal[0] && modal[0].name === "editStudent"
          ? "Student"
          : modal[0] && modal[0].name === "editTeacher"
            ? "Teacher"
            : "Lecture"}
      </p>
      <XSeparator />
      <div className="absolute top-1 right-1">
        <div
          onClick={() => close()}
          className="flex items-center justify-center p-1 !rounded-full hover:bg-gray-100 cursor-pointer transition-colors"
        >
          <X color="#6b7280" size={23} />
        </div>
      </div>
    </div>
  );
}
