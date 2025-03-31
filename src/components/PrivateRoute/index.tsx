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
    return (
      <Navigate
        to="/auth/login"
        replace={true}
        state={{ return_url: location.pathname }}
      />
    );
  }

  return <div>{children}</div>;
}
