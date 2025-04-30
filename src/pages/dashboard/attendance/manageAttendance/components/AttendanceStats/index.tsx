import { StatsCard } from "@/components/statsCard";
import { School, Users } from "lucide-react";
import ModalLoader from "@/components/Modals/components/modalLoader";
import useGetLectureAssignedStudents from "@/api/dashboard/students/getLectureAssignedStudents.ts";
import useGetLast2LectureAttendance from "@/api/dashboard/attendance/useGetLast2LectureAttendance.ts";

export default function AttendanceStats({
  studentsLength,
  lectureCode,
  sessionId,
}: {
  studentsLength: number;
  lectureCode: string;
  sessionId: string;
}) {
  function getAttendanceRateChange(weeks: [number, number]): string {
    const [thisWeek, lastWeek] = weeks;
    const curr = thisWeek;
    const prev = lastWeek;

    if (prev === 0) {
      if (curr === 0) return "+0.0%";
      return "+100.0%";
    }

    const change = ((curr - prev) / prev) * 100;
    const sign = change >= 0 ? "+" : "";
    return `${sign}${change.toFixed(1)}%`;
  }

  const { data: last2LectureAttendance, isLoading: last2Loading } =
    useGetLast2LectureAttendance({
      lectureCode: lectureCode,
      sessionId: sessionId,
    });

  const { data: allStudents, isLoading } = useGetLectureAssignedStudents({
    lectureCode: lectureCode,
  });

  if (!allStudents) return;
  console.log(last2LectureAttendance);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-2 mb-6">
      {isLoading || last2Loading ? (
        <div className="rounded-lg border bg-white shadow-sm dark:bg-gray-900">
          <div className="p-6">
            <ModalLoader color="#155dfc" extraClasses="mt-9 mb-9.5" />
          </div>
        </div>
      ) : (
        (() => {
          const [firstLecture, secondLecture] = last2LectureAttendance || [];
          return (
            <StatsCard
              isLoading={isLoading}
              variant="attendance"
              title="Participated Students"
              value={studentsLength.toString()}
              description={
                "from " + (allStudents?.length.toString() || "0") + " students"
              }
              icon={<Users className="h-4 w-4 text-muted-foreground" />}
              trend={((firstLecture?.participantsCount || 0) - (secondLecture?.participantsCount || 0)).toString()}
              trendDirection={
                studentsLength / allStudents.length > 0.5
                  ? "up"
                  : studentsLength / allStudents.length < 0.5
                    ? "down"
                    : "neutral"
              }
            />
          );
        })()
      )}
      {last2Loading ? (
        <div className="rounded-lg border bg-white shadow-sm dark:bg-gray-900">
          <div className="p-6">
            <ModalLoader color="#155dfc" extraClasses="mt-9 mb-9.5" />
          </div>
        </div>
      ) : (
        (() => {
          const [thisWeek, lastWeek] = last2LectureAttendance || [];

          const attendanceRateChange = getAttendanceRateChange([
            thisWeek.participateRate,
            lastWeek?.participateRate || 0,
          ]);

          return (
            <StatsCard
              isLoading={last2Loading}
              variant="attendance"
              title="Average Attendance"
              value={
                thisWeek?.participateRate === undefined
                  ? "No attendance created yet"
                  : `${thisWeek?.participateRate}%`
              }
              description="This attendance"
              icon={<School className="h-4 w-4 text-muted-foreground" />}
              trend={
                attendanceRateChange === "NaN%" ? "0.0%" : attendanceRateChange
              }
              trendDirection={
                attendanceRateChange[0] === "+"
                  ? "up"
                  : attendanceRateChange[0] === "-"
                    ? "down"
                    : "neutral"
              }
            />
          );
        })()
      )}
      {last2Loading ? (
        <div className="rounded-lg border bg-white shadow-sm dark:bg-gray-900">
          <div className="p-6">
            <ModalLoader color="#155dfc" extraClasses="mt-9 mb-9.5" />
          </div>
        </div>
      ) : (
        (() => {
          const [firstLecture, secondLecture] = last2LectureAttendance || [];
          return (
            <StatsCard
              isLoading={last2Loading}
              variant="attendance"
              title="total participants"
              value={firstLecture?.participantsCount?.toString() || "0"}
              description={"on " + firstLecture.assignedCount + " students"}
              icon={<School className="h-4 w-4 text-muted-foreground" />}
              trend={
                (
                  (firstLecture?.participantsCount || 0) -
                  (secondLecture?.participantsCount || 0)
                ).toString() + " more"
              }
              trendDirection={
                (firstLecture.participantsCount || 0) >
                (secondLecture?.participantsCount || 0)
                  ? "up"
                  : (firstLecture.participantsCount || 0) <
                      (secondLecture?.participantsCount || 0)
                    ? "down"
                    : "neutral"
              }
            />
          );
        })()
      )}
    </div>
  );
}
