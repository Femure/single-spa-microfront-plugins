import { createRootRoute, createRoute } from "@tanstack/react-router";
import { Home } from "./Home";
import { Plugin } from "./Plugin";
import { Layout } from "./rootLayout";

export const rootRoute = createRootRoute({
  component: Layout,
});

export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/home",
  component: Home,
});

export const pluginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/plugin",
  component: Plugin,
});
