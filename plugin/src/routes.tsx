import { createBrowserRouter, redirect } from "react-router";
import Home from "./Home";
import { authLoader } from "./authLoader";
import { Layout } from "./routeLayout";
import { Test } from "./Test";

function ErrorPage() {
	return <div>Oops! Something went wrong.</div>;
}

export const router = createBrowserRouter([
	{
		path: "/",
		Component: Layout,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				Component: Home,
				loader: authLoader,
				errorElement: <ErrorPage />,
			},
			{
				path: "test",
				Component: Test,
				loader: authLoader,
				errorElement: <ErrorPage />,
			},
		],
	},
]);
