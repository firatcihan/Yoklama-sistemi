import PrivateRoute from "../components/PrivateRoute";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import AuthLayout from "../pages/auth";
import AdminRoute from "../components/AdminRoute";
import MainLayout from "../pages/MainLayout";
import Home from "../pages/Home";

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
        path: "/admin",
        element: <AuthLayout />,
        children: [
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
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
            {
                path: "register",
                element: <Register />,
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
}

const authCheck = (routes: Route[]): Route[] =>
    routes.map((route) => {
        if (route?.auth) {
            route.element = <PrivateRoute>{route.element}</PrivateRoute>;
        }
        if (route?.admin) {
            route.element = <AdminRoute>{route.element}</AdminRoute>;
        }
        if (route?.children) {
            route.children = authCheck(route.children);
        }
        return route;
    });

const routes = authCheck(baseRoutes);
export default routes;
