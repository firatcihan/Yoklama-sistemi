import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../getBackendUrl";
import { GetStudentInterface } from "@/api/dashboard/students/studentInterface.ts";
import useAuthStore from "@/stores/auth";

const useGetStudents = () => {
  const { user } = useAuthStore();
  const getStudents = async (): Promise<GetStudentInterface[]> => {
    if (!user) return [];
    const response = await axios.get(
      user.role === "admin"
        ? `${API_URL}/api/users/students`
        : `${API_URL}/api/users/assigned/${user.id}`,
    );
    return response.data;
  };

  return useQuery<GetStudentInterface[]>({
    queryKey: ["students"],
    queryFn: getStudents,
  });
};

export default useGetStudents;
