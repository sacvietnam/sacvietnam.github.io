import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import beltSrc1 from "../../assets/imgs/product/belt.png";
import beltSrc2 from "../../assets/imgs/product/belt-top.png";
import beltSrc3 from "../../assets/imgs/product/belt-top-center.png";

const imgSrcs = [beltSrc1, beltSrc3, beltSrc2];

const ProductPreview = () => {
	const [index, setIndex] = useState(0);

	const onPress = () => {
		setIndex((prev) => {
			return prev >= imgSrcs.length - 1 ? 0 : prev + 1;
		});
	};

	return (
		<motion.div>
			<AnimatePresence>
				<motion.img
					drag
					dragConstraints={{ bottom: 0, left: 0, right: 0, top: 0 }}
					whileTap={{ rotate: 6 }}
					initial={{ rotate: 90, scale: 0.8, opacity: 0 }}
					animate={{ rotate: 0, scale: 1, opacity: 1 }}
					key={index}
					onClick={onPress}
					src={imgSrcs[index]}
					alt="belt"
					className="relative z-10 w-full max-h-[300px]  max-w-[60vw] mx-auto cursor-grab active:cursor-grabbing object-contain"
				/>
			</AnimatePresence>
		</motion.div>
	);
};

export default ProductPreview;
