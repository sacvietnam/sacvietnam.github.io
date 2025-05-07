import React from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import routesObject from "./util/routes";
import "@fontsource/bungee";
import "@fontsource/twinkle-star";
import "@fontsource/flow-rounded";
import "@fontsource-variable/overpass";
import "@fontsource/monoton";

import LanguageProvider from "./contexts/LangContext";
import GlobalProvider from "./contexts/GlobalContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LocalStorageHandler from "./util/localStorage/LocalStorageHandler";
import CartProvider from "./contexts/CartContext";
const queryClient = new QueryClient();

const router = createHashRouter(routesObject);

LocalStorageHandler.initial();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalProvider>
        <LanguageProvider>
          <CartProvider>
            <React.StrictMode>
              <RouterProvider router={router} />
            </React.StrictMode>
          </CartProvider>
        </LanguageProvider>
      </GlobalProvider>
    </QueryClientProvider>
  );
}
