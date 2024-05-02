import { Link } from "react-router-dom";
import { IArticle } from "../../models/DataModel";
import { useContext } from "react";
import { LangContext } from "../../contexts/LangContext";
import { motion } from "framer-motion";
import { Pagination } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getAllArticles, getArticleSize } from "../../services/articleService";
import Wave from "react-wavify";

const pageSize = 10;

const Blog = () => {
	const { trans } = useContext(LangContext);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const { data: articles, refetch } = useQuery({
		queryKey: ["articles"],
		queryFn: () => getAllArticles(pageSize, currentPage),
		select: (response) => response as IArticle[],
	});

	const { data: total } = useQuery({
		queryKey: ["articlesSize"],
		queryFn: getArticleSize,
	});

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
		<div className="relative">
			<div className="max-w-screen-lg min-h-screen mx-4 md:mx-auto">
				<h1 className="mt-8 text-2xl font-bold text-center">
					{trans({ en: "Blog", vi: "Bài viết" })}
				</h1>
				<div className="flex flex-col gap-10 mt-8">
					{articles &&
						articles.map((post) => (
							<Link to={`/blog/${post._id}`} key={post._id}>
								<motion.article
									className="grid grid-cols-6 gap-0   hover:shadow-md rounded-r-lg group max-h-[300px]"
									initial={{ opacity: 0, x: 100 }}
									whileInView={{ opacity: 1, x: 0 }}
									transition={{ duration: 0.5 }}
									viewport={{ once: true }}
								>
									<div className=" col-span-full md:col-span-2">
										<div className="overflow-hidden rounded-l-lg">
											<img
												src={post.image}
												onError={(e) =>
													((e.target as HTMLImageElement).src =
														"/placeholder_img.png")
												}
												className="group-hover:scale-110 duration-300 transition-all object-center object-cover select-none w-full h-full max-h-[200px] group-hover:brightness-90"
												alt={post.title}
											/>
										</div>
									</div>

									<div className="p-4 overflow-hidden bg-white border rounded-r-lg col-span-full md:col-span-4">
										<h3 className="text-xl font-semibold hoverable-text">
											{post.title}
										</h3>
										<span className="font-semibold text-gray-600 text-md">
											{new Date(post.publishedAt).toLocaleDateString("vi-VN")}
										</span>
										<p className="text-sm italic">{post.description}</p>
									</div>
								</motion.article>
							</Link>
						))}
				</div>
			</div>

			<div className="p-2 pb-8 mx-auto w-fit">
				<Pagination
					className="p-2 bg-white border rounded-md "
					total={total}
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

export default Blog;
