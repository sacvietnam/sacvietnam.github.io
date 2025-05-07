import DiscountPrice from "../../components/DiscountPrice";
import { Button, Image, InputNumber } from "antd";
import { LangContext } from "../../contexts/LangContext";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { motion } from "framer-motion";
import CommingSoon from "../../assets/imgs/comingsoon-square.png";

type ProductInfoProps = {
  product: IProduct;
  onAddItem: (quantity: number) => void;
};

const ProductInfo = ({ product, onAddItem }: ProductInfoProps) => {
  const [index, setIndex] = useState<number>(0);
  const { trans } = useContext(LangContext);
  const { user } = useContext(GlobalContext);
  const [quantity, setQuantity] = useState<number>(1);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative grid grid-cols-1 gap-8 md:grid-cols-2"
      key={product._id}
    >
      {/* Product image */}
      <div className="inline-grid grid-cols-8 gap-2 ">
        <div className="flex flex-col w-full col-span-1 gap-4">
          {product?.images.map((image: string, i: number) => (
            <motion.img
              whileHover={{ scale: 1.1, rotate: 5 }}
              src={image}
              key={i}
              className={`w-full object-cover ${
                index === i ? "opacity-70" : ""
              }`}
              onMouseEnter={() => setIndex(i)}
            />
          ))}
        </div>
        <div className="grid col-span-7 place-items-center">
          <Image
            src={product?.images[index]}
            className="object-cover w-full max-h-[400px] "
            placeholder={
              <Image preview={false} src={CommingSoon} width={200} />
            }
          />
          {product.images.length == 0 && (
            <Image
              preview={false}
              className="object-cover w-full max-h-[400px] "
              src={CommingSoon}
            />
          )}
        </div>
      </div>

      {/* Product information */}
      <div>
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <DiscountPrice discount={product.discount} price={product.price} />
        <div className="mt-4">
          <span className="font-semibold">
            {trans({ en: "Description", vi: "Mô tả" })}:
            <br />
          </span>
          <ul className="pl-8 list-disc">
            {product.description.split("\n").map(
              (line, i) =>
                line.length !== 0 && (
                  <li key={i}>
                    {line}
                    <br />
                  </li>
                ),
            )}
          </ul>
        </div>
        <div className="mt-10">
          <div>
            <span className="mr-2 text-sm font-semibold">
              {trans({ en: "Quantity", vi: "Số lượng" })}:
            </span>
            <InputNumber
              size="middle"
              min={1}
              max={100}
              defaultValue={quantity}
              onChange={(value) => setQuantity(value as number)}
              className="mb-2"
            />
          </div>

          {!user && (
            <span className="text-sm italic text-red-400">
              {trans({
                en: "Please log in to place an order!",
                vi: "Hãy đăng nhập để có thể đặt mua!",
              })}
            </span>
          )}
          <Button
            size="large"
            block
            type="primary"
            className=" bg-primary"
            icon={<PlusCircleOutlined />}
            disabled={!user}
            onClick={() => onAddItem(quantity)}
          >
            {trans({ en: "Add to cart", vi: "Thêm vào giỏ hàng" })}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductInfo;
