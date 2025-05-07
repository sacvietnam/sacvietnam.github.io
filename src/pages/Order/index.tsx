import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import PaginationDataList from "../../components/PaginationDataList";
import { LangContext } from "../../contexts/LangContext";
import { getAllProducts, getProductSize } from "../../services/productService";
import ProductItem from "./ProductItem";

// quantity of products per page
const pageSize = 6;

const Order = () => {
  const { trans } = useContext(LangContext);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data: total } = useQuery({
    queryKey: ["productsSize"],
    queryFn: getProductSize,
  });

  return (
    <div className="relative min-h-lvh">
      <div className="max-w-screen-xl px-2 py-4 mx-auto mt-8">
        <h1 className="mb-8 text-2xl font-bold text-center font-display ">
          {trans({
            vi: "Danh sách sản phẩm hiện có",
            en: "Product list available",
          })}
        </h1>

        <PaginationDataList<IProduct>
          queryKey="products"
          currentPage={currentPage}
          pageSize={pageSize}
          setPage={setCurrentPage}
          total={total || 0}
          className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
          queryFn={getAllProducts}
          renderEach={(product) => (
            <ProductItem key={product._id} product={product} />
          )}
        />
      </div>
    </div>
  );
};

export default Order;
