import { useState } from "react";
import Each from "../../util/Each";
import AnimatedText from "../../components/AnimatedText";
import FeatureItem from "./FeatureItem";
import TCButton from "../../components/TCButton";

import { PiWindDuotone } from "react-icons/pi";
import { MdOutlineMonitorHeart, MdOutlineDesignServices } from "react-icons/md";
import { FaMobileAlt } from "react-icons/fa";
import { TbFocusAuto } from "react-icons/tb";
import { LuBatteryFull } from "react-icons/lu";
import { FeatureObject } from "../../util/type";
import useLang from "../../hooks/useLang";

const Features = () => {
	const [showAll, setShowAll] = useState<boolean>(false);
	const { getContentCurrentLang } = useLang();

	const toggleShowAll = () => {
		setShowAll(true);
	};

	return (
		<div className="max-w-screen-xl py-8 pb-20 mx-auto mt-20">
			<AnimatedText
				text={getContentCurrentLang({
					en: "Overview of Features",
					vi: "Tổng quan tính năng",
				})}
				className="text-2xl text-center lg:text-4xl font-display text-primary"
			/>

			<div className="flex flex-col items-center justify-center my-4">
				<TCButton
					label={getContentCurrentLang({ en: "Show All", vi: "Hiện hết" })}
					onPress={toggleShowAll}
				/>
				<p className="mt-2 text-center text-secondary">
					(
					{getContentCurrentLang({
						en: "Press on the features for more details",
						vi: "Chạm vào các thẻ để đọc chi tiết",
					})}
					)
				</p>
			</div>
			<div className="flex flex-wrap mt-8">
				<Each
					of={features}
					render={(item, index) => (
						<FeatureItem
							show={showAll}
							className="w-1/2 p-2 md:p-8 md:py-4 md:w-1/3 h-[200px]"
							item={item}
							key={index}
						/>
					)}
				/>
			</div>
		</div>
	);
};

export default Features;

const features: FeatureObject[] = [
	{
		name: "Body Cooling",
		description: {
			en: "With 3 different fan speeds, you won't have to worry about getting hot.",
			vi: "Với 3 chế độ quạt tùy chọn, bạn không phải lo về vấn đề nóng bức",
		},
		Icon: PiWindDuotone,
	},
	{
		name: "Body Temp & Humidity",
		description: {
			en: "Monitor the temperature and humidity inside your clothing to better protect yourself.",
			vi: "Theo dõi nhiệt độ và độ ẩm bên trong trang phục của bạn để bảo vệ bản thân tốt hơn",
		},
		Icon: MdOutlineMonitorHeart,
	},
	{
		name: "Smart Design",
		description: {
			en: "It can be disassembled & cleaned and can be paired with various types of clothing, suitable even for those who have to wear uniforms for work.",
			vi: "Dễ dàng tháo rời & vệ sinh và có thể sử dụng kèm với nhiều loại trang phục, cực kỳ phù hợp với những người phải mặc đồng phục để làm việc",
		},
		Icon: MdOutlineDesignServices,
	},
	{
		name: "Control via smartphone",
		description: {
			en: "Connect to the phone to monitor body status, device status, and customize the device through Bluetooth.",
			vi: "Kết nối với điện thoại thông minh để theo dõi trạng thái cơ thể, thiết bị và tùy chỉnh thiết bị ",
		},
		Icon: FaMobileAlt,
	},
	{
		name: "Auto-adjustment",
		description: {
			en: "Based on your body's condition, the device will provide settings tailored to your state.",
			vi: "Dựa trên trạng thái cơ thể, thiết bị sẽ cung cấp thiết lập phù hợp",
		},
		Icon: TbFocusAuto,
	},
	{
		name: "Long battery life",
		description: {
			en: "Long battery life allows you to work outdoors all day.",
			vi: "Với thường lượng pin dài giúp bạn làm việc ngoài trời cả ngày.",
		},
		Icon: LuBatteryFull,
	},
];
