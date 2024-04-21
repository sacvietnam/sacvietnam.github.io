import { Button, Card } from "antd";
import Format from "../../util/format";

export interface IProduct {
	_id: string;
	name: string;
	images: string[];
	price: number;
	discount: {
		type: "percent" | "fixed";
		value: number;
	};
	description: string;
	inventory: number;
}

const ProductItem = ({ product }: { product: IProduct }) => {
	return (
		<Card hoverable cover={<img alt={product.name} src={product.images[0]} />}>
			<div className="flex flex-col justify-between gap-2">
				<div>
					<h4 className="text-lg font-medium">{product.name}</h4>
					<span className="font-display">{Format.currency(product.price)}</span>
				</div>
				<Button
					block
					className="mt-auto text-xl font-medium bg-primary"
					type="primary"
					size="large"
					title="Add to cart"
				>
					Đặt mua
				</Button>
			</div>
		</Card>
	);
};

export default ProductItem;
