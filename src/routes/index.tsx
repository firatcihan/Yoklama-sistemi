import PrivateRoute from "../components/PrivateRoute";
import Login from "../pages/auth/login";
import AuthLayout from "../pages/auth";
import AdminRoute from "../components/AdminRoute";
import MainLayout from "../components/MainLayout";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Home from "../pages/Home";
import Dashboard from "../pages/dashboard";
import ManageLectures from "../pages/dashboard/lectures";
import ManageStudents from "@/pages/dashboard/students";
import ManageTeachers from "@/pages/dashboard/teachers";
import TeacherRoute from "@/components/TeacherRoute";

const baseRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    auth: true,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    teacher: true,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "lectures/:id",
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
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
];

interface Route {
  path: string;
  element: JSX.Element;
  auth?: boolean;
  children?: Route[];
  admin?: boolean;
  teacher?: boolean;
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
    if (route?.children) {
      route.children = authCheck(route.children);
    }
    return route;
  });

// @ts-ignore
const routes = authCheck(baseRoutes);
export default routes;
