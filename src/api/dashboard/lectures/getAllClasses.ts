import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../getBackendUrl";
import {Lecture} from "@/components/Table/LectureColumns.tsx";

const useGetAllClasses = () => {
    const getClasses = async (): Promise<Lecture[]> => {
        const response = await axios.get(`${API_URL}/api/lectures`);
        return response.data;
    };

    return useQuery<Lecture[]>({
        queryKey: ["lectures"],
        queryFn: getClasses,
    });
};

export default useGetAllClasses;
