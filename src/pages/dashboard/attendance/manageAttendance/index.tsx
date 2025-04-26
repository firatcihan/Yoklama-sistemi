import { Search } from "lucide-react";
import { useState } from "react";
import useGetAllClasses from "@/api/dashboard/lectures/getAllClasses.ts";
import { useNavigate } from "react-router-dom";

export default function ManageAttendance() {
  const { data: lecturesData, isLoading, isError } = useGetAllClasses();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading lectures data</div>;
  }

  if (!lecturesData || lecturesData.length === 0)
    return <div>Error loading lectures data</div>;

  const filteredLectures = lecturesData.filter(
    (lecture) =>
      lecture.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lecture.instructor.name &&
        lecture.instructor.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase())),
  );

  return (
    <div className="container mx-auto py-6 space-y-6 px-4 md:px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <p className="text-3xl font-bold tracking-tight">
            Attendance Management
          </p>
          <p className="text-muted-foreground mt-1 font-medium">
            View and update attendance records for all lectures and students
          </p>
        </div>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search lectures or instructors..."
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredLectures.length === 0 && (
        <div className="w-full flex items-center justify-center bg-white border !border-[#e5e7eb] rounded-xl p-4 sm:p-6 text-left">
          <p className="text-gray-500">No lectures found</p>
        </div>
      )}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredLectures.map((lecture) => (
          <div
            onClick={() => navigate(`${lecture.lectureCode}`)}
            key={lecture.id}
            className="w-full bg-white border !border-[#e5e7eb] rounded-xl cursor-pointer !shadow-xs p-4 sm:p-6 text-left transition-all duration-200 hover:!shadow-md hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <div
              className={`text-sm font-medium mb-2 inline-flex px-2.5 py-1 rounded-full bg-blue-100 text-blue-800`}
            >
              Scheduled
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {lecture.name}
            </h3>
            <p className="text-gray-600 mb-1">
              {lecture.instructor.name || "No Instructor"}
            </p>
            <p className="text-sm text-gray-500">Tue, 2:00 PM - 3:30 PM</p>
          </div>
        ))}
      </div>
    </div>
  );
}
