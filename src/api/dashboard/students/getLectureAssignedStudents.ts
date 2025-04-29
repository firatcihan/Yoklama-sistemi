import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../getBackendUrl";
import { GetStudentInterface } from "@/api/dashboard/students/studentInterface.ts";

const useGetLectureAssignedStudents = ({
  lectureCode,
}: {
  lectureCode: string;
}) => {
  const getLectureAssignedStudents = async (): Promise<
    GetStudentInterface[]
  > => {
    const response = await axios.get(
      `${API_URL}/api/users/students/assigned/${lectureCode}`,
    );
    return response.data;
  };

  return useQuery<GetStudentInterface[]>({
    queryKey: ["students", lectureCode],
    queryFn: getLectureAssignedStudents,
  });
};

export default useGetLectureAssignedStudents;
