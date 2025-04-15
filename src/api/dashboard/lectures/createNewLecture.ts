import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../../getBackendUrl";
import toast from "react-hot-toast";
import useModalStore from "@/stores/modal";
import { CreateLectureInterface } from "@/api/dashboard/lectures/lectureInterface.ts";

const useCreateLecture = () => {
  const { closeModal } = useModalStore();
  const queryClient = useQueryClient();
  const createLecture = async (lectureData: CreateLectureInterface) => {
    const response = await axios.post(`${API_URL}/api/lectures`, lectureData);
    return response.data;
  };

  return useMutation({
    mutationFn: createLecture,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lectures"] });
      toast.success("Ders başarıyla oluşturuldu.");
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

export default useCreateLecture;
