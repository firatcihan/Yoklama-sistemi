import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../getBackendUrl";
import { GetLast2lectureAttendanceResponse } from "@/api/dashboard/attendance/attendanceInterface.ts";

const useGetLast2LectureAttendance = ({
  lectureCode,
  sessionId,
}: {
  lectureCode: string;
  sessionId: string;
}) => {
  const getLast2LectureAttendance = async (): Promise<
    GetLast2lectureAttendanceResponse[]
  > => {
    const response = await axios.get(
      `${API_URL}/api/attendance/info/last2sessions/${lectureCode}/${sessionId}`,
    );
    return response.data;
  };

  return useQuery<GetLast2lectureAttendanceResponse[]>({
    queryKey: ["attendances", lectureCode, "last2session", sessionId],
    queryFn: getLast2LectureAttendance,
  });
};

export default useGetLast2LectureAttendance;
