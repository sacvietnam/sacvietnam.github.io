import Wave from "react-wavify";
import Fan from "../../assets/svgs/fan.svg?react";
import AnimatedText from "../AnimatedText";
import { motion } from "framer-motion";

const Banner = () => {
	return (
		<div className="h-[400px] bg-primary relative flex items-end">
			<div className="absolute left-0 right-0 text-center text-white top-10 md:top-12">
				<div className="flex flex-col items-center justify-center gap-0 md:mt-4 md:flex-row md:gap-2">
					<AnimatedText
						text="Smart Aircon Clothing"
						className="mb-4 text-3xl tracking-wider md:text-5xl font-display drop-shadow-md"
					/>
					<motion.div
						drag
						dragConstraints={{ left: 0, right: 0, bottom: 0, top: 0 }}
						className="z-10 -translate-y-1 cursor-grab active:cursor-grabbing"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ ease: "easeOut", duration: 0.5, delay: 1 }}
					>
						<Fan
							className=" animate-spin drop-shadow-md"
							width={50}
							height={50}
						/>
					</motion.div>
				</div>
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ ease: "easeOut", duration: 0.5, delay: 1.4 }}
				>
					<p className="mt-4 text-xl md:text-2xl drop-shadow-md font-display2 md:mt-0">
						Make your cool move
					</p>
				</motion.div>
			</div>
			<div className="w-full translate-y-1">
				<Wave
					fill="#fff"
					paused={false}
					style={{ display: "flex" }}
					options={{
						height: 10,
						amplitude: 30,
						speed: 0.2,
						points: 3,
					}}
				/>
			</div>
		</div>
	);
};

export default Banner;
