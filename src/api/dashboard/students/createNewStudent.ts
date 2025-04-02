import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../../getBackendUrl";
import toast from "react-hot-toast";
import useModalStore from "@/stores/modal";

interface Student {
  studentNumber: string;
  name: string;
  email: string;
  password: string;
  assignedClasses: string[];
}

const useCreateStudent = () => {
  const { closeModal } = useModalStore();
  const queryClient = useQueryClient();
  const createStudent = async (studentData: Student) => {
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
      toast.success("Öğrenci başarıyla oluşturuldu.");
      closeModal();
    },
    onError: (e) => {
      toast.error(e.response.data);
    },
  });
};

export default useCreateStudent;
