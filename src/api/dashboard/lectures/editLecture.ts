import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../../getBackendUrl";
import toast from "react-hot-toast";
import useModalStore from "@/stores/modal";
import { EditLectureInterface } from "@/api/dashboard/lectures/lectureInterface.ts";
const useEditLecture = () => {
  const { closeModal } = useModalStore();
  const queryClient = useQueryClient();
  const editLecture = async (lectureData: EditLectureInterface) => {
    const response = await axios.patch(
      `${API_URL}/api/lectures`,
      lectureData,
    );
    return response.data;
  };

  return useMutation({
    mutationFn: editLecture,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lectures"] });
      toast.success("Ders başarıyla güncellendi.");
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

export default useEditLecture;
