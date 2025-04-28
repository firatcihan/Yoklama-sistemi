import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../../stores/auth";
import toast from "react-hot-toast";

export default function TeacherRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuthStore();
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to="/auth/login"
        replace={true}
        state={{ return_url: location.pathname }}
      />
    );
  }
  if (user.role !== "teacher" && user.role !== "admin") {
    toast.error("You are not authorized to access this page.");
    return (
      <Navigate
        to="/unauthorized"
        replace={true}
        state={{ return_url: location.pathname }}
      />
    );
  }

  return <div>{children}</div>;
}
