import useGetTeachers from "@/api/dashboard/teachers/GetTeachers.ts";
import useGetStudents from "@/api/dashboard/students/getStudents.ts";
import useGetAllClasses from "@/api/dashboard/lectures/getAllClasses.ts";
import { BeatLoader } from "react-spinners";

export default function DashboardInfo() {
  const { data: teachers, isLoading: teacherLoading } = useGetTeachers();
  const { data: students, isLoading: studentLoading } = useGetStudents();
  const { data: lectures, isLoading: lectureLoading } = useGetAllClasses();
  return (
    <div className="sm:mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
      <div className="bg-white rounded-xl shadow-xs p-4 sm:p-6">
        <p className="text-xs sm:text-sm font-medium text-gray-500">
          Total Students
        </p>
        <p className="mt-1 sm:mt-2 text-xl sm:text-3xl font-semibold text-gray-900">
          {studentLoading ? (
            <BeatLoader color="#3b82f6" size={11} />
          ) : students ? (
            students.length
          ) : (
            0
          )}
        </p>
      </div>
      <div className="bg-white rounded-xl shadow-xs p-4 sm:p-6">
        <p className="text-xs sm:text-sm font-medium text-gray-500">
          Active Lectures
        </p>
        <p className="mt-1 sm:mt-2 text-xl sm:text-3xl font-semibold text-gray-900">
          {lectureLoading ? (
            <BeatLoader color="#3b82f6" size={11} />
          ) : lectures ? (
            lectures.length
          ) : (
            0
          )}
        </p>
      </div>
      <div className="bg-white rounded-xl shadow-xs p-4 sm:p-6">
        <p className="text-xs sm:text-sm font-medium text-gray-500">Teachers</p>
        <p className="mt-1 sm:mt-2 text-xl sm:text-3xl font-semibold text-gray-900">
          {teacherLoading ? (
            <BeatLoader color="#3b82f6" size={11} />
          ) : teachers ? (
            teachers.length
          ) : (
            0
          )}
        </p>
      </div>
      <div className="bg-white rounded-xl shadow-xs p-4 sm:p-6">
        <p className="text-xs sm:text-sm font-medium text-gray-500">
          Today's Sessions
        </p>
        <p className="mt-1 sm:mt-2 text-xl sm:text-3xl font-semibold text-gray-900">
          In Progress!
        </p>
      </div>
    </div>
  );
}
