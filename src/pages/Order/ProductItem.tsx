import { Card, Rate } from "antd";
import { useNavigate } from "react-router-dom";
import DiscountPrice from "../../components/DiscountPrice";
import { motion } from "framer-motion";

const MotionDiv = motion.div;

const ProductItem = ({ product }: { product: IProduct }) => {
  const navigate = useNavigate();

  return (
    <MotionDiv initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
      <Card
        hoverable
        cover={
          <img
            className="h-[300px] object-contain border-b"
            alt={product.name}
            src={product?.images[0]}
            onError={(e) => {
              e.currentTarget.src = "https://placehold.co/600x400";
            }}
          />
        }
        className="relative"
        onClick={() => {
          navigate("/order/product/" + product._id);
        }}
      >
        <div className="flex flex-col justify-center h-full gap-2">
          <h4 className="text-lg font-medium">{product.name}</h4>
          <Rate value={product.rate} disabled className="text-sm" />
          <DiscountPrice price={product.price} discount={product.discount} />
        </div>
      </Card>
    </MotionDiv>
  );
};

export default ProductItem;
