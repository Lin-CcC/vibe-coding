import { createHashRouter, Navigate } from "react-router-dom";
import { slides } from "./slides";
import AppLayout from "./ui/AppLayout.jsx";
import SlidePage from "./ui/SlidePage.jsx";

const firstId = slides[0]?.id ?? "1";

export const router = createHashRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to={`/slide/${firstId}`} replace /> },
      { path: "slide/:id", element: <SlidePage /> },
      { path: "*", element: <Navigate to={`/slide/${firstId}`} replace /> },
    ],
  },
]);

