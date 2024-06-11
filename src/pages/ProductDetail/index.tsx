import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Spin, message } from "antd";
import { LangContext } from "../../contexts/LangContext";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../../services/productService";
import NotFoundBlock from "../../components/NotFoundBlock";
import { GlobalContext } from "../../contexts/GlobalContext";
import {
  addFeedback,
  getFeedbackByProductId,
  getFeedbackSizeByProductId,
} from "../../services/feedbackService";
import UserFeedbackForm from "./UserFeedbackForm";
import ProductInfo from "./ProductInfo";
import FeedbackBlock from "./FeedbackBlock";
import { motion } from "framer-motion";
import { CartContext } from "../../contexts/CartContext";

const pageSize = 10;

const ProductDetail = () => {
  const { id } = useParams();
  const [, messageContext] = message.useMessage();
  const { trans } = useContext(LangContext);
  const { user } = useContext(GlobalContext);
  const { addItemToCart } = useContext(CartContext);
  const {
    data: product,
    isLoading,
    refetch: refetchProduct,
  } = useQuery({
    queryKey: ["products", "/id"],
    queryFn: () => getProductById(id as string),
    select: (response) => response as IProduct,
  });
  const [totalFeedback, setTotalFeedback] = useState<number>(0);
  const [feedbacks, setFeedbacks] = useState<IFeedback[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const feedbackBlockRef = useRef<HTMLDivElement>(null);

  const changePage = (page: number) => {
    setCurrentPage(page);
    if (feedbackBlockRef.current) {
      feedbackBlockRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleSubmitFeedback = async (feedback: {
    rate: number;
    content: string;
  }) => {
    if (product && user) {
      try {
        const isOk = await addFeedback({
          content: feedback.content,
          product_id: product._id,
          rate: feedback.rate,
          user_id: user._id,
          nameUser: user.name,
        });
        if (isOk) {
          message.success(
            trans({ en: "Feedback successfully!", vi: "Đánh giá thành công!" }),
          );
          refetchProduct();
          setCurrentPage(1);
        } else {
          message.info(
            trans({ en: "Feedback failed!", vi: "Đánh giá thất bại!" }),
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleAddItemToCart = (quantity: number) => {
    if (product) {
      addItemToCart(product, quantity);
      message.success(
        trans({
          en: `Add ${quantity} item "${product.name}" to cart!`,
          vi: `Đã thêm ${quantity} sản phẩm "${product.name}" vào giỏ hàng`,
        }),
      );
    }
  };

  useEffect(() => {
    const getFeedbacks = async () => {
      try {
        const response = await getFeedbackByProductId(
          product?._id as string,
          pageSize,
          currentPage,
        );
        console.log("GET FEEDBACKS");
        setFeedbacks(response);
      } catch (error) {
        setFeedbacks([]);
      }
    };

    if (product) {
      getFeedbacks();
    }
  }, [product, currentPage]);

  // Get total feedback size for split page logic
  useEffect(() => {
    const fetchTotalFeedback = async () => {
      try {
        const size = await getFeedbackSizeByProductId(product?._id as string);
        setTotalFeedback(size);
      } catch (error) {
        setTotalFeedback(0);
      }
    };

    if (product) {
      fetchTotalFeedback();
    }
  }, [product]);

  if (isLoading) {
    <div className="max-w-screen-xl min-h-screen px-2 py-4 mx-auto mt-8">
      <Spin />
    </div>;
  }

  if (!product) {
    return <NotFoundBlock />;
  }

  return (
    <div className="relative ">
      {messageContext}

      <div className="max-w-screen-xl min-h-screen px-2 py-4 mx-auto mt-8">
        <ProductInfo product={product} onAddItem={handleAddItemToCart} />
        {/* Feedback */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-12 gap-2 mt-4 "
          ref={feedbackBlockRef}
        >
          <FeedbackBlock
            product={product}
            feedbacks={feedbacks}
            totalFeedback={totalFeedback}
            pageSize={pageSize}
            changePage={changePage}
          />

          {/* User feedback form */}
          {<UserFeedbackForm onSubmit={handleSubmitFeedback} />}
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;
