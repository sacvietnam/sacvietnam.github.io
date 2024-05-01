import { Button, Divider, Popconfirm, message } from "antd";
import { CartItem, CartStorageHandler } from "../../util/LocalStorageHandler";
import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { LangContext } from "../../contexts/LangContext";
import { GlobalContext } from "../../contexts/GlobalContext";

function calculateRealPrice(item: CartItem): number {
	const price = Number(item.price);
	const discount = Number(
		item.discount.type === "percent"
			? (price * Number(item.discount.value)) / 100
			: Number(item.discount.value)
	);
	console.log(price, item.discount);
	return price - discount;
}

function calculateLineTotal(item: CartItem): number {
	const price = calculateRealPrice(item);
	const totalLine = price * item.quantity;
	return totalLine;
}

function calculateCartTotal(cart: CartItem[]): number {
	return cart.reduce((acc, item) => {
		const price = calculateLineTotal(item);
		return acc + price;
	}, 0);
}

function calculateCartDiscount(cart: CartItem[]): number {
	return cart.reduce((acc, item) => {
		const discount =
			item.discount.type === "percent"
				? (item.price * item.discount.value) / 100
				: item.discount.value;
		return acc + discount;
	}, 0);
}

function formatToVND(value: number): string {
	return new Intl.NumberFormat("vi-VN", {
		style: "currency",
		currency: "VND",
	}).format(value);
}

const UserCart = () => {
	const cart = CartStorageHandler.getInstance();
	const [rerender, setRerender] = React.useState<boolean>(false);
	const { trans } = useContext(LangContext);
	const { user } = useContext(GlobalContext);
	const [, context] = message.useMessage();
	const handleCheckout = () => {
		message.info(
			trans({
				en: "This feature is not available yet",
				vi: "Chức năng này chưa khả dụng",
			})
		);
	};

	if (!user) {
		return (
			<div className="flex items-start justify-center h-screen mt-8">
				<h1 className="text-xl font-bold text-center">
					{trans({
						en: "Please login to view your cart",
						vi: "Vui lòng đăng nhập để xem giỏ hàng của bạn",
					})}
				</h1>
			</div>
		);
	}

	const cartDiscount = calculateCartDiscount(cart);
	return (
		<div>
			{context}
			<div className="max-w-screen-xl px-2 mx-auto mb-8">
				<div className="grid grid-cols-8 gap-8 mt-8">
					<div className="p-4 pb-8 border rounded-md col-span-full lg:col-span-5 h-fit">
						<h1 className="mt-4 mb-4 text-xl font-bold text-center font-display">
							<ShoppingCartOutlined className="mr-2 text-2xl font-bold" />
							{trans({ en: "Your Cart", vi: "Giỏ hàng của bạn" })}
						</h1>
						<div className="flex flex-wrap gap-2">
							{cart.map((item) => (
								<Link
									to={`/order/product/${item.productId}`}
									key={item.productId}
								>
									<article className="flex gap-2 p-4 transition-all border rounded-md w-fit hover:shadow-md">
										<img
											className="object-cover rounded-md"
											width={100}
											height={100}
											src={item.product.images[0]}
											alt={item.product.name}
										/>
										<div>
											<h3 className="font-semibold">{item.product.name}</h3>
											<p className="text-sm">
												<span>{formatToVND(calculateRealPrice(item))}</span>
												<span className="ml-2">x{item.quantity}</span>
												<span className="font-semibold">
													{" "}
													= {formatToVND(calculateLineTotal(item))}
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
													onConfirm={() => {
														CartStorageHandler.removeItemFromCart(
															item,
															item.quantity
														);
														setRerender(!rerender);
													}}
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
							))}
						</div>
					</div>
					<div className="p-4 border rounded-md col-span-full lg:col-span-3 h-fit">
						<h2 className="text-2xl font-bold text-center underline ">
							{trans({ en: "Order Summary", vi: "Tóm tắt đơn hàng" })}
						</h2>
						<div className="mt-2">
							{cart.map((item, index) => (
								<div
									key={item.productId}
									className="flex justify-between overflow-auto"
								>
									<p className="text-nowrap">
										{index + 1} {". "}
										{item.product.name}
									</p>
									<p className="font-semibold">
										{formatToVND(calculateLineTotal(item))}
									</p>
								</div>
							))}
							<Divider />
							{cartDiscount != 0 && (
								<div className="flex justify-between text-md">
									<p>
										{trans({
											en: "Total amount reduced",
											vi: "Tổng tiền giảm",
										})}
										:
									</p>
									<p className="text-green-400 font-semibol">
										-{formatToVND(cartDiscount)}
									</p>
								</div>
							)}
							<div className="flex items-end justify-between mt-4 text-2xl">
								<b>{trans({ en: "Total", vi: "Tổng tiền" })}</b>
								<p className="font-bold text-primary ">
									{formatToVND(calculateCartTotal(cart))}
								</p>
							</div>
							<Button
								block
								type="primary"
								size="large"
								className="mt-4 bg-primary"
								onClick={handleCheckout}
							>
								{trans({ en: "Checkout", vi: "Thanh toán" })}
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserCart;
