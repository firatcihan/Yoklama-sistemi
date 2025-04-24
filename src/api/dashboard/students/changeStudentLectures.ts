import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../../getBackendUrl";
import toast from "react-hot-toast";
import { ChangeStudentLecturesInterface } from "@/api/dashboard/students/studentInterface.ts";
import useModalStore from "@/stores/modal";

const useChangeStudentLectures = () => {
  const { closeModal } = useModalStore();

  const queryClient = useQueryClient();
  const changeStudentLectures = async (
    data: ChangeStudentLecturesInterface,
  ) => {
    const response = await axios.post(
      `${API_URL}/api/users/students/assign`,
      data,
    );
    return response.data;
  };

  return useMutation({
    mutationFn: changeStudentLectures,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      toast.success("Öğrenci dersleri başarıyla güncellendi.");
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

export default useChangeStudentLectures;
