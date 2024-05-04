import "./App.scss";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { router } from "./routes/Routes.jsx";
import "react-loading-skeleton/dist/skeleton.css";
import useLocalStorage from "./hooks/useLocalStorage.jsx";

function App() {
  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
        }}
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
