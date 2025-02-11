import { Route, Routes } from "react-router";

import AuthLayout from "./layouts/auth";
import DashboardPage from "./pages/authenticated/dashboardPage";

import WantedPersonsCategoriesPage from "./pages/authenticated/wantedPersonsCategoriesPage";
import WantedPersonDetailsPage from "./pages/authenticated/wantedPersonDetailsPage";
import ProfilePage from "./pages/authenticated/profilePage";
import SignUpPage from "./pages/public/signUpPage";
import SignInPage from "./pages/public/signInPage";
import PublicLayout from "./layouts/public";
import UserActivity from "./pages/authenticated/userActivity";
import UserWantedList from "./pages/authenticated/userWantedList";

export default function MainRouter() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="sign-in" element={<SignInPage />} />
        <Route path="sign-up" element={<SignUpPage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route index element={<DashboardPage />} />
        <Route
          path="/wanted-categories"
          element={<WantedPersonsCategoriesPage />}
        />
        <Route path="/my-list" element={<UserWantedList />} />
        <Route path="/recent-activity" element={<UserActivity />} />
        <Route
          path="wanted-persons/:id"
          element={<WantedPersonDetailsPage />}
        />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}
