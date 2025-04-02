import { useParams, useNavigate } from "react-router-dom";
import useGetClassesByUserId from "@/api/dashboard/lectures/getClassesByUserId.ts";
import useAuthStore from "../../../stores/auth";

export default function ManageLectures() {
  const { data, isLoading, isError } = useGetClassesByUserId();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { id } = useParams<{ id: string }>();
  if (!user) {
    navigate("/auth/login");
  }
  if (user?.id !== id) {
    navigate("/dashboard");
  }

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (isError) {
    return <div>error...</div>;
  }

  if(data?.length === 0) return <div>user not assaigned to a class</div>

  return (
    <div className="flex">
      <div>{data[0].id}</div>
      <div>{data[0].name}</div>
      <div className="w-10">{data[0].instructor}</div>
    </div>
  );
}
