import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";
import MoreInfoAboutMoviePage from "../pages/MoreInfoAboutMoviePage";
import MyWatchList from "../pages/MyWatchList";
import ExplorePage from "../pages/ExplorePage";
import MyFavoritePage from "../pages/MyFavoritePage";
import RatedListPage from "../pages/RatedListPage";
import ManageAccountsPage from "../pages/ManageAccountsPage";
import WelcomePage from "../pages/WelcomePage";
import AuthenticationPage from "../pages/AuthenticationPage";

export const router = createBrowserRouter([
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
        path: "/myWatchList",
        element: <MyWatchList />,
      },
      {
        path: "/explore",
        element: <ExplorePage />,
      },
      {
        path: "/myFavorite",
        element: <MyFavoritePage />,
      },
      {
        path: "/rated",
        element: <RatedListPage />,
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
