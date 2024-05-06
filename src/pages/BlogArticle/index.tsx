import { useContext } from "react";
import { useParams } from "react-router-dom";
import { LangContext } from "../../contexts/LangContext";
import { useQuery } from "@tanstack/react-query";
import { IArticle } from "../../models/DataModel";
import { getArticleById } from "../../services/articleService";
import { Spin } from "antd";
import NotFoundBlock from "../../components/NotFoundBlock";
import HTMLParser from "../../util/format/HTMLParser";
import { useMetaTags } from "react-metatags-hook";
declare global {
	interface Window {
		googleTranslateElementInit: () => void;
	}
}
const BlogArticle = () => {
	const { id } = useParams<{ id: string }>();
	const { language, trans } = useContext(LangContext);

	const { data: article, isLoading } = useQuery({
		queryKey: ["article", "/id"],
		queryFn: () => getArticleById(id as string),
		select: (response) => response as IArticle,
	});

	useMetaTags(
		{
			title: article?.title,
			description: article?.description,
			charset: "utf8",
			lang: language,
			metas: [
				{
					name: "keywords",
					content:
						"air cooling belt, smartairconclothing, sac, sacvietnam, iuh",
				},
				{ name: "robots", content: "index, follow" },
				{
					name: "url",
					content: `http://smartairconclothing.com/#/article/${id}`,
				},
				{ property: "fb:app_id", content: "1234567890" },
				{ "http-equiv": "Cache-Control", content: "no-cache" },
			],
			links: [
				{ rel: "canonical", href: "http://smartairconclothing.com" },
				{ rel: "icon", type: "image/ico", href: "/favicon.ico" },
				{
					rel: "apple-touch-icon",
					sizes: "72x72",
					type: "image/png",
					href: "/apple-72.png",
				},
			],
			openGraph: {
				title: "Page Title",
				image: article?.image,
				site_name: "My Site",
			},
			twitter: {
				card: "summary",
				creator: "@smartairconclothing",
				title: article?.title,
			},
		},
		[id, article]
	);

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
				className="max-w-screen-lg mx-auto mt-8"
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
