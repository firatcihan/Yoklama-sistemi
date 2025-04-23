import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../getBackendUrl";
import { RawLecture } from "@/api/dashboard/lectures/lectureInterface.ts";

const useGetTeacherAssignedClasses = ({ id }: { id: string }) => {
  const getTeacherAssignedClasses = async (): Promise<RawLecture[]> => {
    const response = await axios.get(
      `${API_URL}/api/lectures/userClasses/${id}`,
    );
    return response.data;
  };

  return useQuery<RawLecture[]>({
    queryKey: ["lectures", id],
    queryFn: getTeacherAssignedClasses,
  });
};

export default useGetTeacherAssignedClasses;
