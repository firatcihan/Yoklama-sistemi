import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../../getBackendUrl";
import toast from "react-hot-toast";
import { AssignStudentToLectureInterface } from "@/api/dashboard/students/studentInterface.ts";

const useUnssignUserFromLecture = () => {
  const queryClient = useQueryClient();
  const unassignStudent = async (data: AssignStudentToLectureInterface) => {
    const response = await axios.delete(
      `${API_URL}/api/users/students/assign`,
      {
        data,
      },
    );
    return response.data;
  };

  return useMutation({
    mutationFn: unassignStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students", "lectures"] });
      toast.success("Öğrenci başarıyla dersen silindi.");
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data);
      } else {
        toast.error("An unexpected error occurred");
      }
    },
  });
};

export default useUnssignUserFromLecture;
