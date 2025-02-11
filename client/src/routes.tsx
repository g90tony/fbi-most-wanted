import { Route, Routes } from "react-router";

import AuthLayout from "./layouts/auth";
import DashboardPage from "./pages/authenticated/dashboardPage";
import WantedPersonsListPage from "./pages/authenticated/wantedPersonsListPage";
import WantedPersonDetailsPage from "./pages/authenticated/wantedPersonDetailsPage";
import ProfilePage from "./pages/authenticated/profilePage";
import SignUpPage from "./pages/public/signUpPage";
import SignInPage from "./pages/public/signInPage";
import LandingPage from "./pages/public/landingPage";
import PublicLayout from "./layouts/public";

export default function MainRouter() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="sign-in" element={<SignInPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="login" element={<DashboardPage />} />
        <Route path="register" element={<WantedPersonsListPage />} />
        <Route path="register" element={<WantedPersonDetailsPage />} />
        <Route path="register" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}
