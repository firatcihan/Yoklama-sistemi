import { AttendanceInterface } from "@/api/dashboard/attendance/attendanceInterface.ts";
import axios from "axios";
import { API_URL } from "@/api/getBackendUrl.ts";
import { useQuery } from "@tanstack/react-query";

export const useGetAttendanceSessionById = ({
  id,
  lectureCode,
}: {
  id: string;
  lectureCode: string;
}) => {
  const getAttendanceSessionById = async (): Promise<AttendanceInterface> => {
    const response = await axios.get(
      `${API_URL}/api/attendance/session/${lectureCode}/${id}`,
    );
    return response.data as AttendanceInterface;
  };

  return useQuery<AttendanceInterface>({
    queryKey: ["attendances", lectureCode, id],
    queryFn: getAttendanceSessionById,
  });
};
