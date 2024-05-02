import { Link } from "react-router-dom";
import { CartItem } from "../../util/localStorage/LocalStorageHandler";
import Formatter from "../../util/format/Formatter";
import CartCaculator from "../../util/CartCalculator";
import { Button, Popconfirm } from "antd";
import { LangContext } from "../../contexts/LangContext";
import { useContext } from "react";
import { DeleteOutlined } from "@ant-design/icons";

type OrderDetailItemProps = {
	item: CartItem;
	onRemove: () => void;
};

const OrderDetailItem = ({ item, onRemove }: OrderDetailItemProps) => {
	const { trans } = useContext(LangContext);
	return (
		<Link to={`/order/product/${item.productId}`} key={item.productId}>
			<article className="flex w-full gap-4 p-4 transition-all border rounded-md lg:w-fit hover:shadow-md">
				<img
					className="object-cover rounded-md"
					width={100}
					height={100}
					src={item.product.images[0]}
					alt={item.product.name}
				/>
				<div className="w-full">
					<h3 className="font-semibold">{item.product.name}</h3>
					<p className="text-sm">
						<span>
							{Formatter.toVND(CartCaculator.calculateRealPrice(item))}
						</span>
						<span className="ml-1 text-xs text-gray-500">x{item.quantity}</span>
						<span className="font-semibold">
							{" "}
							= {Formatter.toVND(CartCaculator.calculateLineTotal(item))}
						</span>
					</p>
					<div className="flex justify-end">
						<Popconfirm
							title={trans({
								en: "Are you sure to delete this task?",
								vi: "Bạn có chắc chắn muốn xóa sản phẩm này không?",
							})}
							description={trans({
								en: `Remove "${item.product.name}" from cart?`,
								vi: `Xóa "${item.product.name}" khỏi giỏ hàng?`,
							})}
							okButtonProps={{ danger: true }}
							okText={trans({
								en: "Remove from cart",
								vi: "Xóa khỏi giỏ",
							})}
							cancelText={trans({ en: "Cancel", vi: "Hủy" })}
							onPopupClick={(e) => {
								e.preventDefault();
							}}
							onConfirm={onRemove}
						>
							<Button
								size="small"
								shape="round"
								className="ml-auto"
								danger
								onClick={(e) => e.preventDefault()}
								icon={<DeleteOutlined />}
							/>
						</Popconfirm>
					</div>
				</div>
			</article>
		</Link>
	);
};

export default OrderDetailItem;
