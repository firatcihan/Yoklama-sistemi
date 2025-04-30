import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../getBackendUrl";
import toast from "react-hot-toast";
import useModalStore from "@/stores/modal";
import { CreateAttendance } from "@/api/dashboard/attendance/attendanceInterface.ts";
import { getUserLocation } from "@/utils/getUserLocation.ts";

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

    const location = await getUserLocation();

    const submitData = { ...attendanceData, location };

    console.log(submitData);

    const response = await axios.post(`${API_URL}/api/attendance`, submitData);
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
        const err = error.response.data as { message?: string };
        toast.error(err.message ?? "Bilinmeyen bir hata oluştu");
      } else {
        toast.error("An unexpected error occurred");
      }
    },
  });
};

export default useCreateAttendance;
