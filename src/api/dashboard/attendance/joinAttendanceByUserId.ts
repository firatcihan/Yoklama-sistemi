import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../getBackendUrl";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useJoinAttendanceInterface } from "@/api/dashboard/attendance/attendanceInterface.ts";

const useJoinAttendanceByUserId = ({
  sessionId,
  lectureCode,
}: useJoinAttendanceInterface) => {
  const queryClient = useQueryClient();
  const joinAttendanceByUserId = async ({
    studentId,
  }: {
    studentId: string;
  }) => {
    if (!studentId || !sessionId || !lectureCode) {
      throw new Error("studentId, sessionId and lectureCode is required");
    }
    const response = await axios.post(
      `${API_URL}/api/attendance/session/${lectureCode}/${sessionId}`,
      {
        studentId: studentId,
      },
    );
    return response.data;
  };

  return useMutation({
    mutationFn: joinAttendanceByUserId,
    onSuccess: () => {
      toast.success("Yoklama başarıyla katıldınız.");
      queryClient.invalidateQueries({
        queryKey: ["attendances", lectureCode, sessionId],
      });
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

export default useJoinAttendanceByUserId;
