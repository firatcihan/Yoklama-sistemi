import { Teacher, teacherColumns } from "@/components/Table/TeacherColumns.tsx";
import { DataTable } from "@/components/Table/dataTable.tsx";
import SubmitButton from "@/components/submitButton";
import { UserPlus } from "lucide-react";
import useModalStore from "@/stores/modal";
import { useEffect } from "react";
import useGetTeachers from "@/api/dashboard/teachers/GetTeachers.ts";

export default function ManageStudents() {
  const { setModal, modal } = useModalStore();
  const { data, isLoading, isError } = useGetTeachers();
  const teachers: Teacher[] =
    data?.map((teacher) => ({
      id: teacher.id,
      name: teacher.name,
      email: teacher.email,
      classes: teacher.classes.join(", "),
    })) || [];

  useEffect(() => {
    console.log(modal);
  }, [modal, setModal]);

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (isError) {
    return <div>error...</div>;
  }

  return (
    <>
      <div className="container mx-auto py-10 px-3 rounded-xl bg-[#f7f8f9]">
        <div className="mb-4 flex justify-between items-center">
          <p className="text-xl sm:text-2xl font-semibold">
            Teachers Information
          </p>
          <div className="flex justify-center items-center mr-2">
            <SubmitButton
              text="Create Teacher"
              bgColor="#1e376d"
              onHoverColor="#2e4d8f"
              textIconPosition="left"
              textIcon={<UserPlus className="w-5 h-5" />}
              onClick={() => setModal("createTeacher", "teacher")}
            />
          </div>
        </div>
        <DataTable variant="teacher" columns={teacherColumns} data={teachers} />
      </div>
    </>
  );
}
