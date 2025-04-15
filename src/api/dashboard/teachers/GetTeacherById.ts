import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../getBackendUrl";
import {TeacherInterface} from "@/api/dashboard/teachers/teacherInterface.ts";

const useGetTeacherById = ({ id }: { id: string }) => {
    const getTeacherById = async (): Promise<TeacherInterface> => {
        const response = await axios.get(`${API_URL}/api/users/id/${id}`);
        return response.data;
    };

    return useQuery<TeacherInterface>({
        queryKey: ["teachers", id],
        queryFn: getTeacherById,
    });
};

export default useGetTeacherById;
