import React from "react";

//Layouts
import DashboardLayout from "./layouts/Dashboard";
import LandingLayout from "./layouts/Landing";
import DocLayout from "./layouts/Doc";
import AuthLayout from "./layouts/Auth";

//Auth Pages
import Page401 from "./pages/auth/Page401";
import SignIn from "./pages/auth/SignIn";

//Guards
import AuthGuard from "./components/guards/AuthGuard";
import AdminGuard from "./components/guards/AdminGuard";
import GuestGuard from "./components/guards/GuestGuard";

import HomePage from "./pages/HomePage";
import Page404 from "./pages/Page404";

//admin pages
import Dashboard from "./pages/admins/dashboard/Dashboard";
import Results from "./pages/admins/survey/Results";

//client pages
import Survey from "./pages/client/survey/Survey";
import Summary from "./pages/client/survey/Summary";

const routes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/form",
    element: <Survey />,
  },
  {
    path: "/summary",
    element: <Summary />,
  },
  {
    path: "/sign-in",
    element: (
      <AuthLayout>
        <SignIn />
      </AuthLayout>
    ),
  },
  {
    path: "/admin",
    element: <DashboardLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "survey",
        element: <Results />,
      },
    ],
  },
];

export default routes;
