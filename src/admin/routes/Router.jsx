
import { createBrowserRouter } from "react-router-dom";
import Login from "@/admin/pages/auth/Login";
import Register from "@/admin/pages/auth/Register";
import Dashboard from "@/admin/pages/Dashboard";
import AdminLayout from "@/admin/layouts/AdminLayout";
import UsersPage from "@/app/users/page";

const Router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
    ],
  },
]);

export default Router;
