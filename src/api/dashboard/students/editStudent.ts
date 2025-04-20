import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../../getBackendUrl";
import toast from "react-hot-toast";
import useModalStore from "@/stores/modal";
import { EditStudentInterface } from "@/api/dashboard/students/studentInterface.ts";

const useEditStudent = () => {
  const { closeModal } = useModalStore();
  const queryClient = useQueryClient();
  const editStudent = async (studentData: EditStudentInterface) => {
    const response = await axios.patch(
      `${API_URL}/api/users`,
      studentData,
    );
    return response.data;
  };

  return useMutation({
    mutationFn: editStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast.success("Öğrenci başarıyla güncellendi.");
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

export default useEditStudent;
