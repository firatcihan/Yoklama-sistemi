import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../getBackendUrl";
import { userAttendanceRecordsInterface } from "@/api/dashboard/attendance/attendanceInterface.ts";

const useGetUserAttendancesOnLecture = ({
  studentId,
  lectureCode,
}: {
  studentId: string;
  lectureCode: string;
}) => {
  const getUserAttendancesOnLecture =
    async (): Promise<userAttendanceRecordsInterface> => {
      const response = await axios.get(
        `${API_URL}/api/attendance/user/${lectureCode}/${studentId}`,
      );
      return response.data;
    };

  return useQuery<userAttendanceRecordsInterface>({
    queryKey: ["attendances", "user", lectureCode, studentId],
    queryFn: getUserAttendancesOnLecture,
  });
};

export default useGetUserAttendancesOnLecture;
