import { RouteObject } from "react-router-dom";
import About from "../pages/About";
import Download from "../pages/Download";
import Home from "../pages/Home";
import Product from "../pages/Product";
import Story from "../pages/Story";
import Error from "../pages/Error";
import MainLayout from "../layouts/MainLayout";

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
		element: element,
		errorElement: <Error />,
		id: route.path,
	};
});

export default routesObject;
