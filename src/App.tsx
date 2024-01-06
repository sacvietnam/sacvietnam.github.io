import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "@fontsource/twinkle-star";
import "@fontsource/flow-rounded";
import "@fontsource-variable/overpass";
import "@fontsource/monoton";
import "@fontsource/vina-sans";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
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
				<Home />
			</MainLayout>
		),
		errorElement: <Error />,
	},
	{
		path: "/story",
		element: (
			<MainLayout>
				<Story />
			</MainLayout>
		),
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
	{
		path: "/contact",
		element: (
			<MainLayout>
				<></>
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
