import { Lecture, lectureColumns } from "@/components/Table/LectureColumns.tsx";
import { DataTable } from "@/components/Table/dataTable.tsx";
import { FileSpreadsheet, UserPlus } from "lucide-react";
import useModalStore from "@/stores/modal";
import useAuthStore from "@/stores/auth";
import useGetAllClasses from "@/api/dashboard/lectures/getAllClasses.ts";
import { Button } from "@/components/ui/button.tsx";
import LectureStats from "@/pages/dashboard/lectures/lectureStats";
import PageLoader from "@/components/pageLoader";

export default function ManageLectures() {
  const { user } = useAuthStore();
  const { setModal } = useModalStore();
  const { data, isLoading, isError } = useGetAllClasses();
  const lectures: Lecture[] =
    data && data.length > 0
      ? data?.map((lecture) => ({
          id: lecture.id,
          name: lecture.name,
          instructor: lecture.instructor,
          participants: lecture.participants,
          lectureCode: lecture.lectureCode,
          participantsCount: lecture.participants.length.toString(),
        }))
      : [];

  if (isLoading) {
    return <PageLoader />
  }

  if (isError) {
    return <div>error...</div>;
  }

  return (
    <div className="container mx-auto py-6 space-y-6 px-4 md:px-6 overflow-x-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <p className="text-3xl font-bold tracking-tight">
            Lecture Management
          </p>
          <p className="text-muted-foreground mt-1 font-medium">
            Manage lecture schedules, instructors, and attendance records
          </p>
        </div>
        {user?.role === "admin" && (
          <div className="flex items-center gap-2">
            <Button variant="outline" className="hidden md:flex">
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button
              onClick={() =>
                setModal({ name: "createLecture", data: "lecture" })
              }
              className="hover:!bg-[#1447e6] !transition-colors !bg-[#155dfc] !outline-none "
            >
              <UserPlus className="mr-1 h-5 w-5" />
              Create Lecture
            </Button>
          </div>
        )}
      </div>
      <LectureStats lecturesLength={lectures.length} />
      <div className="py-10 flex flex-col border border-[#e5e5e5] rounded-lg shadow">
        <div className="mb-3 px-10">
          <p className="text-[19px] font-semibold leading-none tracking-tight">
            Lectures Directory
          </p>
          <p className="text-sm font-semibold text-muted-foreground">
            View and manage all lecture information and schedules
          </p>
        </div>
        <div className="sm:px-10 max-sm:flex max-sm:items-center max-sm:justify-center max-sm:w-full">
          <DataTable
            columns={lectureColumns}
            data={lectures}
            variant="lecture"
          />
        </div>
      </div>
    </div>
  );
}
