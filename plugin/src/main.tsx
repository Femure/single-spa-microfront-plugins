import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routes";

if (import.meta.env.MODE === 'development' && document.getElementById("root")) {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <RouterProvider router={router} />
  );
}