import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../getBackendUrl.ts";
import { StudentCreateInfo } from "@/api/dashboard/students/studentInterface.ts";

const useGetLecturesCreateInfo = () => {
    const getLecturesCreateInfo = async (): Promise<StudentCreateInfo> => {
        const response = await axios.get(`${API_URL}/api/lectures/info/lectures`);
        return response.data;
    };

    return useQuery<StudentCreateInfo>({
        queryKey: ["lectures", "info"],
        queryFn: getLecturesCreateInfo,
    });
};

export default useGetLecturesCreateInfo;
