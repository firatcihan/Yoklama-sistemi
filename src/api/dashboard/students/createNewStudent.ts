import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../../getBackendUrl";
import toast from "react-hot-toast";
import useModalStore from "@/stores/modal";
import { CreateStudentInterface } from "@/api/dashboard/students/studentInterface.ts";

const useCreateStudent = () => {
  const { closeModal } = useModalStore();
  const queryClient = useQueryClient();
  const createStudent = async (studentData: CreateStudentInterface) => {
    const response = await axios.post(
      `${API_URL}/api/users/students`,
      studentData,
    );
    return response.data;
  };

  return useMutation({
    mutationFn: createStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      queryClient.invalidateQueries({ queryKey: ["students", "info"] });
      toast.success("Öğrenci başarıyla oluşturuldu.");
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

export default useCreateStudent;
