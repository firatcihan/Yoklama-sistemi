import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../../getBackendUrl";
import toast from "react-hot-toast";
import { ChangeTeacherLecturesInterface } from "@/api/dashboard/teachers/teacherInterface.ts";
import useModalStore from "@/stores/modal";

const useChangeTeacherLectures = () => {
  const { closeModal } = useModalStore();

  const queryClient = useQueryClient();
  const changeTeacherLectures = async (
    data: ChangeTeacherLecturesInterface,
  ) => {
    const response = await axios.post(
      `${API_URL}/api/users/teachers/assign`,
      data,
    );
    return response.data;
  };

  return useMutation({
    mutationFn: changeTeacherLectures,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      toast.success("Öğretmen dersleri başarıyla güncellendi.");
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

export default useChangeTeacherLectures;
