import React, { useContext } from "react";
import productsPlaceholder from "./sac.products.json";
import ProductItem, { IProduct } from "./ProductItem";
import { LangContext } from "../../contexts/LangContext";
const productList = productsPlaceholder as IProduct[];

const Order = () => {
	console.log(productList);
	const [products, setProducts] = React.useState<IProduct[]>(productList);
	const lang = useContext(LangContext);
	return (
		<div>
			<div className="max-w-screen-xl px-2 py-4 mx-auto mt-8">
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
		</div>
	);
};

export default Order;
