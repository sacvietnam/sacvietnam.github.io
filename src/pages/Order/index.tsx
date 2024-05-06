import { useContext, useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { LangContext } from "../../contexts/LangContext";
import Wave from "react-wavify";
import { getAllProducts, getProductSize } from "../../services/productService";
import { useQuery } from "@tanstack/react-query";
import { IProduct } from "../../models/DataModel";
import { Empty, Pagination, Skeleton, Space } from "antd";

// quantity of products per page
const pageSize = 6;

const Order = () => {
	const { trans } = useContext(LangContext);
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
		<div className="relative min-h-lvh">
			<div className="max-w-screen-xl px-2 py-4 mx-auto mt-8">
				<h1 className="mb-2 text-2xl font-bold">
					{lang.trans({
						vi: "Danh sách sản phẩm hiện có",
						en: "Product list available",
					})}
				</h1>

				{totalProducts === 0 && (
					<div className="grid w-full mx-auto my-16 place-items-center">
						<Empty
							className="p-4 bg-white border rounded-md"
							description={trans({
								en: "Currently, our product is not available for sale. Please come back later.",
								vi: "Hiện tại, chúng tôi chưa mở bán sản phẩm nào",
							})}
						/>
					</div>
				)}
				<div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
					{isPending && (
						<>
							<Space className="flex flex-col">
								<Skeleton.Image style={{ width: "200px", height: "200px" }} />
								<Skeleton.Input />
								<Skeleton.Input />
							</Space>
							<Space className="flex flex-col">
								<Skeleton.Image style={{ width: "200px", height: "200px" }} />
								<Skeleton.Input />
								<Skeleton.Input />
							</Space>
							<Space className="flex flex-col">
								<Skeleton.Image style={{ width: "200px", height: "200px" }} />
								<Skeleton.Input />
								<Skeleton.Input />
							</Space>
							<Space className="flex flex-col">
								<Skeleton.Image style={{ width: "200px", height: "200px" }} />
								<Skeleton.Input />
								<Skeleton.Input />
							</Space>
						</>
					)}

					{products &&
						(products as IProduct[]).map((product) => (
							<ProductItem key={product._id} product={product} />
						))}
				</div>
			</div>
			{totalProducts && (
				<div className="p-2 pb-8 mx-auto w-fit">
					<Pagination
						className="p-2 bg-white border rounded-md "
						total={totalProducts}
						defaultCurrent={1}
						defaultPageSize={pageSize}
						onChange={(page) => changePage(page)}
					/>
				</div>
			)}

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
