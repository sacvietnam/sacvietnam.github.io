import { Button, Divider, Empty, message } from "antd";
import React, { useContext } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { LangContext } from "../../contexts/LangContext";
import { GlobalContext } from "../../contexts/GlobalContext";
import CartCaculator from "../../util/CartCalculator";
import Formatter from "../../util/format/Formatter";
import OrderDetailItem from "./OrderDetailItem";
import { motion } from "framer-motion";
import { CartContext } from "../../contexts/CartContext";

const UserCart = () => {
  const { cart, removeItemFromCart } = useContext(CartContext);
  const [rerender, setRerender] = React.useState<boolean>(false);
  const { trans } = useContext(LangContext);
  const { user } = useContext(GlobalContext);
  const [, context] = message.useMessage();
  const handleCheckout = () => {
    message.info(
      trans({
        en: "This feature is not available yet",
        vi: "Chức năng này chưa khả dụng",
      }),
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

  const cartDiscount = CartCaculator.calculateCartDiscount(cart);
  return (
    <div>
      {context}
      <div className="max-w-screen-xl px-2 mx-auto mb-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-8 gap-8 mt-8"
        >
          <div className="p-4 pb-8 border rounded-md col-span-full lg:col-span-5 h-fit">
            <h1 className="mt-4 mb-4 text-xl font-bold text-center font-display">
              <ShoppingCartOutlined className="mr-2 text-2xl font-bold" />
              {trans({ en: "Your Cart", vi: "Giỏ hàng của bạn" })}
            </h1>

            <div className="flex flex-col flex-wrap gap-2 lg:flex-row">
              {(!cart || cart.length === 0) && (
                <div className="grid w-full place-items-center">
                  <Empty
                    description={trans({
                      en: "Your cart is empty",
                      vi: "Giỏ hàng của bạn trống",
                    })}
                  />
                </div>
              )}
              {cart.map((item) => (
                <OrderDetailItem
                  item={item}
                  onRemove={() => {
                    removeItemFromCart(item, item.quantity);
                    setRerender(!rerender);
                  }}
                />
              ))}
            </div>
          </div>

          {/* Order Summary */}
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
                  <div>
                    <p className="text-wrap">
                      {index + 1} {". "}
                      {item.product.name}{" "}
                      <b className="text-lg text-gray-600">
                        {" "}
                        x {item.quantity}
                      </b>
                    </p>
                  </div>

                  <p className="font-semibold">
                    {Formatter.toVND(CartCaculator.calculateLineTotal(item))}
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
                    -{Formatter.toVND(cartDiscount)}
                  </p>
                </div>
              )}
              <div className="flex items-end justify-between mt-4 text-2xl">
                <b>{trans({ en: "Total", vi: "Tổng tiền" })}</b>
                <p className="font-bold text-primary ">
                  {Formatter.toVND(CartCaculator.calculateCartTotal(cart))}
                </p>
              </div>
              <Button
                block
                type="primary"
                size="large"
                className="mt-4 font-semibold tracking-widest uppercase bg-primary"
                onClick={handleCheckout}
                disabled={cart.length === 0}
              >
                {trans({ en: "Checkout", vi: "Thanh toán" })}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserCart;
