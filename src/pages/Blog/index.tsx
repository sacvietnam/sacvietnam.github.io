import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { IoMdEye } from "react-icons/io";
import { Link } from "react-router-dom";
import Wave from "react-wavify";
import CommingSoon from "../../assets/imgs/comingsoon-square.png";
import PaginationDataList from "../../components/PaginationDataList";
import { LangContext } from "../../contexts/LangContext";
import { getAllArticles, getArticleSize } from "../../services/articleService";

const pageSize = 10;

const Blog = () => {
  const { trans } = useContext(LangContext);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data: total } = useQuery({
    queryKey: ["articlesSize"],
    queryFn: getArticleSize,
  });

  const postRenderer = (post: IArticle) => {
    return (
      <Link to={`/blog/${post._id}`} key={post._id}>
        <motion.article
          className="grid grid-cols-6 gap-0 hover:shadow-md rounded-r-lg group max-h-[300px] mt-2"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="col-span-full md:col-span-2">
            <div className="overflow-hidden rounded-l-lg">
              <img
                src={post.image || CommingSoon}
                onError={(e) =>
                  ((e.target as HTMLImageElement).src = CommingSoon)
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
            <div className="flex gap-1">
              <IoMdEye />
              <p className="text-sm font-semibold">{post.view}</p>
            </div>
            <span className="font-semibold text-gray-600 text-md">
              {new Date(post.publishedAt).toLocaleDateString("vi-VN")}
            </span>
            <p className="text-sm italic">{post.description}</p>
          </div>
        </motion.article>
      </Link>
    );
  };

  return (
    <div className="relative">
      <div className="max-w-screen-lg min-h-screen px-2 mx-auto">
        <h1 className="mt-8 mb-8 text-2xl font-bold text-center font-display">
          {trans({ en: "SAC's journey", vi: "Hành trình của SAC" })}
        </h1>

        <PaginationDataList<IArticle>
          currentPage={currentPage}
          pageSize={pageSize}
          setPage={setCurrentPage}
          total={total || 0}
          className="flex flex-col gap-16 md:gap-4 "
          queryFn={getAllArticles}
          renderEach={postRenderer}
          queryKey="articles"
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
