import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../getBackendUrl";
import useAuthStore from "../../../stores/auth";

interface Lecture {
  id: string;
  name: string;
  instructor: string;
}

const useGetClassesByUserId = () => {
  const { user } = useAuthStore();
  const getClasses = async (): Promise<Lecture[]> => {
    const response = await axios.get(`${API_URL}/api/lectures/${user?.id}`);
    return response.data;
  };

  return useQuery<Lecture[]>({
    queryKey: ["classes"],
    queryFn: getClasses,
  });
};

export default useGetClassesByUserId;
