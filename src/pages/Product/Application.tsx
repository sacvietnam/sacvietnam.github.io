import AnimatedText from "../../components/AnimatedText";
import PhoneMockup from "../../components/PhoneMockup";
import { FeatureObject } from "../../util/type";

import { IoIosInformationCircleOutline } from "react-icons/io";
import { RiRemoteControlLine } from "react-icons/ri";
import { LiaBluetooth } from "react-icons/lia";
import { MdLineWeight } from "react-icons/md";
import FeatureItem from "./FeatureItem";
import { useState } from "react";
import TCButton from "../../components/TCButton";

const Application = () => {
	const [showAll, setShowAll] = useState<boolean>(false);

	const firstBlockFetures = [appFeatures[0], appFeatures[1]];
	const secondBlockFetures = [appFeatures[2], appFeatures[3]];

	const toggleShowAll = () => {
		setShowAll(true);
	};

	return (
		<div className="max-w-screen-xl p-2 pb-8 mx-auto">
			<AnimatedText
				text="Overview of Application"
				className="text-3xl text-center lg:text-4xl font-display text-primary"
			/>
			<div className="grid grid-cols-1 gap-0 mt-8 lg:gap-12 lg:grid-cols-3 place-items-center">
				<div className="flex flex-col justify-around order-2 w-full h-full">
					{firstBlockFetures.map((item) => (
						<div className="w-full p-2 lg:p-8">
							<FeatureItem
								show={showAll}
								className="w-full h-[150px] md:h-[200px]"
								item={item}
							/>
						</div>
					))}
				</div>
				<div className="order-1 lg:order-2 h-fit">
					<PhoneMockup />
					<div className="flex justify-center my-4">
						<TCButton label={"Show All"} onPress={toggleShowAll} />
					</div>
				</div>
				<div className="flex flex-col justify-around order-3 w-full h-full">
					{secondBlockFetures.map((item) => (
						<div className="w-full p-2 lg:p-8">
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
		name: "Monitor Status",
		description:
			"Directly monitor the device status: battery level, device power source, temperature, and humidity from the device's sensors.",
		Icon: IoIosInformationCircleOutline,
	},
	{
		name: "Device control",
		description:
			"Power on/off the device, adjust fan speed, set up other automatic on/off features.",
		Icon: RiRemoteControlLine,
	},
	{
		name: "Offline operation",
		description:
			"Utilizing BLE (Bluetooth Low Energy) helps save battery power.",
		Icon: LiaBluetooth,
	},
	{
		name: "Lightweight",
		description: "The app takes up very little storage space on your phone.",
		Icon: MdLineWeight,
	},
];
