import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import DiscountPrice from "../../components/DiscountPrice";
import { Button, Image, Rate, Spin } from "antd";
import { LangContext } from "../../contexts/LangContext";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../../services/productService";
import NotFoundBlock from "../../components/NotFoundBlock";
import { IProduct } from "../../models/DataModel";
const ProductDetail = () => {
	const { id } = useParams();
	const [index, setIndex] = useState<number>(0);
	const { trans } = useContext(LangContext);
	const { data, isLoading } = useQuery({
		queryKey: ["products", "/id"],
		queryFn: () => getProductById(id as string),
		select: (response) => response as IProduct,
	});

	if (isLoading) {
		<div className="max-w-screen-xl min-h-screen px-2 py-4 mx-auto mt-8">
			<h1>Loading...</h1>
			<Spin />
		</div>;
	}

	if (!data) {
		return <NotFoundBlock />;
	}

	return (
		<div className="relative ">
			<div className="max-w-screen-xl min-h-screen px-2 py-4 mx-auto mt-8">
				<div className="relative grid grid-cols-1 gap-8 md:grid-cols-2">
					{/* Product image */}
					<div className="inline-grid grid-cols-8 gap-2 ">
						<div className="flex flex-col w-full col-span-1 gap-2">
							{data?.images.map((image: string, i: number) => (
								<img
									src={image}
									key={i}
									className={`w-full object-cover ${
										index === i ? "opacity-70" : ""
									}`}
									onMouseEnter={() => setIndex(i)}
								/>
							))}
						</div>
						<div className="col-span-7">
							<Image
								src={data?.images[index]}
								className="object-cover w-full"
								placeholder={
									<Image
										preview={false}
										src="https://placehold.co/600x400"
										width={200}
									/>
								}
							/>
						</div>
					</div>

					{/* Product information */}
					<div>
						<h2 className="text-2xl font-bold">{data.name}</h2>
						<DiscountPrice discount={data.discount} price={data.price} />
						<p className="mt-4">
							<span className="font-semibold">
								Mô tả:
								<br />
							</span>
							{data.description}
						</p>
						<Button
							size="large"
							block
							type="primary"
							className="mt-10 bg-primary"
							icon={<ShoppingCartOutlined />}
						>
							{trans({ en: "Buy", vi: "Đặt mua" })}
						</Button>
					</div>
				</div>

				{/* Feedback */}
				<div className="p-4 mt-4 border rounded-md">
					<h3 className="text-xl font-semibold ">Đánh giá từ người dùng</h3>

					<div className="flex items-center gap-2">
						<Rate value={0} disabled />
						<span className="text-xs">(0)</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetail;
