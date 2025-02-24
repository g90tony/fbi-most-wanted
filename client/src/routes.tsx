import { Route, Routes } from "react-router";

import AuthLayout from "./layouts/auth";
import DashboardPage from "./pages/authenticated/dashboardPage";

import WantedPersonsCategoriesPage from "./pages/authenticated/wantedPersonsCategoriesPage";
import WantedPersonDetailsPage from "./pages/authenticated/wantedPersonDetailsPage";

import SignUpPage from "./pages/public/signUpPage";
import SignInPage from "./pages/public/signInPage";
import PublicLayout from "./layouts/public";

import UserWantedList from "./pages/authenticated/userWantedList";
import WantedPersonsCategoryListPage from "./pages/authenticated/wantedPersonsCategoryListPage";

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
        <Route
          path="/wanted-categories/:category"
          element={<WantedPersonsCategoryListPage />}
        />
        <Route path="/my-list" element={<UserWantedList />} />
        <Route
          path="wanted-persons/:id"
          element={<WantedPersonDetailsPage />}
        />
      </Route>
    </Routes>
  );
}
