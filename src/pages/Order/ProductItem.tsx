import { Button, Card } from "antd";
import { useContext } from "react";
import { LangContext } from "../../contexts/LangContext";
import { useNavigate } from "react-router-dom";
import DiscountPrice from "../../components/DiscountPrice";
import { IProduct } from "../../models/DataModel";

const ProductItem = ({ product }: { product: IProduct }) => {
	const { trans } = useContext(LangContext);
	const navigate = useNavigate();

	return (
		<Card
			hoverable
			cover={<img className="h-[300px] object-cover" alt={product.name} src={product.images[0]} />}
			className="relative"
			onClick={() => {
				navigate("/order/product/" + product._id);
			}}
		>
			<div className="flex flex-col justify-center h-full gap-2">
				<div>
					<h4 className="text-lg font-medium">{product.name}</h4>
					<DiscountPrice price={product.price} discount={product.discount} />
				</div>
				<div>
					<Button
						block
						className="text-xl font-medium bg-primary"
						type="primary"
						size="large"
						title="Details"
					>
						{trans({ en: "View details", vi: "Xem chi tiết" })}
					</Button>
				</div>
			</div>
		</Card>
	);
};

export default ProductItem;
