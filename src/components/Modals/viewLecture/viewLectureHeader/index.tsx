import XSeparator from "@/components/XSeparator";
import { X } from "lucide-react";
import { RawLecture } from "@/api/dashboard/lectures/getLectureById.ts";

export default function ViewLectureHeader({
  close,
  lectureData,
}: {
  close: () => void;
  lectureData: RawLecture;
}) {
  return (
    <div className="flex flex-col justify-center items-center ">
        <p className="font-semibold text-lg">{lectureData.name}</p>
      <XSeparator />
      <div className="absolute top-1 right-1">
        <button onClick={close} className="!p-0 !bg-white">
          <X size={30} />
        </button>
      </div>
    </div>
  );
}
