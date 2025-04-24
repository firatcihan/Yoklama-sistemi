import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../../stores/auth";

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
    return (
      <Navigate
        to="/dashboard"
        replace={true}
        state={{ return_url: location.pathname }}
      />
    );
  }

  return <div>{children}</div>;
}
