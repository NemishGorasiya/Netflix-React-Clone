import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { router } from "./routes/Routes.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import "react-loading-skeleton/dist/skeleton.css";
import "./App.scss";

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
