import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../getBackendUrl";
import {GetStudentInterface} from "@/api/dashboard/students/studentInterface.ts";

const useGetStudents = () => {
    const getStudents = async (): Promise<GetStudentInterface[]> => {
        const response = await axios.get(`${API_URL}/api/users/students`);
        return response.data;
    };

    return useQuery<GetStudentInterface[]>({
        queryKey: ["students"],
        queryFn: getStudents,
    });
};

export default useGetStudents;
