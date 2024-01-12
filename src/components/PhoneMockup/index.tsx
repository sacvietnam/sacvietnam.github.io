import styled from "styled-components";
import { useState } from "react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

import phone from "./phone.png";
import appImgs from "../../assets/imgs/appImgs";
import { AnimatePresence, motion } from "framer-motion";

const Device = styled.div`
	background-image: url(${phone});
	background-repeat: no-repeat;
	background-size: contain;
	aspect-ratio: 6/12;
	max-width: 300px;
	min-width: 200px;
	height: fit-content;
	padding-block: 24px;
	padding-inline: 16px;
	position: relative;
	user-select: none;
`;

const InnerDevice = styled.div`
	position: absolute;
	z-index: -1;
	inset: 0;
	padding: 8px;
	padding-top: 12px;
	padding-right: 16px;
	border-radius: 60px;
	overflow: hidden;
`;

const RoundButton = styled(motion.button)`
	position: absolute;
	border-radius: 50%;
	padding: 8px;
	top: 50%;
	color: gray;
	border-width: 1px;
`;

const PhoneMockup = () => {
	const [index, setIndex] = useState<number>(0);

	const imgSrc = appImgs[index];

	const prev = () => {
		setIndex((prevIndex) => (prevIndex > 0 ? index - 1 : appImgs.length - 1));
	};
	const next = () => {
		setIndex((prevIndex) => (prevIndex < appImgs.length - 1 ? index + 1 : 0));
	};

	return (
		<Device className="w-[200px] lg:w-[300px]">
			<InnerDevice>
				<AnimatePresence>
					<motion.img
						key={index}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						src={imgSrc}
						className="w-full h-full border"
					/>
				</AnimatePresence>
			</InnerDevice>
			<div>
				<RoundButton
					onClick={prev}
					className="shadow-md -left-9"
					whileTap={{ scale: 0.9 }}
					initial={{ y: "-50%" }}
				>
					<FaCaretLeft />
				</RoundButton>
				<RoundButton
					onClick={next}
					className="shadow-md -right-8"
					whileTap={{ scale: 0.8 }}
					initial={{ y: "-50%" }}
				>
					<FaCaretRight />
				</RoundButton>
			</div>
		</Device>
	);
};

export default PhoneMockup;
