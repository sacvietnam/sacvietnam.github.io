import ConceptBlock from "../../components/TitleBlock";
import { FaArrowDownLong } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FloatInViewContent from "../../components/FloatInViewContent";
import TitleNSub from "../../components/TitleNSub.tsx";
import TCButton from "../../components/TCButton/index.tsx";
import ProductPreview from "../../components/ProductPreview/index.tsx";

import StudentsSVG from "./resources/students.svg?react";
import hotImg from "./resources/hot.jpg";
import driverImg from "./resources/driver.jpeg";
import beImg from "./resources/be.jpg";
import gojekImg from "./resources/gojek.jpg";
import grabImg from "./resources/grab.jpg";
import { useContext } from "react";
import { LangContext } from "../../contexts/LangContext.tsx";

const Story = () => {
  const navigate = useNavigate();
  const naviToProduct = () => {
    navigate("/product");
  };

  const { trans } = useContext(LangContext);

  return (
    <div className="py-20 overflow-hidden">
      <div className="max-w-screen-xl px-2 mx-auto">
        <div className="flex flex-col gap-20 min-h-svh">
          <ConceptBlock
            title={trans({
              en: "Let us tell you a story",
              vi: "Để chúng tôi kể cho bạn 1 câu chuyện",
            })}
            description={trans({
              en: "The story that created this product",
              vi: "Câu chuyện đã tạo nên sản phẩm này",
            })}
          />
          <motion.div
            className="flex flex-col items-center gap-8 mx-auto text-secondary"
            initial={{ opacity: 0, y: 100 }}
            transition={{ duration: 1, delay: 1 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <FaArrowDownLong className="text-5xl animate-floatVertical" />
            <motion.h4 className="text-xl">
              {trans({
                en: "Scroll down to explore",
                vi: "Cuộn xuống để khám phá",
              })}
              .
            </motion.h4>
          </motion.div>
        </div>

        <div className="flex flex-col gap-60">
          <FloatInViewContent
            firstContent={
              <TitleNSub
                title={trans({
                  en: "We are students of Industry University of Ho Chi Minh City, Vietnam.",
                  vi: "Chúng tôi là sinh viên Trường Đại học Công nghiệp Thành phố Hồ Chí Minh (IUH)",
                })}
                sub={trans({
                  en: "Sophomore and junior students from various majors.",
                  vi: "Sinh viên năm 2, năm 3 thuộc nhiều ngành khác nhau",
                })}
              />
            }
            secondContent={<StudentsSVG className="max-w-[100%] w-[400px]" />}
          />
          <FloatInViewContent
            firstContent={
              <img src={hotImg} className="max-w-[100%] w-[400px]" />
            }
            secondContent={
              <TitleNSub
                title={trans({
                  en: "We have noticed that,",
                  vi: "Chúng tôi nhận ra rằng,",
                })}
                sub={trans({
                  en: "With the year-round prolonged hot temperatures, the rate of workers affected by high temperatures is increasing in major cities.",
                  vi: "Với nhiệt độ nắng nóng kéo dài quanh năm, tỉ lệ người lao động bị ảnh hưởng bởi nhiệt độ cao ngày càng tăng ở các thành phố lớn.",
                })}
              />
            }
          />
          <FloatInViewContent
            firstContent={
              <TitleNSub
                title={trans({
                  en: "But outside that harsh weather...",
                  vi: "Nhưng bên ngoài thời tiết khắc nghiệt ấy...",
                })}
                sub={trans({
                  en: "Despite the adverse effects of hot weather on health, a significant number of workers still have to continue performing outdoor tasks.",
                  vi: "Bất chấp tác động khắc nghiệt của thời tiết nóng đến sức khỏe, một số lượng đáng kể người lao động vẫn phải tiếp tục thực hiện công việc ngoài trời.",
                })}
              />
            }
            secondContent={
              <img
                src={driverImg}
                className="max-w-[100%] w-[400px] rounded-md"
              />
            }
          />

          <FloatInViewContent
            direction="vertical"
            firstContent={
              <TitleNSub
                title={trans({
                  en: "The Tech Drivers",
                  vi: "Những tài xế công nghệ",
                })}
                sub={trans({
                  en: "Every day, they have to work outdoors under that sunlight for 8 to 12 hours, and sometimes even more.",
                  vi: "Mỗi ngày, họ phải làm việc ngoài trời dưới ánh nắng đó từ 8 đến 12 tiếng, và đôi khi cả hơn thế.",
                })}
              />
            }
            secondContent={
              <>
                <motion.img
                  whileInView={{ opacity: 1, x: 32, y: 16 }}
                  viewport={{ once: true }}
                  src={beImg}
                  className="object-cover w-1/3 translate-x-8 translate-y-4 rounded-md drop-shadow-lg"
                />
                <motion.img
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  src={grabImg}
                  width={"33%"}
                  className="object-cover w-1/3  z-[1] rounded-md drop-shadow-lg"
                />
                <motion.img
                  whileInView={{ opacity: 1, x: -32, y: 16 }}
                  viewport={{ once: true }}
                  src={gojekImg}
                  width={"33%"}
                  className="object-cover w-1/3 -translate-x-8 translate-y-4 rounded-md drop-shadow-lg"
                />
              </>
            }
          />

          <FloatInViewContent
            firstContent={
              <div className="py-8">
                <TitleNSub
                  title={trans({
                    en: "But what about their health?",
                    vi: "Nhưng còn sức khỏe của họ thì sao?",
                  })}
                  sub={trans({
                    en: "How can they continue their work in a cool state while still ensuring their health is minimally affected?",
                    vi: "Làm thế nào để họ tiếp tục công việc trong trạng thái mát mẻ mà vẫn đảm bảo sức khỏe không bị ảnh hưởng?",
                  })}
                />
              </div>
            }
            secondContent={<></>}
            direction="vertical"
          />

          <FloatInViewContent
            firstContent={
              <div className="md:max-w-[80%] mx-auto">
                <TitleNSub
                  title={trans({
                    en: "Resolve this problem",
                    vi: "Giải quyết vấn đề này",
                  })}
                  sub={trans({
                    en: "To address the above-mentioned issue, we have created a product: Smart Cooling Belt",
                    vi: "Để giải quyết vấn đề nói trên, chúng tôi đã tạo ra sản phẩm: Đai Điều Hòa Thông Minh",
                  })}
                />
              </div>
            }
            secondContent={
              <div>
                <ProductPreview />
              </div>
            }
            direction="vertical"
          />

          <div className="flex flex-col gap-4 mx-auto text-center">
            <h3 className="text-2xl">
              {trans({
                en: "Hope you have gained a better understanding of our idea. ",
                vi: "Hy vọng bạn đã hiểu hơn về ý tưởng của chúng tôi. ",
              })}
            </h3>
            <p className="text-lg text-secondary">
              {trans({
                en: "Continue exploring:",
                vi: "Tiếp tục khám phá:",
              })}
            </p>
            <TCButton
              label={trans({
                en: "The Product",
                vi: "Sản phẩm",
              })}
              onPress={naviToProduct}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;
