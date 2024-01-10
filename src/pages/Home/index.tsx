import Banner from "../../components/Banner";
import TCButton from "../../components/TCButton";
import { useNavigate } from "react-router-dom";
import ExploreSVG from "./explore.svg?react";

const Home = () => {
	const navigate = useNavigate();

	const naviToStory = () => {
		navigate("/story");
	};
	const naviToProduct = () => {
		navigate("/product");
	};

	return (
		<div className="pb-20">
			<Banner />
			<div className="max-w-screen-xl px-2 mx-auto">
				<div className="flex flex-col">
					<div className="text-center max-w-[800px] min-h-[300px] mx-auto my-2">
						<h2 className="mb-4 text-4xl font-medium tracking-wide md:text-5xl font-display text-primary">
							Welcome to SAC
						</h2>
						<p className="max-w-[90%] md:max-w-[80%] mx-auto text-lg md:text-xl text-secondary ">
							We are designing a product that combines a fabric belt and a mini
							fan, called an air conditioner belt, with bluetooth (smartphone)
							connection.
						</p>
					</div>
				</div>
				<div className="flex flex-col items-center">
					<h2 className="mb-8 text-4xl text-primary font-display">
						explore information about:
					</h2>
					<div className="flex gap-4">
						<TCButton label="The Story" onPress={naviToStory} />
						<TCButton label="The Product" onPress={naviToProduct} />
					</div>
					<ExploreSVG width={300} height={250} />
				</div>
			</div>
		</div>
	);
};

export default Home;
