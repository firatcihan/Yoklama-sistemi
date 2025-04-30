import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../getBackendUrl";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useModalStore from "@/stores/modal";
import { useJoinAttendanceInterface } from "@/api/dashboard/attendance/attendanceInterface.ts";

interface selectedStudentsInterface {
  name: string;
  studentNumber: string;
}

const useManageAttendanceParticipants = ({
  sessionId,
  lectureCode,
}: useJoinAttendanceInterface) => {
  const { closeModal } = useModalStore();
  const queryClient = useQueryClient();
  const manageAttendanceParticipants = async ({
    studentsToChange,
  }: {
    studentsToChange: selectedStudentsInterface[];
  }) => {
    if (!sessionId || !lectureCode) {
      throw new Error("sessionId and lectureCode is required");
    }
    const response = await axios.post(
      `${API_URL}/api/attendance/session/manage/${lectureCode}/${sessionId}`,
      {
        studentsInAttendance: studentsToChange,
      },
    );
    return response.data;
  };

  return useMutation({
    mutationFn: manageAttendanceParticipants,
    onSuccess: () => {
      toast.success("Yoklama başarıyla güncellendi.");
      queryClient.invalidateQueries({
        queryKey: ["attendances", lectureCode, sessionId],
      });
      queryClient.invalidateQueries({
        queryKey: ["attendances", lectureCode, "last2session", sessionId],
      });
      closeModal();
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        const data = error.response.data;
        const message =
          typeof data === "string"
            ? data
            : (data?.message ?? "An unexpected error occurred");
        toast.error(message);
      } else {
        toast.error("An unexpected error occurred");
      }
    },
  });
};

export default useManageAttendanceParticipants;
