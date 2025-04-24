import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../../stores/auth";

export default function AdminRoute({
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
  if (user.role !== "admin") {
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
