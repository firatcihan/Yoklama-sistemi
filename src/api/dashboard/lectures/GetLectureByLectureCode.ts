import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../getBackendUrl";
import { RawLecture } from "@/api/dashboard/lectures/lectureInterface.ts";

const useGetLectureByLectureCode = ({
  lectureCode,
}: {
  lectureCode: string;
}) => {
  const getLectureByLectureCode = async (): Promise<RawLecture> => {
    const response = await axios.get(
      `${API_URL}/api/lectures/lectureCode/${lectureCode}`,
    );
    return response.data;
  };

  return useQuery<RawLecture>({
    queryKey: ["lectures", lectureCode],
    queryFn: getLectureByLectureCode,
  });
};

export default useGetLectureByLectureCode;
