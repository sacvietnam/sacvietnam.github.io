import beltSrc from "../../assets/imgs/belt.png";
import Wave from "react-wavify";
import { motion } from "framer-motion";
import AnimatedText from "../../components/AnimatedText";
import useLang from "../../hooks/useLang";

const ProductBanner = () => {
	const { getAnyCurrentLang } = useLang();

	return (
		<div className="bg-primary h-[150px] md:h-[300px] lg:h-[400px] relative flex items-center justify-center select-none mb-[50px] md:mb-[100px] lg:mb-[150px]	">
			<div className="absolute bottom-0 z-10 w-full -translate-x-1/2 translate-y-1/2 left-1/2">
				<div className="absolute z-0 w-full text-3xl text-center text-white -translate-y-full -top-1/4 text-nowrap text-whit font-display md:text-6xl lg:text-7xl">
					<AnimatedText
						text={getAnyCurrentLang({
							en: "Smart Aircon Belt",
							vi: "Đai điều hòa TM",
						})}
					/>
				</div>
				<motion.div
					initial={{ rotateY: 90, scale: 0.8 }}
					animate={{ rotateY: 0, scale: 1 }}
					transition={{ duration: 1 }}
				>
					<motion.img
						drag
						dragConstraints={{ bottom: 0, left: 0, right: 0, top: 0 }}
						whileTap={{ rotate: 6 }}
						src={beltSrc}
						alt="belt"
						className="relative z-10 w-full  max-w-[40%] mx-auto cursor-grab active:cursor-grabbing"
					/>
				</motion.div>
			</div>
			<Wave
				className="absolute -bottom-0 left-0 right-0 z-[1] h-10 lg:h-20 translate-y-1"
				fill="#fff"
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

export default ProductBanner;
