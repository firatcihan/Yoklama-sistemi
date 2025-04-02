import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../getBackendUrl";

interface Lecture {
    id: string;
    name: string;
    instructor: string;
}

const useGetAllClasses = () => {
    const getClasses = async (): Promise<Lecture[]> => {
        const response = await axios.get(`${API_URL}/api/lectures`);
        return response.data;
    };

    return useQuery<Lecture[]>({
        queryKey: ["classes"],
        queryFn: getClasses,
    });
};

export default useGetAllClasses;
