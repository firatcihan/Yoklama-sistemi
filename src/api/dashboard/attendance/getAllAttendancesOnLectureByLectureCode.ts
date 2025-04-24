import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../getBackendUrl";
import { AttendanceInterface } from "@/api/dashboard/attendance/attendanceInterface.ts";

const useGetAllAttendancesByLectureCode = ({
  lectureCode,
}: {
  lectureCode: string;
}) => {
  const getAllAttendancesByLectureCode = async (): Promise<
    AttendanceInterface[]
  > => {
    const response = await axios.get(
      `${API_URL}/api/attendance/lecture/${lectureCode}`,
    );
    return response.data;
  };

  return useQuery<AttendanceInterface[]>({
    queryKey: ["attendances", lectureCode],
    queryFn: getAllAttendancesByLectureCode,
  });
};

export default useGetAllAttendancesByLectureCode;
