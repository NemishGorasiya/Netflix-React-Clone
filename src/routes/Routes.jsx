import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loader from "../components/common/Loader.jsx";
import {
  favoriteListMediaTypes,
  ratedListMediaTypes,
  watchListMediaTypes,
} from "../constants/constants";
import HomePage from "../pages/HomePage.jsx";
import AuthenticationPage from "../pages/AuthenticationPage";
import WelcomePage from "../pages/WelcomePage";
import ProtectedRoute from "./ProtectedRoute";

import {
  LazyLoadedErrorPage,
  LazyLoadedMoreInfoAboutMoviePage,
  LazyLoadedExplorePage,
  LazyLoadedManageAccountsPage,
  LazyLoadedUserPreferences,
} from "../index.js";

export const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/home",
        element: (
          <Suspense fallback={<Loader atCenter />}>
            <HomePage />
          </Suspense>
        ),
        errorElement: <LazyLoadedErrorPage />,
      },
      {
        path: "/movies",
        element: (
          <Suspense fallback={<Loader atCenter />}>
            <HomePage mediaType="movie" />
          </Suspense>
        ),
      },
      {
        path: "/tv",
        element: (
          <Suspense fallback={<Loader atCenter />}>
            <HomePage mediaType="tv" />
          </Suspense>
        ),
      },
      {
        path: "/movie/moreInfo",
        element: (
          <Suspense fallback={<Loader atCenter />}>
            <LazyLoadedMoreInfoAboutMoviePage mediaType="movie" />
          </Suspense>
        ),
      },
      {
        path: "/tv/moreInfo",
        element: (
          <Suspense fallback={<Loader atCenter />}>
            <LazyLoadedMoreInfoAboutMoviePage mediaType="tv" />
          </Suspense>
        ),
      },
      {
        path: "/explore",
        element: (
          <Suspense fallback={<Loader atCenter />}>
            <LazyLoadedExplorePage />
          </Suspense>
        ),
      },
      {
        path: "/watchlist",
        element: (
          <Suspense fallback={<Loader atCenter />}>
            <LazyLoadedUserPreferences
              listType="watchlist"
              mediaTypes={watchListMediaTypes}
            />
          </Suspense>
        ),
        children: [
          {
            path: ":mediaType",
            element: (
              <Suspense fallback={<Loader atCenter />}>
                <LazyLoadedUserPreferences
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
          <Suspense fallback={<Loader atCenter />}>
            <LazyLoadedUserPreferences
              listType="favorite"
              mediaTypes={favoriteListMediaTypes}
            />
          </Suspense>
        ),
        children: [
          {
            path: ":mediaType",
            element: (
              <Suspense fallback={<Loader atCenter />}>
                <LazyLoadedUserPreferences
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
          <Suspense fallback={<Loader atCenter />}>
            <LazyLoadedUserPreferences
              listType="rated"
              mediaTypes={ratedListMediaTypes}
            />
          </Suspense>
        ),
        children: [
          {
            path: ":mediaType",
            element: (
              <Suspense fallback={<Loader atCenter />}>
                <LazyLoadedUserPreferences
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
          <Suspense fallback={<Loader atCenter />}>
            <LazyLoadedManageAccountsPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/",
    element: <WelcomePage atCenter />,
  },
  {
    path: "/auth",
    element: <AuthenticationPage atCenter />,
  },
  {
    path: "*",
    element: <LazyLoadedErrorPage atCenter />,
  },
]);
