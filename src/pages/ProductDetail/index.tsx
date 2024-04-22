import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IProduct } from "../Order/ProductItem";
import placeholderData from "../Order/sac.products.json";
import DiscountPrice from "../../components/DiscountPrice";
import { Button } from "antd";
import { LangContext } from "../../contexts/LangContext";
import { ShoppingCartOutlined } from "@ant-design/icons";
const ProductDetail = () => {
	const { id } = useParams();
	const [product, setProduct] = useState<IProduct>({
		_id: "661e7eacb503867d8f913c83",
		name: "Đai điều hòa",
		images: ["https://placehold.co/600x400", "https://placehold.co/600x400"],
		price: 300000,
		discount: {
			type: "percent",
			value: 0,
		},
		description:
			"Đai điều hòa đeo ngang lưng giúp làm mát cơ thể trong khi di chuyển.",
		inventory: 0,
	});
	const [index, setIndex] = useState<number>(0);
	const { trans } = useContext(LangContext);

	useEffect(() => {
		const productFound = placeholderData.find((product) => product._id == id);
		if (productFound) {
			const validProduct: IProduct = {
				...productFound,
				discount: {
					...productFound.discount,
					type: productFound.discount.type as "percent" | "fixed",
				},
			};
			setProduct(validProduct);
		}
	}, [id]);
	console.log(index);

	return (
		<div className="relative ">
			<div className="max-w-screen-xl min-h-screen px-2 py-4 mx-auto mt-8">
				<div className="relative grid grid-cols-1 gap-8 md:grid-cols-2">
					{/* Product image */}
					<div className="inline-grid grid-cols-8 gap-2 ">
						<div className="flex flex-col w-full col-span-1 gap-2">
							{product.images.map((image, i) => (
								<img
									src={image}
									key={i}
									className={`w-full object-cover ${index === i ? "opacity-70" : ""}`}
									onMouseEnter={() => setIndex(i)}
								/>
							))}
						</div>
						<div className="col-span-7">
							<img src={product?.images[index]} className="object-cover" />
						</div>
					</div>

					{/* Product information */}
					<div>
						<h2 className="text-2xl font-bold">{product.name}</h2>
						<DiscountPrice discount={product.discount} price={product.price} />
						<p className="mt-4">
							<span className="font-semibold">
								Mô tả:
								<br />
							</span>
							{product.description}
						</p>
						<Button
							size="large"
							block
							type="primary"
							className="mt-10 bg-primary"
							icon={<ShoppingCartOutlined />}
						>
							{trans({ en: "", vi: "Đặt mua" })}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetail;
