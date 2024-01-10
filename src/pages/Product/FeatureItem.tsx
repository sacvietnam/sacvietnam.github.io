import { useState } from "react";
import { FeatureObject } from "./Features";
import { motion } from "framer-motion";
import AnimatedText from "../../components/AnimatedText";

type FeatureItemProps = {
	item: FeatureObject;
};

const FeatureItem = ({ item }: FeatureItemProps) => {
	const [flip, setFlip] = useState<boolean>(false);

	const toggleFlip = () => {
		setFlip(!flip);
	};

	return (
		<motion.div
			className="w-1/2 p-2 md:p-8 md:py-4 md:w-1/3 h-[200px]"
			onClick={toggleFlip}
			key={item.name}
			initial={{ rotateY: 90 }}
			animate={{ rotateY: 0 }}
		>
			<motion.div
				whileTap={{ rotateY: flip ? 90 : -90, scale: 0.9 }}
				className="flex flex-col items-center h-full p-2 text-center border rounded-lg shadow-md cursor-pointer select-none justify-evenly"
			>
				{!flip ? (
					<>
						{<item.Icon className="text-4xl text-secondary" />}
						<h3 className="text-sm font-semibold md:text-xl">{item.name}</h3>
					</>
				) : (
					<>
						<AnimatedText
							text={item.name}
							className="text-sm font-semibold md:text-xl text-primary"
						/>
						<motion.span
							initial={{ scale: 0.4 }}
							animate={{ scale: 1 }}
							className="p-2 text-xs text-justify md:text-base text-secondary"
						>
							{item.description}
						</motion.span>
					</>
				)}
			</motion.div>
		</motion.div>
	);
};

export default FeatureItem;
