import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./components/layouts/DefaultLayout";
import Home from "./pages/Home";
import InterSection from "./pages/InterSection";
import Storage from "./pages/Storage";
import TikTakTao from "./pages/TikTakTao";
import Place from "./pages/Place";
import Todos from "./pages/Todos";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/storage",
        element: <Storage />,
      },
      {
        path: "/intersection",
        element: <InterSection />,
      },
      {
        path: "/tik-tak",
        element: <TikTakTao />,
      },
      {
        path: "/place",
        element: <Place />,
      },
    ],
  },
]);

export default router;
