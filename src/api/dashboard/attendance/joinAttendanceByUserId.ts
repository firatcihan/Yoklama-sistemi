import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../getBackendUrl";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useJoinAttendanceInterface } from "@/api/dashboard/attendance/attendanceInterface.ts";
import { getUserLocation } from "@/utils/getUserLocation.ts";

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
    const { latitude, longitude } = await getUserLocation();
    const submitData = {
      studentId: studentId,
      location: { latitude, longitude },
    };

    const response = await axios.post(
      `${API_URL}/api/attendance/session/student/${lectureCode}/${sessionId}`,
      submitData,
    );
    return response.data;
  };

  return useMutation({
    mutationFn: joinAttendanceByUserId,
    onSuccess: () => {
      toast.success("Yoklama başarıyla katıldınız.");
      queryClient.invalidateQueries({
        queryKey: ["attendances", lectureCode],
      });
      queryClient.invalidateQueries({
        queryKey: ["attendances", "user", lectureCode],
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
