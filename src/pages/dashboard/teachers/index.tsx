import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../stores/auth";
import useGetTeachers from "@/api/dashboard/teachers/GetTeachers.ts";

export default function ManageTeachers() {
    const { data, isLoading, isError } = useGetTeachers();
    const { user } = useAuthStore();
    const navigate = useNavigate();

    if (!user) {
        navigate("/auth/login");
    }

    if (isLoading) {
        return <div>loading...</div>;
    }

    if (isError) {
        return <div>error...</div>;
    }

    if(!data) return <div>data not found</div>

    return (
        <div className="flex">
            <div>{data[0].id}</div>
            <div>{data[0].name}</div>
            <div className="w-10">{data[0].role}</div>
        </div>
    );
}
