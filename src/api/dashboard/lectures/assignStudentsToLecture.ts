import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../../getBackendUrl";
import toast from "react-hot-toast";
import useModalStore from "@/stores/modal";
import { AssignStudentsToLectureInterface } from "@/api/dashboard/lectures/lectureInterface.ts";

const useAssignStudentsToLecture = () => {
  const { closeModal } = useModalStore();
  const queryClient = useQueryClient();
  const assignStudents = async (
    studentsToAssignData: AssignStudentsToLectureInterface,
  ) => {
    const response = await axios.post(
      `${API_URL}/api/lectures/assign/student`,
      studentsToAssignData,
    );
    return response.data;
  };

  return useMutation({
    mutationFn: assignStudents,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lectures"] });
      toast.success("Derse kayıt edilmiş öğrenciler başarıyla güncellendi.");
      closeModal();
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

export default useAssignStudentsToLecture;
