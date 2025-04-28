import { Teacher, teacherColumns } from "@/components/Table/TeacherColumns.tsx";
import { DataTable } from "@/components/Table/dataTable.tsx";
import { FileSpreadsheet, UserPlus } from "lucide-react";
import useModalStore from "@/stores/modal";
import useGetTeachers from "@/api/dashboard/teachers/GetTeachers.ts";
import { Button } from "@/components/ui/button.tsx";
import TeacherStats from "@/pages/dashboard/teachers/teacherStats";

export default function ManageStudents() {
  const { setModal } = useModalStore();
  const { data, isLoading, isError } = useGetTeachers();
  const teachers: Teacher[] =
    data && data.length > 0
      ? data?.map((teacher) => ({
          id: teacher.id,
          name: teacher.name,
          email: teacher.email,
          classes:
            teacher.classes?.map((cls) => cls.lectureCode).join(", ") || "",
        }))
      : [];

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (isError) {
    return <div>error...</div>;
  }

  return (
    <div className="container mx-auto py-6 space-y-6 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <p className="text-3xl font-bold tracking-tight">
            Teacher Management
          </p>
          <p className="text-muted-foreground mt-1 font-medium">
            Manage teacher information, enrollment, and attendance records
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="hidden md:flex">
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button
            onClick={() => setModal({ name: "createTeacher", data: "teacher" })}
            className="hover:!bg-[#1447e6] !transition-colors !bg-[#155dfc] !outline-none "
          >
            <UserPlus className="mr-1 h-5 w-5" />
            Create Teacher
          </Button>
        </div>
      </div>
      <TeacherStats teachersLength={teachers.length} />
      <div className="py-10 flex flex-col border border-[#e5e5e5] rounded-lg shadow">
        <div className="mb-3 px-10">
          <p className="text-[19px] font-semibold leading-none tracking-tight">
            Teachers Directory
          </p>
          <p className="text-sm font-semibold text-muted-foreground">
            View and manage all teacher information and records
          </p>
        </div>
        <div className="sm:px-10 max-sm:flex max-sm:items-center max-sm:justify-center max-sm:w-full">
          <DataTable
            columns={teacherColumns}
            data={teachers}
            variant="student"
          />
        </div>
      </div>
    </div>
  );
}
