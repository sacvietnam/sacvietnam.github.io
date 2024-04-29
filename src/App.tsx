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
import LanguageProvider from "./contexts/LangContext";
import GlobalProvider from "./contexts/GlobalContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LocalStorageHandler from "./util/LocalStorageHandler";
const queryClient = new QueryClient();

const router = createHashRouter(routesObject);

LocalStorageHandler.initial();

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<GlobalProvider>
				<LanguageProvider>
					<React.StrictMode>
						<RouterProvider router={router} />
					</React.StrictMode>

					{/* Loading first for UX */}
					<div className="hidden">
						<img src={product1} width={0} height={0} hidden />
						<img src={product2} width={0} height={0} hidden />
						<img src={product3} width={0} height={0} hidden />
					</div>
				</LanguageProvider>
			</GlobalProvider>
		</QueryClientProvider>
	);
}
