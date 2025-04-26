import { useParams } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";
import useGetAttendancesGroupByWeekByLectureCode from "@/api/dashboard/attendance/getAttendancesGroupByWeekByLectureCode.ts";
import useGetLectureByLectureCode from "@/api/dashboard/lectures/GetLectureByLectureCode.ts";
import PageLoader from "@/components/pageLoader";
import { useNavigate } from "react-router-dom";

export default function ManageLectureAttendance() {
  const { lectureCode } = useParams<{
    lectureCode: string;
    lectureId: string;
  }>();
  const {
    data: lecturesData,
    isLoading,
    isError,
  } = useGetAttendancesGroupByWeekByLectureCode({
    lectureCode: lectureCode || "",
  });

  const {
    data: selectedLecture,
    isLoading: isLoadingLecture,
    isError: isErrorLecture,
  } = useGetLectureByLectureCode({
    lectureCode: lectureCode || "",
  });

  const navigate = useNavigate();

  if (isLoading || isLoadingLecture) return <PageLoader />;
  if (isError || isErrorLecture) return <div>Error loading lectures data</div>;
  if (!lecturesData || lecturesData.length === 0 || !selectedLecture)
    return <div>No attendance has been created yet for this lecture.</div>;

  return (
    <div className="container mx-auto bg-white rounded-xl overflow-hidden mt-3">
      <div className="mb-8 pl-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 !pl-0 !border-none !outline-none !bg-white hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Lectures
        </button>
        <h1 className="text-3xl font-bold text-gray-900">
          {selectedLecture.name}
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          {selectedLecture?.instructor.name || "No instructor"} • tuesday, 10:00
          AM - 12:00 PM
        </p>
      </div>
      <div className="border rounded-lg shadow-sm bg-white">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            Select Lesson Day
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Choose a specific lesson day to view attendance
          </p>
        </div>
        <div className="p-6">
          {[...lecturesData].reverse().map((week) => (
            <div key={week.week} className="mb-6 last:mb-0">
              <p className="text-sm font-medium text-gray-500 mb-3">
                Week {week.week}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {week.happendLectures.map((day) => {
                  const dbCreationDate = new Date(day.createdAt._seconds * 1000)
                    .toISOString()
                    .slice(0, 10); //2024-01-01

                  const lessonDay = new Date(
                    day.createdAt._seconds * 1000,
                  ).toLocaleDateString("en-US", { weekday: "long" });

                  const dbExpirationDate = new Date(
                    day.expiresAt._seconds * 1000,
                  );

                  const isExpired =
                    dbExpirationDate.getTime() < new Date().getTime();

                  return (
                    <div
                      onClick={() =>
                        navigate(`${day.attendanceId}`)
                      }
                      key={day.attendanceId}
                      className="flex items-center p-4 rounded-lg border transition-all cursor-pointer hover:shadow-md hover:bg-gray-50 transition-all"
                    >
                      <Calendar
                        className={`w-5 h-5 mr-3 ${
                          isExpired ? "text-green-500" : "text-blue-500"
                        }`}
                      />
                      <div className="text-left">
                        <div className="font-medium text-gray-900">
                          {lessonDay}
                        </div>
                        <div className="text-sm text-gray-500">
                          {dbCreationDate}
                        </div>
                      </div>
                      {day.lectureCode && (
                        <span className="ml-auto text-xs font-medium text-green-500">
                          Completed
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
