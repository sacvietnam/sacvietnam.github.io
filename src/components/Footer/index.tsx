import Logo from "../Logo";
import logoTheShark from "../../assets/imgs/logo/thesharks.png";
import logoIUH from "../../assets/imgs/logo/iuh.png";
import { FaFacebook } from "react-icons/fa";
import { MdLocalPhone } from "react-icons/md";
import { HiMiniHome } from "react-icons/hi2";
import { HiMail } from "react-icons/hi";
import { IconType } from "react-icons";
import { useContext } from "react";
import { LangContext } from "../../contexts/LangContext";
import Wave from "react-wavify";

const ContactInfo = ({
  Icon,
  text,
  type,
}: {
  Icon: IconType;
  text: string;
  type: "tel" | "mail";
}) => {
  const title = type == "tel" ? "Hotline" : "Email";
  return (
    <div className="flex items-center gap-2 text-secondary group">
      <Icon className="transition-transform  min-w-5 -translate-y-0.5 group-hover:-rotate-12 group-hover:text-primary" />
      <h3 className="font-medium group-hover:text-primary">
        {title + ": "}
        <a
          className="transition-opacity text-primary hover:opacity-75 "
          href={`${type == "mail" ? "mailto" : "tel"}:${text}`}
        >
          {text}
        </a>
      </h3>
    </div>
  );
};

const Footer = () => {
  const { trans } = useContext(LangContext);

  return (
    <footer className="bg-white border-t text-text">
      <div className="grid max-w-screen-xl grid-cols-1 gap-4 p-2 py-4 mx-auto md:grid-cols-2">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <div className="items-center">
            <Logo />
          </div>
          <h3 className="font-semibold text-primary">THE SHARKS TEAM</h3>
          <p className="text-center">
            {trans({
              en: "Students of Industrial University of Ho Chi Minh City",
              vi: "Sinh viên Trường Đại học Công nghiệp Thành phố Hồ Chí Minh",
            })}
          </p>
          <div className="self-start">
            <div className="flex items-center gap-2 text-secondary group  max-w-[400px]">
              <HiMiniHome className="transition-transform min-w-5 -translate-y-0.5 group-hover:-rotate-12 group-hover:text-primary" />
              <h3 className="font-medium">
                {trans({ en: "Address: ", vi: "Địa chỉ:" })}
                <a
                  target="_blank"
                  className="transition-opacity text-primary hover:opacity-75"
                  href="https://maps.app.goo.gl/KHdGvGRkz3PPztaU7"
                >
                  {trans({
                    en: "Building V7, Room 02 - Programing Lab, 12 Nguyen Van Bao, Ward 4, Go Vap District, Ho Chi Minh City, VietNam",
                    vi: "Tòa V, Phòng 7.2, Số 12 Nguyễn Văn Bảo, Phường 4, Quận Gò Vấp, Thành phố Hồ Chí Minh",
                  })}
                </a>
              </h3>
            </div>
            <ContactInfo Icon={MdLocalPhone} text="0886389890" type="tel" />
            <ContactInfo
              Icon={HiMail}
              text="sac.vietnam219@gmail.com"
              type="mail"
            />
          </div>
          <div className="flex gap-4">
            <a href="https://iuh.edu.vn/">
              <img
                className="object-contain w-[60px] h-[60px]"
                src={logoIUH}
                alt="logo-iuh"
              />
            </a>
            <img
              className="object-contain w-[60px] h-[60px]"
              src={logoTheShark}
              alt="logo-the-sharks"
            />
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 md:items-end">
          <h3 className="font-semibold">
            {trans({ en: "Social Media", vi: "Mạng xã hội" })}
          </h3>
          <div className="flex gap-4">
            <a href="https://www.facebook.com/profile.php?id=61555656479452">
              <FaFacebook className="w-10 h-10 text-primary" />
            </a>
          </div>
        </div>
      </div>
      <div className="relative h-8 text-center text-white p-1/2">
        <span className="relative z-10">2024 The Sharks Team</span>
        <Wave
          className="absolute bottom-0 left-0 right-0 h-[64px] -z-[10]translate-y-4 "
          fill="#4096ff"
          paused={false}
          options={{
            amplitude: 10,
            speed: 0.2,
            points: 3,
          }}
        />
      </div>
    </footer>
  );
};

export default Footer;
