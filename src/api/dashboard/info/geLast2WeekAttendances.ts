import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../getBackendUrl";
import { AttendanceData } from "@/api/dashboard/info/infoInterfaces.ts";

const useGetLast2WeeksAttendances = ({ teacherId }: { teacherId: string }) => {
  const getLast2WeeksAttendance = async (): Promise<AttendanceData[]> => {
    const response = await axios.get(
      `${API_URL}/api/attendance/teacher/info/${teacherId}`,
    );
    return response.data;
  };

  return useQuery<AttendanceData[]>({
    queryKey: ["attendances", "teacher", "info", teacherId],
    queryFn: getLast2WeeksAttendance,
  });
};

export default useGetLast2WeeksAttendances;
