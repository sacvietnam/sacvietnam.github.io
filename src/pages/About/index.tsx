import AnimatedText from "../../components/AnimatedText";
import Member from "./Member";

import img1 from "../../assets/imgs/team/thu.png";
import img2 from "../../assets/imgs/team/thien.png";
import img3 from "../../assets/imgs/team/doan.png";
import img4 from "../../assets/imgs/team/canh.png";
import img5 from "../../assets/imgs/team/huyen.png";
import img6 from "../../assets/imgs/team/nguyen.png";
import img7 from "../../assets/imgs/team/thao.png";
import img8 from "../../assets/imgs/team/TTinh.png";
import Each from "../../util/Each";
import { useContext } from "react";
import { LangContext, MultilangContent } from "../../contexts/LangContext";

const About = () => {
  const { trans } = useContext(LangContext);
  return (
    <div className="pb-48">
      <div className="max-w-screen-xl px-2 py-8 mx-auto">
        <div>
          <h2 className="text-4xl text-center mb-14 text-primary font-display">
            <AnimatedText
              text={trans({
                en: "OUR TEAM",
                vi: "ĐỘI NGŨ CỦA CHÚNG TÔI",
              })}
            />
          </h2>

          <div className="flex flex-wrap justify-center">
            <Each
              of={informations}
              render={(current, index) => (
                <Member index={index} member={current} popover key={index} />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

export type MemberInformation = {
  name: string;
  major?: MultilangContent;
  interest?: MultilangContent;
  reasons?: MultilangContent;
  img: string;
  color: string;
};

const informations: MemberInformation[] = [
  {
    img: img1,
    color: "#ecbdc7",
    name: "Trần Thị Minh Thư",
    major: { en: "English Language", vi: "Ngôn ngữ Anh" },
    interest: {
      en: "Smart technology products serving the community and having the potential to serve the market.",
      vi: "Các sản phẩm công nghệ thông minh phục vụ cộng đồng và có tiềm năng phục vụ thị trường.",
    },
    reasons: {
      en: "Want to challenge oneself with a major competition and contribute to creating valuable products for society.",
      vi: "Muốn thử sức với một cuộc thi lớn và góp phần tạo ra sản phẩm giá trị cho xã hội.",
    },
  },
  {
    img: img2,
    color: "#2196F3",
    name: "Lê Chí Thiện",
    major: {
      en: "IoT and Applied Artificial Intelligence",
      vi: "IOT và trí tuệ nhân tạo ứng dụng",
    },
    interest: {
      en: "Smart technology products serving the community and having the potential to serve the market.",
      vi: "Các sản phẩm công nghệ thông minh phục vụ cộng đồng và có tiềm năng phục vụ thị trường.",
    },

    reasons: {
      en: "Want to build products for the community's benefit, creating value for society.",
      vi: "Muốn xây dựng sản phẩm phục vụ lợi ích cộng đồng tạo ra giá trị cho xã hội.",
    },
  },
  {
    img: img3,
    color: "#FF9800",
    name: "Trần Xuân Đoan",
    major: { en: "International Business", vi: "Kinh doanh quốc tế" },
    interest: {
      en: "Smart technology products with the desire to serve the community and contribute to societal development.",
      vi: "Các sản phẩm công nghệ thông minh với mong muốn phục vụ cộng đồng và phát triển xã hội.",
    },
    reasons: {
      en: "Want to learn practical knowledge, research business fields to develop future enterprises.",
      vi: "Muốn học hỏi những kiến thức thực tế, muốn nghiên cứu về lĩnh vực kinh doanh để phát triển doanh nghiệp trong tương lai.",
    },
  },
  {
    img: img4,
    color: "#607D8B",
    name: "Nguyễn Thanh Cảnh",
    major: { en: "Software Engineering", vi: "Kỹ thuật phần mềm" },
    interest: {
      en: "Building software products, websites serving the community.",
      vi: "Xây dựng sản phẩm phần mềm, website phục vụ cộng đồng.",
    },
    reasons: {
      en: "Help friends turn their ideas into products while learning and improving personal skills.",
      vi: "Giúp biến ý tưởng của các bạn thành sản phẩm đồng thời nâng cao năng lực bản thân.",
    },
  },
  {
    img: img5,
    color: "#FFC107",
    name: "Nguyễn Minh Huyền",
    major: {
      en: "E-commerce",
      vi: "Thương mại điện tử",
    },
    interest: {
      en: "Smart products, devices addressing human life needs and maintaining sustainable nature.",
      vi: "Các sản phẩm, thiết bị thông minh giải quyết các nhu cầu trong đời sống con người và duy trì thiên nhiên bền vững.",
    },
    reasons: {
      en: "Want to learn and practice practical knowledge about product development in business, create products that protect people's health while working outdoors.",
      vi: "Muốn học hỏi và rèn luyện kiến thức thực tế về phát triển sản phẩm trong kinh doanh, có sản phẩm giúp bảo vệ sức khỏe người dân trong khi làm việc dưới trời nắng.",
    },
  },
  {
    img: img6,
    color: "#7E57C2",
    name: "Lê Thị Bình Nguyên",
    major: {
      en: "Marketing",
      vi: "Marketing",
    },
    interest: {
      en: "Products serving human life and health.",
      vi: "Các sản phẩm phục vụ đời sống và sức khoẻ của con người.",
    },
    reasons: {
      en: "Want to learn research and innovation experience to create community-serving products, gain hands-on experience to accumulate personal knowledge and experience.",
      vi: "muốn học hỏi kinh nghiệm nghiên cứu và sáng tạo sản phẩm phục vụ cộng đồng, được cọ sát bản thân với thực tế để tích lũy kinh nghiệm cho bản thân.",
    },
  },
  {
    img: img7,
    color: "#009688",
    name: "Lê Thị Thu Thảo",
    major: {
      en: "E-commerce",
      vi: "Thương mại điện tử",
    },
    interest: {
      en: "Technology products serving human life and health.",
      vi: "Sản phẩm công nghệ phục vụ các nhu cầu đời sống và sức khỏe con người.",
    },
    reasons: {
      en: "Want to experience projects to closely engage with reality and accumulate more knowledge and experience for the future.",
      vi: "Muốn trải nghiệm qua những dự án để được cọ sát với thực tế và tích lũy thêm nhiều kiến thức và kinh nghiệm cho bản thân sau này.",
    },
  },
  {
    img: img8,
    color: "#8bc472",
    name: "Nguyễn Tâm Tính",
    major: {
      en: "IoT and Applied Artificial Intelligence",
      vi: "IOT và trí tuệ nhân tạo ứng dụng",
    },
    interest: {
      en: "Electronic technology and IOT field",
      vi: "Công nghệ điện tử và lĩnh vực về IOT",
    },
    reasons: {
      en: "Want to experience and work with everyone.",
      vi: "Muốn trải nghiệm và làm việc cùng với mọi người.",
    },
  },
];
