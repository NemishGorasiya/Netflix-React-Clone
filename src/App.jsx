import "./App.scss";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { router } from "./routes/Routes.jsx";
import "./fonts/NetflixSans_W_Bd.woff2";
import "./fonts/NetflixSans_W_Md.woff2";
import "./fonts/NetflixSans_W_Rg.woff2";
import "./fonts/NetflixSans_W_Blk.woff2";

function App() {
  return (
    <>
      <Toaster position="bottom-right" />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
