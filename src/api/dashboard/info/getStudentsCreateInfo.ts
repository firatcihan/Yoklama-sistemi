import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../getBackendUrl.ts";
import { StudentCreateInfo } from "@/api/dashboard/students/studentInterface.ts";

const useGetStudentsCreateInfo = () => {
  const getStudentsCreateInfo = async (): Promise<StudentCreateInfo> => {
    const response = await axios.get(`${API_URL}/api/users/info/students`);
    return response.data;
  };

  return useQuery<StudentCreateInfo>({
    queryKey: ["students", "info"],
    queryFn: getStudentsCreateInfo,
  });
};

export default useGetStudentsCreateInfo;
