import XSeparator from "@/components/XSeparator";
import { X } from "lucide-react";
import useModalStore from "@/stores/modal";

export default function CreateHeader({ close }: { close: () => void }) {
  const { modal } = useModalStore();
  console.log(modal[0].data)
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-xl font-semibold mt-2">
        Create New{" "}
        {modal[0] && modal[0].data === "student"
          ? "Student"
          : modal[0] && modal[0].data === "teacher"
            ? "Teacher"
            : "Lecture"}
      </p>
      <XSeparator />
      <div className="absolute top-1 right-1">
        <button onClick={close} className="!p-0 !bg-white">
          <X size={30} />
        </button>
      </div>
    </div>
  );
}
