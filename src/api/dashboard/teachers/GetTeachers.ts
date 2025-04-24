import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../getBackendUrl";
import { TeacherInterface } from "@/api/dashboard/teachers/teacherInterface.ts";

const useGetTeachers = () => {
  const getTeachers = async (): Promise<TeacherInterface[]> => {
    const response = await axios.get(`${API_URL}/api/users/teachers`);
    return response.data;
  };

  return useQuery<TeacherInterface[]>({
    queryKey: ["teachers"],
    queryFn: getTeachers,
  });
};

export default useGetTeachers;
