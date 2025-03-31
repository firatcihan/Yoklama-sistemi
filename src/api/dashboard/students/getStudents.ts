import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../getBackendUrl";

interface Student {
    id: string;
    studentNumber: string;
    name: string;
    email: string;
    role: string;
    createTime: string;
    lastUpdateTime: string;
    assignedClasses: string[];
}

const useGetStudents = () => {
    const getStudents = async (): Promise<Student[]> => {
        const response = await axios.get(`${API_URL}/api/users/students`);
        return response.data;
    };

    return useQuery<Student[]>({
        queryKey: ["students"],
        queryFn: getStudents,
    });
};

export default useGetStudents;
