import { lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  favoriteListMediaTypes,
  ratedListMediaTypes,
  watchListMediaTypes,
} from "../constants/constants";
import HomePage from "../pages/HomePage.jsx";
import AuthenticationPage from "../pages/AuthenticationPage";
import WelcomePage from "../pages/WelcomePage";
import ProtectedRoute from "./ProtectedRoute";
import ErrorPage from "../pages/ErrorPage.jsx";

const MoreInfoAboutMoviePage = lazy(() =>
  import("../pages/MoreInfoAboutMoviePage.jsx")
);
const ExplorePage = lazy(() => import("../pages/ExplorePage.jsx"));
const ManageAccountsPage = lazy(() =>
  import("../pages/ManageAccountsPage.jsx")
);
const UserPreferences = lazy(() => import("../pages/UserPreferences.jsx"));

const route = [
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/home",
        element: <HomePage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/movies",
        element: <HomePage mediaType="movie" />,
      },
      {
        path: "/tv",
        element: <HomePage mediaType="tv" />,
      },
      {
        path: "/movie/moreInfo",
        element: <MoreInfoAboutMoviePage mediaType="movie" />,
      },
      {
        path: "/tv/moreInfo",

        element: <MoreInfoAboutMoviePage mediaType="tv" />,
      },
      {
        path: "/explore",
        element: <ExplorePage />,
      },
      {
        path: "/watchlist",
        element: (
          <UserPreferences
            listType="watchlist"
            mediaTypes={watchListMediaTypes}
          />
        ),
        children: [
          {
            path: ":mediaType",
            element: (
              <UserPreferences
                listType="watchlist"
                mediaTypes={watchListMediaTypes}
              />
            ),
          },
        ],
      },
      {
        path: "/favorite",
        element: (
          <UserPreferences
            listType="favorite"
            mediaTypes={favoriteListMediaTypes}
          />
        ),
        children: [
          {
            path: ":mediaType",
            element: (
              <UserPreferences
                listType="favorite"
                mediaTypes={favoriteListMediaTypes}
              />
            ),
          },
        ],
      },
      {
        path: "/rated",
        element: (
          <UserPreferences listType="rated" mediaTypes={ratedListMediaTypes} />
        ),
        children: [
          {
            path: ":mediaType",
            element: (
              <UserPreferences
                listType="rated"
                mediaTypes={ratedListMediaTypes}
              />
            ),
          },
        ],
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
];

const Routes = () => {
  return <RouterProvider router={createBrowserRouter(route)} />;
};

export default Routes;
