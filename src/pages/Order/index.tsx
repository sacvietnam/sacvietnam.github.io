import React, { useContext } from "react";
import productsPlaceholder from "./sac.products.json";
import ProductItem, { IProduct } from "./ProductItem";
import { LangContext } from "../../contexts/LangContext";
import Wave from "react-wavify";
const productList = productsPlaceholder as IProduct[];

const Order = () => {
	console.log(productList);
	const [products, setProducts] = React.useState<IProduct[]>(productList);
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
					{products.map((product) => (
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
