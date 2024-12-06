import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "../app/app";

const RouteEnum = {
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
                element: <div>Index</div>
            },
            {
                path: RouteEnum.Login,
                element: <div>Login</div>
            },
            {
                path: RouteEnum.Register,
                element: <div>Register</div>
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

/*
git remote add origin https://github.com/oliverilm/monorepo.git
git branch -M main
git push -u origin main
*/
