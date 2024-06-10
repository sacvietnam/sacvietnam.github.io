import Banner from "../../components/Banner";
import { useNavigate } from "react-router-dom";
import LanguageButton from "../../components/LanguageButton";
import { useContext } from "react";
import { LangContext } from "../../contexts/LangContext";
import { Button } from "antd";
import { motion } from "framer-motion";
import appImg from "../../assets/imgs/product/app_icon.png";

const Home = () => {
  const navigate = useNavigate();
  const { trans } = useContext(LangContext);

  const naviToStory = () => {
    navigate("/story");
  };
  const naviToProduct = () => {
    navigate("/product");
  };

  const naviToDownload = () => {
    navigate("/download");
  };
  return (
    <div className="pb-48">
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
            <p className="max-w-[90%] md:max-w-[80%] mx-auto text-md md:text-lg text-center mt-4 text-secondary mb-4 ">
              {trans({
                en: "We transform your everyday items into smart and convenient devices. With the SAC circuit, you can easily control everything with just your smartphone. Experience a modern and smarter life like never before with us.",
                vi: "Chúng tôi biến các vật dụng thường ngày của bạn trở nên thông minh và tiện ích hơn. Với mạch SAC, bạn có thể dễ dàng điều khiển mọi thiết bị chỉ bằng smartphone của mình. Trải nghiệm cuộc sống hiện đại và thông minh hơn bao giờ hết cùng chúng tôi.",
              })}
            </p>

            <div className="my-2 mt-12 ml-auto">
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
        <div className="flex flex-col items-center mt-32">
          <h2 className="mb-8 text-2xl text-center text-primary font-display">
            {trans({
              en: "Explore information about:",
              vi: "Khám phá thông tin về:",
            })}
          </h2>
          <div className="grid mt-12 place-items-center">
            <div className="flex gap-4">
              <motion.div
                initial={{
                  translateX: 8,
                  translateY: 0,
                }}
                whileInView={{
                  translateX: 0,
                  translateY: -12,
                }}
                transition={{ duration: 0.3, delay: 1, ease: "easeInOut" }}
              >
                <Button
                  size="middle"
                  type="default"
                  className=" text-md rounded-none rounded-l-full hover:border-4 w-[150px] h-[200px] text-wrap shadow-md transition-all hover:drop-shadow-xl  font-semibold hover:-translate-x-4 hover:-translate-y-4"
                  onClick={naviToStory}
                >
                  {trans({
                    en: "The Story",
                    vi: "Câu chuyện",
                  })}
                </Button>
              </motion.div>

              <motion.div
                initial={{
                  translateX: -8,
                  translateY: 0,
                }}
                whileInView={{
                  translateX: 0,
                  translateY: 12,
                }}
                transition={{ duration: 0.3, delay: 1, ease: "easeInOut" }}
              >
                <Button
                  size="middle"
                  type="default"
                  className="text-md w-[150px] rounded-none rounded-r-full hover:border-4 h-[200px] text-wrap shadow-md transition-all hover:drop-shadow-xl font-semibold hover:translate-x-4 hover:-translate-y-4"
                  onClick={naviToProduct}
                >
                  {trans({
                    en: "The Product",
                    vi: "Sản phẩm",
                  })}
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 mt-32">
        <h2 className="mb-8 text-2xl text-center text-primary font-display">
          {trans({
            en: "Download application:",
            vi: "Tải xuống ứng dụng:",
          })}
        </h2>
        <div className="grid grid-cols-1 gap-2 mt-8 md:gap-0 md:grid-cols-2 place-items-center">
          <img
            src={appImg}
            width={100}
            height={100}
            className="rounded-md cursor-pointer"
            onClick={naviToDownload}
          />
          <div className="flex flex-col items-start justify-start gap-2">
            <p className="w-[200px] text-sm italic text-gray-400">
              {trans({
                en: "Download the application to experience the features of the product",
                vi: "Tải ứng dụng để trải nghiệm các tính năng của sản phẩm",
              })}
            </p>
            <Button
              onClick={naviToDownload}
              type="dashed"
              className="w-full h-full"
            >
              {trans({
                en: "Go to download page",
                vi: "Đến trang tải xuống",
              })}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
