import { columns, Student } from "@/components/Table/columns.tsx";
import { DataTable } from "@/components/Table/dataTable.tsx";
import useGetStudents from "@/api/dashboard/students/getStudents.ts";

export default function ManageStudents() {
  const { data, isLoading, isError } = useGetStudents();
  const students: Student[] =
    data?.map((student) => ({
      id: student.id,
      name: student.name,
      email: student.email,
      assignedClasses: student.assignedClasses.join(", "),
      studentNumber: student.studentNumber,
    })) || [];

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (isError) {
    return <div>error...</div>;
  }

  console.log(students[2].assignedClasses);

  return (
    <div className="container mx-auto py-10 px-3">
      <DataTable columns={columns} data={students} />
    </div>
  );
}
