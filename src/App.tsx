import React from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import routesObject from "./util/routes";
import "@fontsource/bungee";
import "@fontsource/twinkle-star";
import "@fontsource/flow-rounded";
import "@fontsource-variable/overpass";
import "@fontsource/monoton";

// Loading first file
import product1 from "./assets/imgs/product/belt.png";
import product2 from "./assets/imgs/product/belt-top.png";
import product3 from "./assets/imgs/product/belt-top-center.png";

const router = createHashRouter(routesObject);
export default function App() {
	return (
		<>
			<React.StrictMode>
				<RouterProvider router={router} />
			</React.StrictMode>

			{/* Loading first */}
			<img src={product1} />
			<img src={product2} />
			<img src={product3} />
		</>
	);
}
