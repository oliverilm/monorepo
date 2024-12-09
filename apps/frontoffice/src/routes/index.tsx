import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "../app/app";
import { LoginPage } from "../app/pages/login";
import { Register } from "../app/pages/register";
import { Home } from "../app/pages/home";

export const RouteEnum = {
    Index: "/",
    Login: "/login",
    Register: "/register",
    Dashboard: "/dashboard",
    Profile: "/profile",
    Settings: "/settings",
    NotFound: "*"
}

const router = createBrowserRouter([
    {
        path: RouteEnum.Index,
        element: <App />,
        children: [
            {
                path: RouteEnum.Index,
                element: <Home />
            },
            {
                path: RouteEnum.Login,
                element: <LoginPage />
            },
            {
                path: RouteEnum.Register,
                element: <Register />
            },
            {
                path: RouteEnum.Dashboard,
                element: <div>Dashboard</div>
            },
            {
                path: RouteEnum.Profile,
                element: <div>Profile</div>
            },
            {
                path: RouteEnum.Settings,
                element: <div>Settings</div>
            },
            {
                path: RouteEnum.NotFound,
                element: <div>Not Found</div>
            }
        ]
    },
]);

export function AppRouter() {
    return <RouterProvider router={router} />;
}
