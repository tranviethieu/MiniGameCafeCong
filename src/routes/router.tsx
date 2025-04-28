import { createBrowserRouter } from "react-router-dom";
import StartGameCong from "~/pages/auth/StartGameCong";
import MainGameCong from "~/pages/home/MainGameCong";
import RequiredLogout from "~/components/protected/RequiredLogout";
import RequiredAuth from "~/components/protected/RequiredAuth";
import { lazy, Suspense } from "react";
import LoadingScreen from "~/components/LoadingScreen";
const MainAdmin = lazy(() => import("~/pages/admin/MainAdmin"));
const Game1 = lazy(() => import("~/pages/home/Game1"));
const Game2 = lazy(() => import("~/pages/home/Game2"));
const Game3 = lazy(() => import("~/pages/home/Game3"));
const Game4 = lazy(() => import("~/pages/home/Game4"));
const Game5 = lazy(() => import("~/pages/home/Game5"));
const CongratulationPage = lazy(
  () => import("~/pages/home/CongratulationPage")
);
const CongratulationPage2 = lazy(
  () => import("~/pages/home/CongratulationPage2")
);
const CongratulationPage3 = lazy(
  () => import("~/pages/home/CongratulationPage3")
);
const CongratulationPage4 = lazy(
  () => import("~/pages/home/CongratulationPage4")
);
const CongratulationPage5 = lazy(
  () => import("~/pages/home/CongratulationPage5")
);
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
          element: (
            <Suspense fallback={<LoadingScreen />}>
              <Game1 />
            </Suspense>
          ),
        },
        {
          path: "/hoan-thanh-sinh-hoat-1",
          element: (
            <Suspense fallback={<LoadingScreen />}>
              <CongratulationPage />
            </Suspense>
          ),
        },
        {
          path: "/cong-2",
          element: (
            <Suspense fallback={<LoadingScreen />}>
              <Game2 />
            </Suspense>
          ),
        },
        {
          path: "/hoan-thanh-sinh-hoat-2",
          element: (
            <Suspense fallback={<LoadingScreen />}>
              <CongratulationPage2 />
            </Suspense>
          ),
        },
        {
          path: "/cong-3",
          element: (
            <Suspense fallback={<LoadingScreen />}>
              <Game3 />
            </Suspense>
          ),
        },
        {
          path: "/hoan-thanh-sinh-hoat-3",
          element: (
            <Suspense fallback={<LoadingScreen />}>
              <CongratulationPage3 />
            </Suspense>
          ),
        },
        {
          path: "/cong-4",
          element: (
            <Suspense fallback={<LoadingScreen />}>
              <Game4 />
            </Suspense>
          ),
        },
        {
          path: "/hoan-thanh-sinh-hoat-4",
          element: (
            <Suspense fallback={<LoadingScreen />}>
              <CongratulationPage4 />
            </Suspense>
          ),
        },
        {
          path: "/cong-5",
          element: (
            <Suspense fallback={<LoadingScreen />}>
              <Game5 />
            </Suspense>
          ),
        },
        {
          path: "/hoan-thanh-sinh-hoat-5",
          element: (
            <Suspense fallback={<LoadingScreen />}>
              <CongratulationPage5 />
            </Suspense>
          ),
        },
        {
          path: "/admin",
          element: (
            <Suspense fallback={<LoadingScreen />}>
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
