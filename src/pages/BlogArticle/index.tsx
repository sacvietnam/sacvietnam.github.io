import { useContext } from "react";
import { useParams } from "react-router-dom";
import { LangContext } from "../../contexts/LangContext";
import { useQuery } from "@tanstack/react-query";
import { IArticle } from "../../models/DataModel";
import { getArticleById } from "../../services/articleService";
import { Spin } from "antd";
import NotFoundBlock from "../../components/NotFoundBlock";
import HTMLParser from "../../util/format/HTMLParser";
declare global {
	interface Window {
		googleTranslateElementInit: () => void;
	}
}
const BlogArticle = () => {
	const { id } = useParams<{ id: string }>();
	const { trans } = useContext(LangContext);

	const { data: article, isLoading } = useQuery({
		queryKey: ["article", "/id"],
		queryFn: () => getArticleById(id as string),
		select: (response) => response as IArticle,
	});

	if (isLoading) {
		<div className="max-w-screen-xl min-h-screen px-2 py-4 mx-auto mt-8">
			<h1>{trans({ en: "Loading...", vi: "Đang tải..." })}</h1>
			<Spin />
		</div>;
	}

	if (!article) {
		return <NotFoundBlock />;
	}
	return (
		<div className="mb-16">
			<article
				className="max-w-screen-lg pb-16 mx-auto mt-8 mb-16"
				id="google_translate_element"
			>
				{/* Heading */}
				<div>
					<h1 className="text-2xl font-bold text-center">{article.title}</h1>
					<p className="font-semibold text-center">
						{new Date(article.publishedAt).toLocaleString("vi-VN")}
					</p>
					<p className="mx-8 text-sm italic text-center">
						"{article.description}"
					</p>
					{/* img */}
					<img
						className="object-cover w-full h-full max-w-[800px] max-h-[400px] mx-auto my-6"
						src={article.image}
						onError={(e) => {
							e.currentTarget.src = "https://via.placeholder.com/800x400";
						}}
						alt={article.title}
					/>
				</div>

				{/* Body */}
				<div>{HTMLParser.parse(article.content)}</div>
			</article>
		</div>
	);
};

export default BlogArticle;
