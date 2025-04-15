import { X } from "lucide-react";
import XSeparator from "@/components/XSeparator";
import { ModalProps } from "@/components/Modals/allModals.ts";

export default function ViewAssignedStudentsSubModal({ close }: ModalProps) {
  return (
    <div className="w-[350px] sm:w-[470px] md:w-[590px] bg-white flex flex-col relative">
      <div className="flex items-center justify-between p-4">
        <p className="font-semibold leading-7 text-[20px]">Lecture Details</p>
        <div
          onClick={() => close()}
          className="flex items-center justify-center p-1 !rounded-full hover:bg-gray-100 cursor-pointer transition-colors"
        >
          <X color="#6b7280" size={23} />
        </div>
      </div>
      <XSeparator extraClasses="!w-[100%] !mt-0" />
    </div>
  );
}
