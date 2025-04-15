import { CircleUser, Users, X } from "lucide-react";
import XSeparator from "@/components/XSeparator";
import { ModalProps } from "@/components/Modals/allModals.ts";
import useModalStore from "@/stores/modal";
import useGetLectureById from "@/api/dashboard/lectures/getLectureById.ts";

export default function ViewAssignedStudentsSubModal({ close }: ModalProps) {
  const { modal } = useModalStore();
  const { data: lectureStudentsData } = useGetLectureById({
    id: modal[0] && modal[0].data ? modal[0].data : "",
  });

  if (!lectureStudentsData) return null;

  return (
    <div className="w-[280px] sm:w-[430px] bg-white flex flex-col relative">
      <div className="flex items-center justify-between p-4">
        <p className="font-semibold leading-7 text-[20px]">Enrolled Students</p>
        <div
          onClick={() => close()}
          className="flex items-center justify-center p-1 !rounded-full hover:bg-gray-100 cursor-pointer transition-colors"
        >
          <X color="#6b7280" size={23} />
        </div>
      </div>
      <XSeparator extraClasses="!w-[100%] !mt-0" />
      <div className="pt-2 pb-2">
        <div className="flex items-center px-2 justify-between mb-4">
          <div className="w-[62%]">
            <h3 className="text-[12px] font-semibold text-gray-900">
              YAZILIM TEKNOLOJİLERİ GELİŞTİRME
            </h3>
            <p className="text-[9px] text-gray-500">
              {lectureStudentsData.lectureCode}
            </p>
          </div>
          <div className="flex items-center bg-blue-50 px-2 py-1 rounded-full max-h-[26px]">
            <Users size={17} className="mr-2" />
            <span className="text-[12px] font-medium text-blue-700">
              {lectureStudentsData.participants.length} Students
            </span>
          </div>
        </div>
        <XSeparator extraClasses="!w-[100%] !border-1 border-gray-300 !mt-0" />
        <div className="max-h-[324px] overflow-auto px-4">
          {lectureStudentsData.participants.map((student) => (
            <>
              <div className="flex items-center py-3">
                <CircleUser size={32} className="mr-3 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {student.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    #{student.studentNumber}
                  </p>
                </div>
              </div>
              <hr />
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
