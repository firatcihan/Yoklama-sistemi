import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../../getBackendUrl";
import toast from "react-hot-toast";
import useModalStore from "@/stores/modal";
import { DeleteStudentInterface } from "@/api/dashboard/students/studentInterface.ts";

const useDeleteStudent = () => {
  const { closeModal } = useModalStore();
  const queryClient = useQueryClient();
  const deleteStudent = async (studentId: DeleteStudentInterface) => {
    const response = await axios.delete(`${API_URL}/api/users`, {
      data: studentId,
    });
    return response.data;
  };

  return useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast.success("Öğrenci başarıyla silindi.");
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

export default useDeleteStudent;
