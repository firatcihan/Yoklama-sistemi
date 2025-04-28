import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuthStore from "@/stores/auth";
import { API_URL } from "../../getBackendUrl";
import { Lecture } from "@/components/Table/LectureColumns.tsx";

const useGetAllClasses = () => {
  const { user } = useAuthStore();
  const getClasses = async (): Promise<Lecture[]> => {
    if (!user) return [];
    const response = await axios.get(
      user.role === "admin"
        ? `${API_URL}/api/lectures`
        : `${API_URL}/api/lectures/assigned/${user.id}`,
    );
    return response.data;
  };

  return useQuery<Lecture[]>({
    queryKey: ["lectures"],
    queryFn: getClasses,
  });
};

export default useGetAllClasses;
