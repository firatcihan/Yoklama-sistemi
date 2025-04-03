import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../../getBackendUrl";
import toast from "react-hot-toast";
import useModalStore from "@/stores/modal";

interface Lecture {
  name: string;
  lectureCode: string;
  participants?: string[];
  instructor?: string;
}

const useCreateLecture = () => {
  const { closeModal } = useModalStore();
  const queryClient = useQueryClient();
  const createLecture = async (lectureData: Lecture) => {
    const response = await axios.post(
      `${API_URL}/api/users/lectures`,
      lectureData,
    );
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
