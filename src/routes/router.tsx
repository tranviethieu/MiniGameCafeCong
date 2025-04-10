import { createBrowserRouter } from "react-router-dom";
import StartGameCong from "~/pages/auth/StartGameCong";
import MainGameCong from "~/pages/home/MainGameCong";
import ExportToExcel from "~/components/ExportFirestore";
import RequiredLogout from "~/components/protected/RequiredLogout";
import RequiredAuth from "~/components/protected/RequiredAuth";

const router = createBrowserRouter([
  {
    element: <RequiredLogout />,
    children: [
      {
        path: "/login",
        element: <StartGameCong />,
      },
    ],
  },
  {
    element: <RequiredAuth />,
    children: [
      {
        path: "/",
        element: <MainGameCong />,
      },
      {
        path: "/admin",
        element: <ExportToExcel />,
      },
    ],
  },
]);

export default router;
