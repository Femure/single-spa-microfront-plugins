import React from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createRouter,
} from "@tanstack/react-router";
import { rootRoute, homeRoute, pluginRoute } from "./routes";

const routeTree = rootRoute.addChildren([homeRoute, pluginRoute]);

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: () => <div>404 - Not Found</div>,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
