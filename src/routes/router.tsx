import { createBrowserRouter } from "react-router-dom";
import StartGameCong from "~/pages/auth/StartGameCong";
import MainGameCong from "~/pages/home/MainGameCong";
import RequiredLogout from "~/components/protected/RequiredLogout";
import RequiredAuth from "~/components/protected/RequiredAuth";
import Game1 from "~/pages/home/Game1";
import CongratulationPage from "~/pages/home/CongratulationPage/CongratulationPage";
import { lazy, Suspense } from "react";

const MainAdmin = lazy(() => import("~/pages/admin/MainAdmin"));
const router = createBrowserRouter(
  [
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
          path: "/cong-1",
          element: <Game1 />,
        },
        {
          path: "/hoan-thanh-sinh-hoat-1",
          element: <CongratulationPage />,
        },
        {
          path: "/admin",
          element: (
            <Suspense fallback={<div>Đang tải...</div>}>
              <MainAdmin />
            </Suspense>
          ),
        },
      ],
    },
  ],
  {
    future: {
      // 👇 ép kiểu tránh lỗi TypeScript cho v7 flag
      v7_startTransition: true,
    } as any,
  }
);

export default router;
