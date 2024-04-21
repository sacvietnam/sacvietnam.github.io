import Wave from "react-wavify";
import AnimatedText from "../../components/AnimatedText";
import ProductPreview from "../../components/ProductPreview";
import { useContext } from "react";
import { LangContext } from "../../contexts/LangContext";

const ProductBanner = () => {
	const { trans } = useContext(LangContext);

	return (
		<div className="bg-primary h-[150px] md:h-[300px] lg:h-[400px] relative flex items-center justify-center select-none mb-[50px] md:mb-[100px] lg:mb-[150px]	">
			<div className="absolute top-0 bottom-0 z-10 w-full -translate-x-1/2 translate-y-1/2 left-1/2">
				<div className="absolute z-10 w-full text-3xl text-center text-white -translate-y-full -top-2 text-nowrap font-display md:text-6xl lg:text-7xl">
					<AnimatedText
						text={trans({
							en: "Smart Aircon Belt",
							vi: "Đai điều hòa TM",
						})}
					/>
				</div>
				<ProductPreview />
			</div>
			<Wave
				className="absolute bottom-0.5 left-0 right-0 z-[1] h-10 lg:h-20 translate-y-1"
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
