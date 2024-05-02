import { Button, Card, Rate } from "antd";
import { useContext } from "react";
import { LangContext } from "../../contexts/LangContext";
import { useNavigate } from "react-router-dom";
import DiscountPrice from "../../components/DiscountPrice";
import { IProduct } from "../../models/DataModel";
import { motion } from "framer-motion";

const MotionDiv = motion.div;

const ProductItem = ({ product }: { product: IProduct }) => {
	const { trans } = useContext(LangContext);
	const navigate = useNavigate();

	return (
		<MotionDiv initial={{opacity: 0, y: 50}} animate={{opacity: 1, y: 0}}>
			<Card
				hoverable
				cover={
					<img
						className="h-[300px] object-cover"
						alt={product.name}
						src={product.images[0]}
					/>
				}
				className="relative"
				onClick={() => {
					navigate("/order/product/" + product._id);
				}}
			>
				<div className="flex flex-col justify-center h-full gap-2">
					<div>
						<h4 className="text-lg font-medium">{product.name}</h4>
						<Rate value={product.rate} disabled className="text-sm"/>
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
		</MotionDiv>
	);
};

export default ProductItem;
