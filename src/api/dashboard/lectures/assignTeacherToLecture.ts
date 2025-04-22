import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../../getBackendUrl";
import toast from "react-hot-toast";
import useModalStore from "@/stores/modal";
import { AssignTeacherToLectureInterface } from "@/api/dashboard/lectures/lectureInterface.ts";

const useAssignTeacherToLecture = () => {
  const { closeModal } = useModalStore();
  const queryClient = useQueryClient();
  const assignTeacher = async (
    teacherToAssignData: AssignTeacherToLectureInterface,
  ) => {
    const response = await axios.post(
      `${API_URL}/api/lectures/assign/teacher`,
      teacherToAssignData,
    );
    return response.data;
  };

  return useMutation({
    mutationFn: assignTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lectures"] });
      toast.success("Derse atanmış öğretmen başarıyla güncellendi.");
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

export default useAssignTeacherToLecture;
