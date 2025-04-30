import { StatsCard } from "@/components/statsCard";
import { School, Users } from "lucide-react";
import useGetLast2WeeksAttendances from "@/api/dashboard/info/geLast2WeekAttendances.ts";
import useAuthStore from "@/stores/auth";
import ModalLoader from "@/components/Modals/components/modalLoader";
import useGetLecturesCreateInfo from "@/api/dashboard/info/getLecturesCreateInfo.ts";

export default function LectureStats({
  lecturesLength,
}: {
  lecturesLength: number;
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

  const { user } = useAuthStore();

  const {
    data: attendanceData,
    isLoading: attendanceLoading,
    isError: attendanceError,
  } = useGetLast2WeeksAttendances({ teacherId: user?.id || "" });

  const {
    data: createInfo,
    isLoading: createInfoLoading,
    isError: createInfoError,
  } = useGetLecturesCreateInfo();

  if (createInfoError || attendanceError) {
    return <div>error...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {createInfoLoading ? (
        <div className="rounded-lg border bg-white shadow-sm dark:bg-gray-900">
          <div className="p-6">
            <ModalLoader color="#155dfc" extraClasses="mt-9 mb-9.5" />
          </div>
        </div>
      ) : (
        <StatsCard
          isLoading={createInfoLoading}
          variant="week"
          title="Total Lectures"
          value={lecturesLength.toString()}
          description="Active lectures"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          trend={(createInfo?.createdThisWeek.toString() || "0") + " more"}
          trendDirection={
            (createInfo?.createdThisWeek || 0) > 0
              ? "up"
              : (createInfo?.createdThisWeek || 0) < 0
                ? "down"
                : "neutral"
          }
        />
      )}
      {attendanceLoading ? (
        <div className="rounded-lg border bg-white shadow-sm dark:bg-gray-900">
          <div className="p-6">
            <ModalLoader color="#155dfc" extraClasses="mt-9 mb-9.5" />
          </div>
        </div>
      ) : (
        (() => {
          const [thisWeek, lastWeek] = attendanceData || [];

          const attendanceRateChange = getAttendanceRateChange([
            thisWeek.totalAttendanceRate,
            lastWeek.totalAttendanceRate,
          ]);

          return (
            <StatsCard
              isLoading={attendanceLoading}
              variant="week"
              title="Average Attendance"
              value={
                thisWeek?.totalAttendanceRate === undefined
                  ? "No attendances"
                  : `${thisWeek?.totalAttendanceRate}%`
              }
              description="Last 7 days"
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
      {createInfoLoading || attendanceLoading ? (
        <div className="rounded-lg border bg-white shadow-sm dark:bg-gray-900">
          <div className="p-6">
            <ModalLoader color="#155dfc" extraClasses="mt-9 mb-9.5" />
          </div>
        </div>
      ) : (
        (() => {
          const [thisWeek, lastWeek] = attendanceData || [];

          const { totalParticipantsCount } = thisWeek;
          const { totalAttendancesCount } = thisWeek;
          console.log(thisWeek, lastWeek);

          const { totalAttendancesCount: lastAttendancesCount } = lastWeek;
          return (
            <StatsCard
              isLoading={createInfoLoading}
              title="Absent this week"
              variant="week"
              value={
                (totalParticipantsCount - totalAttendancesCount).toString() ===
                "NaN"
                  ? "0"
                  : (totalParticipantsCount - totalAttendancesCount).toString()
              }
              description={`Out of ${totalParticipantsCount} students`}
              icon={<Users className="h-4 w-4 text-muted-foreground" />}
              trend={
                (totalAttendancesCount - lastAttendancesCount).toString() ===
                "NaN"
                  ? "0"
                  : (totalAttendancesCount - lastAttendancesCount).toString()
              }
              trendDirection={
                totalAttendancesCount - lastAttendancesCount > 0
                  ? "up"
                  : totalAttendancesCount - lastAttendancesCount < 0
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
