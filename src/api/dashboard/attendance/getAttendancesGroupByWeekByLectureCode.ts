import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../getBackendUrl";
import { groupByWeekReturnInterface } from "@/api/dashboard/attendance/attendanceInterface.ts";

const useGetAttendancesGroupByWeekByLectureCode = ({
  lectureCode,
}: {
  lectureCode: string;
}) => {
  const getAttendancesGroupByWeekByLectureCode = async (): Promise<
    groupByWeekReturnInterface[]
  > => {
    const response = await axios.get(
      `${API_URL}/api/attendance/info/groupbyweek/${lectureCode}`,
    );
    return response.data;
  };

  return useQuery<groupByWeekReturnInterface[]>({
    queryKey: ["attendances", "info", "groupbyweek", lectureCode],
    queryFn: getAttendancesGroupByWeekByLectureCode,
  });
};

export default useGetAttendancesGroupByWeekByLectureCode;
