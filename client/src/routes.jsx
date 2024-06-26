import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/UserProfile.jsx";
import App from "./App.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import MissionActivitiesPage from "./pages/MissionActivitiesPage.jsx";
// import FunFact from "./pages/FunFact.jsx";
import Settings from "./pages/Settings.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/settings",
        element: <Settings />
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/sign-up",
        element: <SignUpPage />
      },
      {
        path: "/mission-activities/:missionId",
        element: <MissionActivitiesPage />
      },
      // {
      //   path: "/funFact",
      //   element: <FunFact />
      // }
    ],
  },
]);
export default router;
