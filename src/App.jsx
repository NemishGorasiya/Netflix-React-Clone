import "./App.scss";
import AuthenticationPage from "./pages/AuthenticationPage";
import ErrorPage from "./pages/ErrorPage";
import ExplorePage from "./pages/ExplorePage";
import HomePage from "./pages/HomePage";
import ManageAccountsPage from "./pages/ManageAccountsPage";
import MoreInfoAboutMoviePage from "./pages/MoreInfoAboutMoviePage";
import MyFavoritePage from "./pages/MyFavoritePage";
import MyWatchList from "./pages/MyWatchList";
// import OverviewPage from "./pages/OverviewPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
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
      path: "/manageAccounts",
      element: <ManageAccountsPage />,
    },
    {
      path: "auth",
      element: <AuthenticationPage />,
    },
  ]);
  return (
    <>
      {/* <OverviewPage /> */}
      {/* <AuthenticationPage /> */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
