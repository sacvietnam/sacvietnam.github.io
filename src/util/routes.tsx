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
					<div className="container mx-auto">
						<Spin />
					</div>
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
