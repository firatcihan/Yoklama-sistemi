import { studentColumns, Student } from "@/components/Table/StudentColumns.tsx";
import { DataTable } from "@/components/Table/dataTable.tsx";
import useGetStudents from "@/api/dashboard/students/getStudents.ts";
import SubmitButton from "@/components/submitButton";
import { UserPlus } from "lucide-react";
import useModalStore from "@/stores/modal";

export default function ManageStudents() {
  const { setModal } = useModalStore();
  const { data, isLoading, isError } = useGetStudents();
  const students: Student[] =
    data && data.length > 0
      ? data?.map((student) => ({
          id: student.id,
          name: student.name,
          email: student.email,
          assignedClasses: student.assignedClasses.join(", "),
          studentNumber: student.studentNumber,
        }))
      : [];

  console.log(students);
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
            Students Information
          </p>
          <div className="flex justify-center items-center">
            <SubmitButton
              text="Create Student"
              bgColor="#1e376d"
              onHoverColor="#2e4d8f"
              textIconPosition="left"
              textIcon={<UserPlus className="w-5 h-5" />}
              onClick={() => setModal({name: "createStudent", data: "student"})}
            />
          </div>
        </div>
        <DataTable variant="student" columns={studentColumns} data={students} />
      </div>
    </>
  );
}
