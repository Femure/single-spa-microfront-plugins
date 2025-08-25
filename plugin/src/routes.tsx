import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Layout } from "./routeLayout";
import Home from "./Home";
import { Test } from "./Test";

// Function to detect the current basepath
function getBasePath(): string {
  const currentPath = window.location.pathname;
  
  // If we're already on a plugin path, extract the base
  if (currentPath.includes('/plugin')) {
    return '/plugin';
  }
  
  // Default fallback
  return '/plugin';
}

const rootRoute = createRootRoute({
  component: Layout,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/home",
  component: Home,
});

const testRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/test",
  component: Test,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home, // Default to home
});

const routeTree = rootRoute.addChildren([indexRoute, homeRoute, testRoute]);

export const router = createRouter({
  routeTree,
  basepath: getBasePath(),
  defaultPreload: 'intent',
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}