import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loader from "../components/Loader";
import {
  favoriteListMediaTypes,
  ratedListMediaTypes,
  watchListMediaTypes,
} from "../constants/constants";
import AuthenticationPage from "../pages/AuthenticationPage";
import UserPreferences from "../pages/UserPreferences";
import WelcomePage from "../pages/WelcomePage";
import ProtectedRoute from "./ProtectedRoute";
const HomePage = lazy(() => import("../pages/HomePage"));
const ErrorPage = lazy(() => import("../pages/ErrorPage"));
const MoreInfoAboutMoviePage = lazy(() =>
  import("../pages/MoreInfoAboutMoviePage")
);
const ExplorePage = lazy(() => import("../pages/ExplorePage"));
const ManageAccountsPage = lazy(() => import("../pages/ManageAccountsPage"));

export const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/home",
        element: (
          <Suspense fallback={<Loader />}>
            <HomePage />
          </Suspense>
        ),
        errorElement: <ErrorPage />,
      },
      {
        path: "/movies",
        element: (
          <Suspense fallback={<Loader />}>
            <HomePage mediaType="movie" />
          </Suspense>
        ),
      },
      {
        path: "/tv",
        element: (
          <Suspense fallback={<Loader />}>
            <HomePage mediaType="tv" />
          </Suspense>
        ),
      },
      {
        path: "/movie/moreInfo",
        element: (
          <Suspense fallback={<Loader />}>
            <MoreInfoAboutMoviePage mediaType="movie" />
          </Suspense>
        ),
      },
      {
        path: "/tv/moreInfo",
        element: (
          <Suspense fallback={<Loader />}>
            <MoreInfoAboutMoviePage mediaType="tv" />
          </Suspense>
        ),
      },
      {
        path: "/explore",
        element: (
          <Suspense fallback={<Loader />}>
            <ExplorePage />
          </Suspense>
        ),
      },
      {
        path: "/watchlist",
        element: (
          <Suspense fallback={<Loader />}>
            <UserPreferences
              listType="watchlist"
              mediaTypes={watchListMediaTypes}
            />
          </Suspense>
        ),
        children: [
          {
            path: ":mediaType",
            element: (
              <Suspense fallback={<Loader />}>
                <UserPreferences
                  listType="watchlist"
                  mediaTypes={watchListMediaTypes}
                />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "/favorite",
        element: (
          <Suspense fallback={<Loader />}>
            <UserPreferences
              listType="favorite"
              mediaTypes={favoriteListMediaTypes}
            />
          </Suspense>
        ),
        children: [
          {
            path: ":mediaType",
            element: (
              <Suspense fallback={<Loader />}>
                <UserPreferences
                  listType="favorite"
                  mediaTypes={favoriteListMediaTypes}
                />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "/rated",
        element: (
          <Suspense fallback={<Loader />}>
            <UserPreferences
              listType="rated"
              mediaTypes={ratedListMediaTypes}
            />
          </Suspense>
        ),
        children: [
          {
            path: ":mediaType",
            element: (
              <Suspense fallback={<Loader />}>
                <UserPreferences
                  listType="rated"
                  mediaTypes={ratedListMediaTypes}
                />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "/manageAccounts",
        element: (
          <Suspense fallback={<Loader />}>
            <ManageAccountsPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <WelcomePage />,
  },
  {
    path: "/auth",
    element: <AuthenticationPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
