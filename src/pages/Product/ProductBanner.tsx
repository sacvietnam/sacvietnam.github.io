import beltSrc from "../../assets/imgs/belt.png";
import Wave from "react-wavify";
import { motion } from "framer-motion";
import AnimatedText from "../../components/AnimatedText";

const ProductBanner = () => {
	return (
		<div className="bg-primary h-[150px] md:h-[300px] lg:h-[400px] relative flex items-center justify-center select-none mb-[50px] md:mb-[100px] lg:mb-[150px]	">
			<div className="absolute bottom-0 z-10 w-full -translate-x-1/2 translate-y-1/2 left-1/2">
				<div className="absolute z-0 w-full text-4xl text-center text-white -translate-y-full -top-1/4 text-nowrap text-whit font-display md:text-6xl lg:text-8xl">
					<AnimatedText text="Smart Aircon Belt" />
				</div>
				<motion.div
					initial={{ opacity: 0, rotateY: 90 }}
					animate={{ opacity: 1, rotateY: 0 }}
					transition={{ duration: 1 }}
				>
					<motion.img
						drag
						dragConstraints={{ bottom: 0, left: 0, right: 0, top: 0 }}
						whileTap={{ rotate: 6 }}
						src={beltSrc}
						alt="belt"
						className="relative z-10 w-full  max-w-[40%] mx-auto"
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
