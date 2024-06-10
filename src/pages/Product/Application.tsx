import FeatureItem from "./FeatureItem";
import { useContext, useState } from "react";
import AnimatedText from "../../components/AnimatedText";
import PhoneMockup from "../../components/PhoneMockup";
import TCButton from "../../components/TCButton";
import { FeatureObject } from "../../util/type";

import { IoIosInformationCircleOutline } from "react-icons/io";
import { RiRemoteControlLine } from "react-icons/ri";
import { LiaBluetooth } from "react-icons/lia";
import { MdLineWeight } from "react-icons/md";
import { LangContext } from "../../contexts/LangContext";

const Application = () => {
  const [showAll, setShowAll] = useState<boolean>(false);
  const { trans } = useContext(LangContext);

  const firstBlockFetures = [appFeatures[0], appFeatures[1]];
  const secondBlockFetures = [appFeatures[2], appFeatures[3]];

  const toggleShowAll = () => {
    setShowAll(true);
  };

  return (
    <div className="max-w-screen-xl p-2 pb-8 mx-auto">
      <AnimatedText
        text={trans({
          en: "Overview of Application",
          vi: "Tổng quan ứng dụng",
        })}
        className="text-2xl text-center lg:text-4xl font-display text-primary"
      />
      <div className="grid grid-cols-1 gap-0 mt-8 lg:gap-12 lg:grid-cols-3 place-items-center">
        <div className="flex flex-col justify-around order-2 w-full h-full">
          {firstBlockFetures.map((item, index) => (
            <div className="w-full p-2 lg:p-8" key={index}>
              <FeatureItem
                show={showAll}
                className="w-full h-[150px] md:h-[200px]"
                item={item}
              />
            </div>
          ))}
        </div>
        <div className="order-1 lg:order-2 h-fit">
          <div className="flex justify-center my-8 mt-16">
            {!showAll && (
              <TCButton
                label={trans({
                  en: "Show All",
                  vi: "Hiện hết",
                })}
                onPress={toggleShowAll}
              />
            )}
          </div>
          <PhoneMockup />
        </div>
        <div className="flex flex-col justify-around order-3 w-full h-full">
          {secondBlockFetures.map((item, index) => (
            <div className="w-full p-2 lg:p-8" key={index}>
              <FeatureItem
                show={showAll}
                className="w-full h-[150px] md:h-[200px]"
                item={item}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Application;

const appFeatures: FeatureObject[] = [
  {
    name: {
      en: "Monitor Status",
      vi: "Theo dõi trạng thái",
    },
    description: {
      en: "Directly monitor the device status: battery level, device power source, temperature, and humidity from the device's sensors.",
      vi: "Theo dõi trực tiếp trạng thái thiết bị: lượng pin, nguồn, nhiệt độ và độ ẩm từ cảm biến thiết bị.",
    },
    Icon: IoIosInformationCircleOutline,
  },
  {
    name: {
      en: "Device control",
      vi: "Điều khiển thiết bị",
    },
    description: {
      en: "Power on/off the device, adjust fan speed, set up other automatic on/off features.",
      vi: "Bật/tắt nguồn thiết bị, thay đổi tốc độ quạt, thiết lập các tính năng tự động.",
    },
    Icon: RiRemoteControlLine,
  },
  {
    name: {
      en: "Offline operation",
      vi: "Không cần kết nối mạng",
    },
    description: {
      en: "Utilizing BLE (Bluetooth Low Energy) helps save battery power.",
      vi: "Ứng dụng BLE (Bluetooth Low Energy) để tiết kiệm năng lượng.",
    },
    Icon: LiaBluetooth,
  },
  {
    name: {
      en: "Lightweight",
      vi: "Nhỏ gọn",
    },
    description: {
      en: "The app takes up very little storage space on your phone.",
      vi: "Dung lượng gọn nhẹ, không chiếm nhiều dung lượng điện thoại của bạn.",
    },
    Icon: MdLineWeight,
  },
];
