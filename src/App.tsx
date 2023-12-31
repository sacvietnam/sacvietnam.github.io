import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@fontsource/sigmar-one";
import "@fontsource/srisakdi";
import "@fontsource/twinkle-star";
import "@fontsource-variable/overpass";
import MainLayout from "./layouts/MainLayout";
import Story from "./pages/Story";
import Product from "./pages/Product";
import Download from "./pages/Download";
import About from "./pages/About";
import Error from "./pages/Error";

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<MainLayout>
				<Story />
			</MainLayout>
		),
		errorElement: <Error />,
	},
	{
		path: "/product",
		element: (
			<MainLayout>
				<Product />
			</MainLayout>
		),
	},
	{
		path: "/download",
		element: (
			<MainLayout>
				<Download />
			</MainLayout>
		),
	},
	{
		path: "/about-us",
		element: (
			<MainLayout>
				<About />
			</MainLayout>
		),
	},
]);

export default function App() {
	return (
		<React.StrictMode>
			<RouterProvider router={router} />
		</React.StrictMode>
	);
}
