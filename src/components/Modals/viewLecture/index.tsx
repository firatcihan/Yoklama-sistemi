import useGetLectureById from "@/api/dashboard/lectures/getLectureById.ts";
import useModalStore from "@/stores/modal";
import { ModalProps } from "@/components/Modals/allModals.ts";
import { X, Hash, Users, Clock, CalendarDays, UserPen, History } from "lucide-react";
import XSeparator from "@/components/XSeparator";

export default function ViewLecture({ close }: ModalProps) {
  const { modal } = useModalStore();
  const { data: lectureData } = useGetLectureById({
    id: modal && modal.data ? modal.data : "",
  });

  if (!lectureData) return <div>Ders ile ilgili veri bulunamadı...</div>;

  return (
    <div className="w-[380px] sm:w-[500px] md:w-[620px] bg-white shadow-lg flex flex-col relative">
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
      <div className="p-6">
        <p className="font-bold leading-8 text-[24px] mb-2">
          Introduction to Computer Science
        </p>
        <div className="text-[#4b5563] flex items-center mb-4">
          <div className="mr-1.5">
            <Hash size={16} />
          </div>
          <p className="text-[14px] font-normal leading-5">CS101</p>
        </div>
        <XSeparator extraClasses="!w-[100%] !mt-0 !mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6.5">
          <div className="space-y-1">
            <h4 className="text-sm font-medium text-gray-500">Instructor</h4>
            <p className="text-base text-gray-900">
              {lectureData.instructor.name ? (
                <div className="flex items-center">
                  <UserPen color="#4b5563" size={17} className="mr-2" />
                  <div>
                    <div className="text-sm font-medium">
                      {lectureData.instructor.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {lectureData.instructor.email}
                    </div>
                  </div>
                </div>
              ) : (
                "No instructor"
              )}
            </p>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-medium text-gray-500 mr-5">
              Participants
            </h4>

            <div className="flex items-center justify-between">
              <div className="flex items-center text-base text-gray-900">
                <Users color="#4b5563" size={17} className="mr-2" />
                <span className="mr-2">
                  {lectureData.participants.length} students
                </span>
                <button className="!py-0 text-[14px] text-blue-500 !bg-white hover:!bg-gray-100 !transition-colors hover:!border-[#f9f9f9] !outline-none ">
                  view list
                </button>
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-medium text-gray-500">Time</h4>
            <div className="flex items-center text-base text-gray-900">
              <Clock color="#4b5563" size={17} className="mr-2" />
              <span>09:00 AM - 10:30 AM</span>
            </div>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-medium text-gray-500">Lesson Days</h4>
            <div className="flex items-center text-base text-gray-900">
              <CalendarDays color="#4b5563" size={17} className="mr-2" />
              <span>Monday, Wednesday</span>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-gray-50 p-4 space-y-3">
          <h4 className="text-md font-medium text-gray-500 flex items-center">
              <History className="mr-2" />
            Timeline
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Created</span>
              <span className="text-gray-900">March 1, 2024 at 12:00 PM</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Last Updated</span>
              <span className="text-gray-900">March 15, 2024 at 05:30 PM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
