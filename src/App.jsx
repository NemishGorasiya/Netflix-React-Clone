import "./App.scss";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { router } from "./routes/Routes.jsx";
import "react-loading-skeleton/dist/skeleton.css";
import { AuthContextProvider } from "./context/AuthContext.jsx";

function App() {
  return (
    <AuthContextProvider>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
        }}
      />
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;
