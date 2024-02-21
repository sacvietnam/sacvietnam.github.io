import Banner from "../../components/Banner";
import TCButton from "../../components/TCButton";
import { useNavigate } from "react-router-dom";
import useLang from "../../hooks/useLang";
import LanguageButton from "../../components/LanguageButton";

const Home = () => {
	const navigate = useNavigate();
	const lang = useLang();

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
						<h2 className="mt-2 mb-4 text-4xl leading-snug tracking-wide md:text-5xl font-display text-primary">
							{lang.getContentCurrentLang({
								en: "Welcome to SAC",
								vi: "Chào mừng bạn đến với SAC",
							})}
						</h2>
						<p className="max-w-[90%] md:max-w-[80%] mx-auto text-lg md:text-xl text-secondary mb-4">
							{lang.getContentCurrentLang({
								en: "We are designing a product that combines a fabric belt and a mini fan, called an air conditioner belt, with bluetooth (smartphone) connection.",
								vi: "Chúng tôi đang thiết kế một sản phẩm kết hợp đai vải và quạt mini gọi là đai điều hòa với nhiều tính năng, được điều khiển thông qua kết nối bluetooth (smartphone).",
							})}
						</p>

						<div className="my-2">
							<LanguageButton variant="normal" />
						</div>

						<div className="h-[400px] lg:h-[500px] max-h-[80vh] mt-16 border shadow-md rounded-lg overflow-hidden ">
							<iframe
								width="100%"
								height="100%"
								src="https://www.youtube-nocookie.com/embed/rIX9grP3Swk?si=ds9eq90OtEpQvFDl"
								title="SAC Story"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								allowFullScreen
							></iframe>
						</div>
					</div>
				</div>
				<div className="flex flex-col items-center mt-16">
					<h2 className="mb-8 text-2xl text-center text-primary font-display">
						{lang.getContentCurrentLang({
							en: "Explore information about:",
							vi: "Khám phá thông tin về:",
						})}
					</h2>
					<div className="flex gap-4">
						<TCButton
							label={lang.getContentCurrentLang({
								en: "The Story",
								vi: "Câu chuyện",
							})}
							onPress={naviToStory}
						/>
						<TCButton
							label={lang.getContentCurrentLang({
								en: "The Product",
								vi: "Sản phẩm",
							})}
							onPress={naviToProduct}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
