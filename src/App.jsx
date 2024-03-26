import "./App.scss";
import AuthenticationPage from "./pages/AuthenticationPage";
import ExplorePage from "./pages/ExplorePage";
import HomePage from "./pages/HomePage";
import MoreInfoAboutMoviePage from "./pages/MoreInfoAboutMoviePage";
import MyAccountPage from "./pages/MyAccountPage";
import MyFavoritePage from "./pages/MyFavoritePage";
import MyWatchList from "./pages/MyWatchList";
import OverviewPage from "./pages/OverviewPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import TVShowsPage from "./pages/TVShowsPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/movies/moreInfo",
      element: <MoreInfoAboutMoviePage />,
    },
    {
      path: "/myWatchList",
      element: <MyWatchList />,
    },
    {
      path: "/tvshows",
      element: <TVShowsPage />,
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
      path: "myAccount",
      element: <MyAccountPage />,
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
