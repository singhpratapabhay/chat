import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

// layouts
import DashboardLayout from "../layouts/dashboard";
import MainLayout from "../layouts/main";
// config
import { DEFAULT_PATH } from "../config";
import LoadingScreen from "../components/LoadingScreen";


const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "auth",
      element: <MainLayout />,
      children: [

        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forgot-password", element: <ResetPassword /> },
        { path: "new-Password", element: <NewPassowrd /> },
        { path: "verify-Password", element: <VerifyPage /> },
      ]
    },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        { path: "app", element: <GeneralApp /> },
        { path: "settings", element: <Settings /> },
        { path: "group", element: <GroupPage /> },
        { path: "call", element: <CallPage /> },
        { path: "profile", element: <ProfilePage /> },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

const GeneralApp = Loadable(
  lazy(() => import("../pages/dashboard/GeneralApp")),
);
const Settings = Loadable(
  lazy(() => import("../pages/dashboard/Settings")),
);
const Login = Loadable(
  lazy(() => import("../pages/auth/Login")),
);
const Register = Loadable(
  lazy(() => import("../pages/auth/Register")),
);
const ResetPassword = Loadable(
  lazy(() => import("../pages/auth/ResetPassword")),
);
const VerifyPage = Loadable(
  lazy(() => import("../pages/auth/Verify")),
);
const NewPassowrd = Loadable(
  lazy(() => import("../pages/auth/NewPassowrd")),
);
const GroupPage = Loadable(
  lazy(() => import("../pages/dashboard/Group")),
);
const CallPage = Loadable(
  lazy(() => import("../pages/dashboard/Call")),
);
const ProfilePage = Loadable(
  lazy(() => import("../pages/dashboard/Profile")),
);
const Page404 = Loadable(lazy(() => import("../pages/Page404")));
