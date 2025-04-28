import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../getBackendUrl.ts";
import { StudentCreateInfo } from "@/api/dashboard/students/studentInterface.ts";

const useGetTeachersCreateInfo = () => {
  const getTeachersCreateInfo = async (): Promise<StudentCreateInfo> => {
    const response = await axios.get(`${API_URL}/api/users/info/teachers`);
    return response.data;
  };

  return useQuery<StudentCreateInfo>({
    queryKey: ["teachers", "info"],
    queryFn: getTeachersCreateInfo,
  });
};

export default useGetTeachersCreateInfo;
