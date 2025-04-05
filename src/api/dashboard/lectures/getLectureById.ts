import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../getBackendUrl";

export interface RawLecture {
  id: string;
  name: string;
  lectureCode: string;
  participants: {
    studentNumber: string;
    name: string;
  }[];
  instructor: {
    id: string;
    name: string;
    email: string;
  };
  participantsCount: string;
  createTime: string;
  lastUpdateTime: string;
}

const useGetLectureById = ({ id }: { id: string }) => {
  const getLectureById = async (): Promise<RawLecture> => {
    const response = await axios.get(`${API_URL}/api/lectures/${id}`);
    return response.data;
  };

  return useQuery<RawLecture>({
    queryKey: ["lectures", "id"],
    queryFn: getLectureById,
  });
};

export default useGetLectureById;
