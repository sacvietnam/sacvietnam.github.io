import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routesObject from "./util/routes";
import "@fontsource/bungee";
import "@fontsource/twinkle-star";
import "@fontsource/flow-rounded";
import "@fontsource-variable/overpass";
import "@fontsource/monoton";

const router = createBrowserRouter(routesObject);
export default function App() {
	return (
		<React.StrictMode>
			<RouterProvider router={router} />
		</React.StrictMode>
	);
}