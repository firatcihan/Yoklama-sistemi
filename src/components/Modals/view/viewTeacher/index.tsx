import { ModalProps } from "@/components/Modals/allModals.ts";
import CloseButton from "@/components/closeButton";
import useModalStore from "@/stores/modal";
import useGetTeacherById from "@/api/dashboard/teachers/GetTeacherById.ts";
import XSeparator from "@/components/XSeparator";
import TimeLine from "@/components/Modals/view/components/timeLine";

export default function ViewTeacher({ close }: ModalProps) {
  const { modal } = useModalStore();
  const { data: teacherData } = useGetTeacherById({
    id: modal[0] && modal[0].data ? modal[0].data : "",
  });

  if (!teacherData) return null;

  return (
    <div className="w-[320px] bg-white rounded-sm">
      <div className="flex items-center justify-between px-4 py-6">
        <div>
          <p className="text-[24px] font-semibold leading-6">
            {teacherData.name}
          </p>
        </div>
        <CloseButton close={close} />
      </div>
      <XSeparator extraClasses="!w-[100%] !mt-0" />
      <div className="px-4 py-6">
        <div className="mb-6.5">
          <p className="font-semibold text-[18px] text-[#6b7280] leading-5 mb-4">
            Basic Information
          </p>
          <div className="grid grid-cols-1 gap-4 mb-6">
            <div>
              <p className="font-normal text-[16px] text-[#6b7280] leading-5">
                Email
              </p>
              <p className="font-normal text-[16px] text-black leading-5">
                {teacherData.email}
              </p>
            </div>
          </div>
          <div>
            <p className="font-semibold text-[18px] text-[#6b7280] leading-5 mb-4">
              Assigned Classes
            </p>
            <div className="flex flex-wrap gap-2">
              {teacherData.classes &&
                teacherData.classes.length > 0 &&
                teacherData.classes.map((lecture) => (
                  <div
                    key={lecture.id}
                    className="flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                  >
                    {lecture.lectureCode}
                  </div>
                ))}
              {teacherData.classes.length === 0 && (
                <div className="flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                  No assigned classes
                </div>
              )}
            </div>
          </div>
        </div>
        <TimeLine
          createTime={teacherData.createTime}
          lastUpdateTime={teacherData.lastUpdateTime}
        />
      </div>
    </div>
  );
}
