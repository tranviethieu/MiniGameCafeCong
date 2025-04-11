import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import SplashScreen from "./components/protected/SplashScreen/SplashScreen";

function App() {
  return (
    <>
      <SplashScreen />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
