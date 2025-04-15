import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../getBackendUrl";
import {RawLecture} from "@/api/dashboard/lectures/lectureInterface.ts";

const useGetLectureById = ({ id }: { id: string }) => {
  const getLectureById = async (): Promise<RawLecture> => {
    const response = await axios.get(`${API_URL}/api/lectures/${id}`);
    return response.data;
  };

  return useQuery<RawLecture>({
    queryKey: ["lectures", id],
    queryFn: getLectureById,
  });
};

export default useGetLectureById;
