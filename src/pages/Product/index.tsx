import Application from "./Application";
import Features from "./Features";
import ProductBanner from "./ProductBanner";
import { motion } from "framer-motion";

const Product = () => {
	return (
		<>
			<ProductBanner />
			<div className="max-w-screen-xl mx-auto">
				<motion.div>
					<div className="flex justify-center gap-2 text-2xl text-center md:text-3xl lg:text-4xl font-display2 text-primary">
						<motion.span
							className="inline-block"
							initial={{ opacity: 0, x: 80 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8, delay: 0.8 }}
						>
							Make
						</motion.span>
						<motion.span
							className="inline-block"
							initial={{ opacity: 0, x: 100 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 1, delay: 0.5 }}
						>
							your
						</motion.span>
						<motion.span
							className="inline-block"
							initial={{ opacity: 0, x: -100 }}
							animate={{ opacity: 1, x: 4 }}
							transition={{ duration: 1, delay: 0.5 }}
						>
							cool
						</motion.span>
						<motion.span
							className="inline-block"
							initial={{ opacity: 0, x: -80 }}
							animate={{ opacity: 1, x: 4 }}
							transition={{ duration: 0.8, delay: 0.8 }}
						>
							move
						</motion.span>
					</div>
				</motion.div>
			</div>

			<Features />

			<Application />

		</>
	);
};

export default Product;
