import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../../getBackendUrl";
import toast from "react-hot-toast";
import useModalStore from "@/stores/modal";
import { EditTeacherInterface } from "@/api/dashboard/teachers/teacherInterface.ts";

const useEditTeacher = () => {
  const { closeModal } = useModalStore();
  const queryClient = useQueryClient();
  const editTeacher = async (teacherData: EditTeacherInterface) => {
    const response = await axios.patch(
      `${API_URL}/api/users`,
      teacherData,
    );
    return response.data;
  };

  return useMutation({
    mutationFn: editTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      toast.success("Öğretmen başarıyla güncellendi.");
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

export default useEditTeacher;
