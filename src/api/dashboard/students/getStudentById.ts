import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../getBackendUrl";
import { GetStudentInterface } from "@/api/dashboard/students/studentInterface.ts";

const useGetStudentById = ({ id }: { id: string }) => {
  const getStudentById = async (): Promise<GetStudentInterface> => {
    const response = await axios.get(`${API_URL}/api/users/id/${id}`);
    return response.data;
  };

  return useQuery<GetStudentInterface>({
    queryKey: ["students", id],
    queryFn: getStudentById,
  });
};

export default useGetStudentById;
