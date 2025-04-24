import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../../stores/auth";
import toast from "react-hot-toast";

export default function StudentRoute({
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
  if (user.role !== "student") {
    toast.error("this page is only for students.");
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
