import AssignHeader from "@/components/Modals/assign/components/assignHeader";
import { ModalProps } from "@/components/Modals/allModals.ts";
import XSeparator from "@/components/XSeparator";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { UserPlus } from "lucide-react";
import AssignTable from "@/components/Modals/assign/components/assignTable";
import UserInfoColumn from "@/components/Modals/assign/components/userInfoColumn";
import useGetStudentById from "@/api/dashboard/students/getStudentById.ts";
import useModalStore from "@/stores/modal";

export default function StudentAssignLectureModal({ close }: ModalProps) {
  const { modal } = useModalStore();
  const { data: studentData } = useGetStudentById({
    id: modal[0] && modal[0].data ? modal[0].data : "",
  });

  if (!studentData) return null;

  return (
    <div className="w-[340px] sm:w-[500px] md:w-[600px] p-2.5">
      <AssignHeader close={close} />
      <XSeparator extraClasses="!w-[100%] !mt-0 !mb-4" />
      <UserInfoColumn
        name={studentData.name}
        email={studentData.email}
        studentNumber={studentData.studentNumber}
      />
      <div className="mb-4">
        <label
          htmlFor="searchLectures"
          className="block text-sm font-medium text-gray-700"
        >
          Search Lectures
        </label>
        <Input
          type="text"
          id="searchLectures"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Search by name, code or instructor..."
        />
      </div>
      <XSeparator extraClasses="!w-[100%] !mt-0 !mb-2" />
      <AssignTable studentData={studentData} />
      <div className="flex justify-end ">
        <Button
          variant="destructive"
          className="!bg-[#dc2625] hover:!bg-[#dc2625]/90"
          type="button"
          onClick={close}
        >
          Vazgeç
        </Button>
        <Button
          variant="destructive"
          className="bg-primary hover:!bg-[#1e376d]/90 ml-3"
          onClick={close}
        >
          <p className="flex items-center justify-center">
            <UserPlus size={20} className="mr-2" /> Tamamla
          </p>
        </Button>
      </div>
    </div>
  );
}
