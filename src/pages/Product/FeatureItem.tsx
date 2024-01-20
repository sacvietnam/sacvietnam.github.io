import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedText from "../../components/AnimatedText";
import { FeatureObject } from "../../util/type";
import useLang from "../../hooks/useLang";

type FeatureItemProps = {
	item: FeatureObject;
	className?: string;
	show?: boolean;
};

const FeatureItem = ({ item, className, show }: FeatureItemProps) => {
	const { getContentCurrentLang } = useLang();
	const [flip, setFlip] = useState<boolean>(false);

	const toggleFlip = () => {
		setFlip(!flip);
	};

	return (
		<motion.div
			className={className}
			onClick={show ? undefined : toggleFlip}
			key={item.name.en}
			initial={{ rotateY: 90 }}
			animate={{ rotateY: 0 }}
		>
			<motion.div
				whileTap={{ rotateY: show ? 0 : flip ? 90 : -90, scale: 0.9 }}
				className="flex flex-col items-center h-full p-2 text-center border rounded-lg shadow-md cursor-pointer select-none justify-evenly"
			>
				{show || flip ? (
					<>
						<div className="flex items-center gap-2 px-2 text-xs font-semibold md:gap-2 md:text-xl text-primary">
							<div className="-translate-y-0.5">
								<item.Icon />
							</div>
							<AnimatedText text={getContentCurrentLang(item.name)} />
						</div>
						<motion.span
							initial={{ scale: 0.4 }}
							animate={{ scale: 1 }}
							className="p-2 text-xs text-justify md:text-base text-secondary"
						>
							{getContentCurrentLang(item.description)}
						</motion.span>
					</>
				) : (
					<>
						{<item.Icon className="text-4xl text-secondary" />}
						<h3 className="text-sm font-semibold md:text-xl">
							{getContentCurrentLang(item.name)}
						</h3>
					</>
				)}
			</motion.div>
		</motion.div>
	);
};

export default FeatureItem;
