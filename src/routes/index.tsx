import PrivateRoute from "../components/PrivateRoute";
import Login from "../pages/auth/login";
import AuthLayout from "../pages/auth";
import AdminRoute from "../components/AdminRoute";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Dashboard from "../pages/dashboard";
import ManageLectures from "../pages/dashboard/lectures";
import ManageStudents from "@/pages/dashboard/students";
import ManageTeachers from "@/pages/dashboard/teachers";
import TeacherRoute from "@/components/TeacherRoute";
import ShowQr from "@/pages/dashboard/attendance/showQr";
import AttendanceLayout from "@/pages/dashboard/attendance/attendanceLayout";
import JoinAttendance from "@/pages/dashboard/attendance/joinAttendance";
import { Navigate } from "react-router-dom";
import StudentRoute from "@/components/studentRoute";
import QrLayout from "@/pages/dashboard/components/qrLayout";

const baseRoutes = [
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    teacher: true,
    children: [
      {
        path: "",
        index: true,
        element: <Dashboard />,
      },
      {
        path: "lectures",
        element: <ManageLectures />,
      },
      {
        path: "students",
        element: <ManageStudents />,
      },
      {
        path: "teachers",
        admin: true,
        element: <ManageTeachers />,
      },
    ],
  },
  {
    path: "/attendance",
    element: <AttendanceLayout />,
    auth: true,
    children: [
      {
        path: ":lectureCode/:sessionId",
        element: <JoinAttendance />,
        student: true,
      },
    ],
  },
  {
    path: "/qr",
    element: <QrLayout />,
    children: [
      {
        path: ":lectureCode/:sessionId",
        element: <ShowQr />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/auth/login" replace />,
  },
];

interface Route {
  path: string;
  element: JSX.Element;
  auth?: boolean;
  children?: Route[];
  admin?: boolean;
  teacher?: boolean;
  student?: boolean;
}

const authCheck = (routes: Route[]): Route[] =>
  routes.map((route) => {
    if (route?.auth) {
      route.element = <PrivateRoute>{route.element}</PrivateRoute>;
    }
    if (route?.admin) {
      route.element = <AdminRoute>{route.element}</AdminRoute>;
    }
    if (route?.teacher) {
      route.element = <TeacherRoute>{route.element}</TeacherRoute>;
    }
    if (route?.student) {
      route.element = <StudentRoute>{route.element}</StudentRoute>;
    }
    if (route?.children) {
      route.children = authCheck(route.children);
    }
    return route;
  });

const routes = authCheck(baseRoutes);
export default routes;
