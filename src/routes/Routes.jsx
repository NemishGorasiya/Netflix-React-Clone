import { Suspense, lazy } from "react";

import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import WelcomePage from "../pages/WelcomePage";
import AuthenticationPage from "../pages/AuthenticationPage";
import Loader from "../components/Loader";
const HomePage = lazy(() => import("../pages/HomePage"));
const ErrorPage = lazy(() => import("../pages/ErrorPage"));
const MoreInfoAboutMoviePage = lazy(() =>
  import("../pages/MoreInfoAboutMoviePage")
);
const MyWatchList = lazy(() => import("../pages/MyWatchList"));
const ExplorePage = lazy(() => import("../pages/ExplorePage"));
const MyFavoritePage = lazy(() => import("../pages/MyFavoritePage"));
const RatedListPage = lazy(() => import("../pages/RatedListPage"));
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
        path: "/myWatchList",
        element: (
          <Suspense fallback={<Loader />}>
            <MyWatchList />
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
        path: "/myFavorite",
        element: (
          <Suspense fallback={<Loader />}>
            <MyFavoritePage />
          </Suspense>
        ),
      },
      {
        path: "/rated",
        element: (
          <Suspense fallback={<Loader />}>
            <RatedListPage />
          </Suspense>
        ),
      },
      {
        path: "/manageAccounts",
        element: <ManageAccountsPage />,
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
