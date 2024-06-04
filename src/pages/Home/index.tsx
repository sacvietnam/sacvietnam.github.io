import Banner from "../../components/Banner";
import { useNavigate } from "react-router-dom";
import LanguageButton from "../../components/LanguageButton";
import { useContext } from "react";
import { LangContext } from "../../contexts/LangContext";
import { Button } from "antd";
import { MdOutlineHistoryEdu } from "react-icons/md";
import { PiFanFill } from "react-icons/pi";
import { MdArticle } from "react-icons/md";
import { FaCommentDots } from "react-icons/fa6";

const Home = () => {
  const navigate = useNavigate();
  const { trans } = useContext(LangContext);

  const naviToStory = () => {
    navigate("/story");
  };
  const naviToProduct = () => {
    navigate("/product");
  };
  const naviToBlog = () => {
    navigate("/blog");
  };
  const naviToOrder = () => {
    navigate("/order");
  };

  return (
    <div className="pb-20">
      <Banner />
      <div className="max-w-screen-xl px-2 mx-auto">
        <div className="flex flex-col">
          <div className="text-center max-w-[800px] min-h-[300px] mx-auto my-2">
            <h2 className="mt-2 mb-4 text-4xl leading-snug tracking-wide md:text-5xl font-display text-primary">
              {trans({
                en: "Welcome to SAC",
                vi: "Chào mừng bạn đến với SAC",
              })}
            </h2>
            <p className="max-w-[90%] md:max-w-[80%] mx-auto text-lg md:text-xl text-secondary mb-4">
              {trans({
                en: "We are designing a product that combines a fabric belt and a mini fan, called an air conditioner belt, with bluetooth (smartphone) connection.",
                vi: "Chúng tôi đang thiết kế một sản phẩm kết hợp đai vải và quạt mini gọi là đai điều hòa với nhiều tính năng, được điều khiển thông qua kết nối bluetooth (smartphone).",
              })}
            </p>

            <div className="my-2">
              <LanguageButton variant="normal" />
            </div>

            <div className="h-[400px] lg:h-[500px] max-h-[80vh] mt-16 border shadow-md rounded-lg overflow-hidden ">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube-nocookie.com/embed/rIX9grP3Swk?si=ds9eq90OtEpQvFDl"
                title="SAC Story"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center mt-16">
          <h2 className="mb-8 text-2xl text-center text-primary font-display">
            {trans({
              en: "Explore information about:",
              vi: "Khám phá thông tin về:",
            })}
          </h2>
          <div className="grid place-items-center">
            <div className="flex gap-4">
              <Button
                size="middle"
                type="primary"
                className="text-md w-[150px] h-[100px] text-wrap shadow-md transition-all hover:shadow-lg font-semibold group"
                onClick={naviToStory}
              >
                <span className="group-hover:hidden">
                  {trans({
                    en: "The Story",
                    vi: "Câu chuyện",
                  })}
                </span>
                <div className="grid place-items-center">
                  <MdOutlineHistoryEdu className="hidden text-2xl group-hover:block" />
                </div>
              </Button>
              <Button
                size="middle"
                type="primary"
                className="text-md w-[150px] h-[100px] text-wrap shadow-md transition-all hover:shadow-lg font-semibold group"
                onClick={naviToProduct}
              >
                <span className="group-hover:hidden">
                  {trans({
                    en: "The Product",
                    vi: "Sản phẩm",
                  })}
                </span>
                <div className="grid place-items-center">
                  <PiFanFill className="hidden text-2xl group-hover:block" />
                </div>
              </Button>
            </div>
            <div className="flex gap-4 mt-4">
              <Button
                size="middle"
                type="primary"
                className="text-md w-[150px] h-[100px] text-wrap shadow-md transition-all hover:shadow-lg font-semibold group"
                onClick={naviToBlog}
              >
                <span className="group-hover:hidden">
                  {trans({
                    en: "Our Blog",
                    vi: "Blog của chúng tôi",
                  })}
                </span>
                <div className="grid place-items-center">
                  <MdArticle className="hidden text-2xl group-hover:block" />
                </div>
              </Button>
              <Button
                size="middle"
                type="primary"
                className="text-md w-[150px] h-[100px] text-wrap shadow-md transition-all hover:shadow-lg font-semibold group"
                onClick={naviToOrder}
              >
                <span className="group-hover:hidden">
                  {trans({
                    en: "Product Review",
                    vi: "Đánh giá sản phẩm",
                  })}
                </span>
                <div className="grid place-items-center">
                  <FaCommentDots className="hidden text-2xl group-hover:block" />
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
