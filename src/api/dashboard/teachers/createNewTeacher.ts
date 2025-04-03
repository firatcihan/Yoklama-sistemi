import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../../getBackendUrl";
import toast from "react-hot-toast";
import useModalStore from "@/stores/modal";

interface Teacher {
  name: string;
  email: string;
  password: string;
  classes: string[];
}

const useCreateTeacher = () => {
  const { closeModal } = useModalStore();
  const queryClient = useQueryClient();
  const createTeacher = async (teacherData: Teacher) => {
    const response = await axios.post(
      `${API_URL}/api/users/teachers`,
      teacherData,
    );
    return response.data;
  };

  return useMutation({
    mutationFn: createTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      toast.success("Öğretmen başarıyla oluşturuldu.");
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

export default useCreateTeacher;
