import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../../getBackendUrl";
import toast from "react-hot-toast";
import useModalStore from "@/stores/modal";
import { DeleteLectureInterface } from "@/api/dashboard/lectures/lectureInterface.ts";

const useDeleteLecture = () => {
  const { closeModal } = useModalStore();
  const queryClient = useQueryClient();
  const deleteLecture = async (lectureId: DeleteLectureInterface) => {
    const response = await axios.delete(`${API_URL}/api/lectures`, {
      data: lectureId,
    });
    return response.data;
  };

  return useMutation({
    mutationFn: deleteLecture,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lectures"] });
      toast.success("Ders başarıyla silindi.");
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

export default useDeleteLecture;
