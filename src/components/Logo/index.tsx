import { Link } from "react-router-dom";
import sacLogoSrc from "../../assets/imgs/logo/saco.png";
import { useState } from "react";
import { motion } from "framer-motion";

const Logo = () => {
	// const [isShow, setShow] = useState<boolean>(false);
	return (
		<div className="flex items-center justify-between w-full md:w-fit">
			<Link
				className="flex items-center justify-between gap-4 select-none"
				to="/"
			>
				<img width={100} height={50} src={sacLogoSrc} alt="SAC logo" />
				{/* <div
					className="flex gap-2 text-xl font-semibold text-primary"
					onClick={() => setShow(!isShow)}
				>
					<span className="flex items-center gap-1/2">
						S
						{isShow && (
							<motion.div
								className="text-sm font-normal text-text"
								initial={{ x: -8, opacity: 0 }}
								animate={{
									x: 0,
									opacity: 1,
								}}
							>
								mart
							</motion.div>
						)}
					</span>
					<span className="flex items-center gap-1/2">
						A
						{isShow && (
							<motion.div
								className="text-sm font-normal text-text"
								initial={{ x: -8, opacity: 0 }}
								animate={{
									x: 0,
									opacity: 1,
								}}
							>
								irCon
							</motion.div>
						)}
					</span>
					<span className="flex items-center gap-1/2">
						C
						{isShow && (
							<motion.div
								className="text-sm font-normal text-text"
								initial={{ x: -8, opacity: 0 }}
								animate={{
									x: 0,
									opacity: 1,
								}}
							>
								lothing
							</motion.div>
						)}
					</span>
				</div> */}
			</Link>
		</div>
	);
};

export default Logo;
