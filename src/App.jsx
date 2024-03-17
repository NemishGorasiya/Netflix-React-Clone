import "./App.scss";
import AuthenticationPage from "./pages/AuthenticationPage";
import OverviewPage from "./pages/OverviewPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path : "/",
      element : <OverviewPage />,
    },
    {
      path : "auth",
      element : <AuthenticationPage />
    }
  ])
  return (
    <>
      {/* <OverviewPage /> */}
      {/* <AuthenticationPage /> */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
