import { FC } from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { useCookies } from "react-cookie";

import NotFound from "../pages/NotFound";
import Home from "../pages";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Profile from "../pages/Profile";
import MyEvent from "../pages/MyEvent";
import AddEvent from "../pages/AddEvent";
import DetailEvent from "../pages/DetailEvent";
import EditEvent from "../pages/EditEvent";
import DetailTransaksi from "../pages/DetailTransaksi";
import Invoice from "../pages/Invoice";

const Router: FC = () => {
  const [cookie] = useCookies(["token", "uname"]);
  const checkToken = cookie.token;

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: checkToken ? <Navigate to="/" /> : <Login />,
    },
    {
      path: "/register",
      element: checkToken ? <Navigate to="/" /> : <Register />,
    },
    {
      path: "/u/:username/",
      element: <MyEvent />,
    },
    {
      path: "/u/:username/profile",
      element: <Profile />,
    },
    {
      path: "/u/:username/add_event",
      element: <AddEvent />,
    },
    {
      path: "/u/:username/:event_id/edit",
      element: <EditEvent />,
    },
    {
      path: "/event/:event_id",
      element: <DetailEvent />,
    },
    {
      path: "/event/:event_id/payment",
      element: <DetailTransaksi />,
    },
    {
      path: "/event/:event_id/payment/invoice",
      element: <Invoice />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
