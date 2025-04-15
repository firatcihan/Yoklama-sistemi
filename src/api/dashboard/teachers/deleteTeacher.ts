import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../../getBackendUrl";
import toast from "react-hot-toast";
import useModalStore from "@/stores/modal";
import {DeleteTeacherInterface} from "@/api/dashboard/teachers/teacherInterface.ts";

const useDeleteTeacher = () => {
  const { closeModal } = useModalStore();
  const queryClient = useQueryClient();
  const deleteTeacher = async (teacherId: DeleteTeacherInterface) => {
    const response = await axios.delete(`${API_URL}/api/users`, {
      data: teacherId,
    });
    return response.data;
  };

  return useMutation({
    mutationFn: deleteTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      toast.success("Öğretmen başarıyla silindi.");
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

export default useDeleteTeacher;
