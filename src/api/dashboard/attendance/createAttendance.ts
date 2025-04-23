import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../getBackendUrl";
import toast from "react-hot-toast";
import useModalStore from "@/stores/modal";
import { CreateAttendance } from "@/api/dashboard/attendance/attendanceInterface.ts";

interface createAttendancePromise {
  sessionId: string;
  qrDataUrl: string;
  sessionUrl: string;
  sessionQrUrl: string;
}

const useCreateAttendance = () => {
  const { closeModal } = useModalStore();
  const createAttendance = async (
    attendanceData: CreateAttendance,
  ): Promise<createAttendancePromise> => {
    if (!attendanceData) {
      throw new Error("Attendance data is required");
    }
    const response = await axios.post(
      `${API_URL}/api/attendance`,
      attendanceData,
    );
    return response.data;
  };

  return useMutation({
    mutationFn: createAttendance,
    onSuccess: (data) => {
      toast.success("Yoklama başarıyla oluşturuldu.");
      closeModal();
      window.open(data.sessionUrl, "_blank");
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

export default useCreateAttendance;
