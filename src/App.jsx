import "./App.scss";
import AuthenticationPage from "./pages/AuthenticationPage";
import HomePage from "./pages/HomePage";
import MoreInfoAboutMoviePage from "./pages/MoreInfoAboutMoviePage";
import OverviewPage from "./pages/OverviewPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/movies/moreInfo",
      element: <MoreInfoAboutMoviePage />,
    },
    {
      path: "/",
      element: <HomePage />,
    },
    // {
    //   path : "/",
    //   element : <OverviewPage />,
    // },
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
