import { lazy } from "react";

// project imports
import MainLayout from "layout/MainLayout";
import Loadable from "ui-component/Loadable";

// dashboard routing
const Dashboard = Loadable(lazy(() => import("views/dashboard")));
const Audience = Loadable(lazy(() => import("views/audience")));
const AITools = Loadable(lazy(() => import("views/aitools/aitools")));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/audience",
      element: <Audience />,
    },
    {
      path: "/aitools",
      element: <AITools />,
    },
  ],
};

export default MainRoutes;
