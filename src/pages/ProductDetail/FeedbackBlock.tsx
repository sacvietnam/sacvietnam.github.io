import { Divider, Pagination, Rate } from "antd";
import { LangContext } from "../../contexts/LangContext";
import { useContext } from "react";
import FeedbackItem from "./FeedbackItem";

type FeedbackBlockProps = {
  product: IProduct;
  feedbacks: IFeedback[];
  totalFeedback: number;
  pageSize: number;
  changePage: (page: number) => void;
};

const FeedbackBlock = ({
  product,
  feedbacks,
  totalFeedback,
  pageSize,
  changePage,
}: FeedbackBlockProps) => {
  const { trans } = useContext(LangContext);
  console.log("render FeedbackBlock", totalFeedback, pageSize);
  return (
    <div className="order-2 col-span-12 p-4 mb-4 border rounded-md md:order-1 md:col-span-8">
      <h3 className="text-xl font-semibold text-center ">
        {trans({ en: "Review from user", vi: "Đánh giá từ người dùng" })}
      </h3>

      <div className="flex items-center justify-center gap-2">
        <Rate value={product.rate} disabled />
        <span className="text-xs">({product.quantityRate})</span>
      </div>
      <Divider />

      <div className="flex flex-col gap-2 mt-4">
        {product.quantityRate == 0 && (
          <p className="text-sm text-center text-gray-400">
            (
            <i>
              {trans({
                en: "There have been no responses from the user yet.",
                vi: "Chưa có phản hồi nào của người dùng.",
              })}
            </i>
            )
          </p>
        )}

        {feedbacks &&
          feedbacks.map((feedback: IFeedback) => (
            <FeedbackItem feedback={feedback} key={feedback._id} />
          ))}
        {totalFeedback > pageSize && (
          <div className="p-2 pb-8 mx-auto w-fit">
            <Pagination
              className="p-2 bg-white border rounded-md "
              total={totalFeedback}
              defaultCurrent={1}
              defaultPageSize={pageSize}
              onChange={(page) => changePage(page)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackBlock;
