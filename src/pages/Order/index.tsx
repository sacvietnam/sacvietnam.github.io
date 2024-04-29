import { useContext } from "react";
import productsPlaceholder from "./sac.products.json";
import ProductItem from "./ProductItem";
import { LangContext } from "../../contexts/LangContext";
import Wave from "react-wavify";
import { getAllProducts } from "../../services/productService";
import { useQuery } from "@tanstack/react-query";
import { IProduct } from "../../models/DataModel";
const placeholderProducts = productsPlaceholder as IProduct[];

const Order = () => {
	console.log(placeholderProducts);

	const { isPending, data } = useQuery({
		queryKey: ["products"],
		queryFn: getAllProducts,
		select: (response) => response as IProduct[],
	});

	const lang = useContext(LangContext);
	return (
		<div className="relative ">
			<div className="max-w-screen-xl min-h-screen px-2 py-4 mx-auto mt-8">
				<h1 className="mb-2 text-2xl font-bold">
					{lang.trans({
						vi: "Danh sách sản phẩm hiện có",
						en: "Product list available",
					})}
				</h1>
				<div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3">
					{isPending &&
						placeholderProducts.map((product) => (
							<ProductItem key={product._id} product={product} />
						))}
					{data &&
						(data as IProduct[]).map((product) => (
							<ProductItem key={product._id} product={product} />
						))}
				</div>
			</div>

			<Wave
				className="absolute bottom-0.5 left-0 right-0 -z-[1] h-20 lg:h-40 translate-y-1 "
				fill="#4096ff"
				paused={false}
				options={{
					amplitude: 20,
					speed: 0.2,
					points: 3,
				}}
			/>
		</div>
	);
};

export default Order;
