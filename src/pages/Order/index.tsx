import { useContext, useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { LangContext } from "../../contexts/LangContext";
import Wave from "react-wavify";
import { getAllProducts, getProductSize } from "../../services/productService";
import { useQuery } from "@tanstack/react-query";
import { IProduct } from "../../models/DataModel";
import { Pagination, Skeleton, Space } from "antd";

// quantity of products per page
const pageSize = 6;

const Order = () => {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const {
		isPending,
		data: products,
		refetch,
	} = useQuery({
		queryKey: ["products"],
		queryFn: () => getAllProducts(pageSize, currentPage),
		select: (response) => response as IProduct[],
	});

	const { data: totalProducts } = useQuery({
		queryKey: ["productsSize"],
		queryFn: getProductSize,
	});
	const lang = useContext(LangContext);

	const changePage = (page: number) => {
		setCurrentPage(page);
	};

	// scroll to top when change page
	useEffect(() => {
		refetch();
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, [currentPage, refetch]);

	return (
		<div className="relative ">
			<div className="max-w-screen-xl px-2 py-4 mx-auto mt-8">
				<h1 className="mb-2 text-2xl font-bold">
					{lang.trans({
						vi: "Danh sách sản phẩm hiện có",
						en: "Product list available",
					})}
				</h1>
				<div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3">
					{isPending && (
						<Space>
							<Skeleton.Button active />
							<Skeleton.Avatar active />
							<Skeleton.Input active />
						</Space>
					)}
					{products &&
						(products as IProduct[]).map((product) => (
							<ProductItem key={product._id} product={product} />
						))}
				</div>
			</div>
			<div className="p-2 pb-8 mx-auto w-fit">
				<Pagination
					className="p-2 bg-white border rounded-md "
					total={totalProducts}
					defaultCurrent={1}
					defaultPageSize={pageSize}
					onChange={(page) => changePage(page)}
				/>
			</div>

			<Wave
				className="absolute bottom-0.5 left-0 right-0 -z-[1] h-20 lg:h-40 translate-y-1 "
				fill="#4096ff"
				paused={false}
				options={{
					amplitude: 20,
					speed: 0.2,
					points: 3,
				}}
			/>
		</div>
	);
};

export default Order;
