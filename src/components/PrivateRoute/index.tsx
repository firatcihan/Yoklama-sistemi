import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../../stores/auth";

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuthStore();
  const location = useLocation();

  if (!user) {
    const redirectTo = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/auth/login?redirectTo=${redirectTo}`} replace />;
  }

  return <div>{children}</div>;
}
