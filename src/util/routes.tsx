import { Spin } from "antd";
import React, { Suspense } from "react";
import { RouteObject } from "react-router-dom";
const About = React.lazy(() => import("../pages/About"));
const Download = React.lazy(() => import("../pages/Download"));
const Home = React.lazy(() => import("../pages/Home"));
const Product = React.lazy(() => import("../pages/Product"));
const Story = React.lazy(() => import("../pages/Story"));
const Error = React.lazy(() => import("../pages/Error"));
const MainLayout = React.lazy(() => import("../layouts/MainLayout"));
const Order = React.lazy(() => import("../pages/Order"));
const Blog = React.lazy(() => import("../pages/Blog"));
const ProductDetail = React.lazy(() => import("../pages/ProductDetail"));

type Props = {
	children?: React.ReactNode;
};

const routes: {
	path: string;
	element: React.FC;
	layout?: React.FC<Props> | null;
}[] = [
	{
		path: "/",
		element: Home,
	},
	{
		path: "/story",
		element: Story,
	},
	{
		path: "/product",
		element: Product,
	},
	{
		path: "/download",
		element: Download,
	},
	{
		path: "/about-us",
		element: About,
	},
	{
		path: "/order/product/:id",
		element: ProductDetail,
	},
	{
		path: "/order",
		element: Order,
	},
	{
		path: "/blog",
		element: Blog,
	},
];

const routesObject: RouteObject[] = routes.map((route) => {
	// Default layout
	let element = (
		<MainLayout>
			<route.element />
		</MainLayout>
	);

	// If has alter layout, set it
	if (route.layout)
		element = (
			<route.layout>
				<route.element />
			</route.layout>
		);
	// If layout is null, return just element
	else if (route.layout === null) element = <route.element />;

	return {
		path: route.path,
		element: (
			<Suspense
				fallback={
					<MainLayout>
						<div className="container flex items-center justify-center mx-auto w-lvw h-lvh">
							<Spin />
						</div>
					</MainLayout>
				}
			>
				{element}
			</Suspense>
		),
		errorElement: route.path === "/" ? <Error /> : null,
		id: route.path,
	};
});

export default routesObject;
