import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LangContext } from "../../contexts/LangContext";
import { useQuery } from "@tanstack/react-query";
import { getArticleById, increaseView } from "../../services/articleService";
import { Spin } from "antd";
import NotFoundBlock from "../../components/NotFoundBlock";
import { IoMdEye } from "react-icons/io";
import HTMLParser from "../../util/format/HTMLParser";

const BlogArticle = () => {
  const { id } = useParams<{ id: string }>();
  const { trans } = useContext(LangContext);

  const { data: article, isLoading } = useQuery({
    queryKey: ["article", "/id"],
    queryFn: () => getArticleById(id as string),
    select: (response) => response as IArticle,
  });

  useEffect(() => {
    let timer: number;
    if (article) {
      timer = setTimeout(() => {
        increaseView(article._id);
      }, 10000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [article]);

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
      <article className="max-w-screen-lg px-4 pb-16 mx-auto mt-8 mb-16">
        {/* Heading */}
        <div>
          <h1 className="text-2xl font-bold text-center">{article.title}</h1>
          <div className="flex gap-1 mx-auto w-fit">
            <IoMdEye />
            <p className="text-sm italic">
              {article.view} {trans({ en: " views", vi: " lượt xem" })}
            </p>
          </div>
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
