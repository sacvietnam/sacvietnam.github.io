import ConceptBlock from "../../components/TitleBlock";
import { FaArrowDownLong } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FloatInViewContent from "../../components/FloatInViewContent";
import TitleNSub from "../../components/TitleNSub.tsx";
import TCButton from "../../components/TCButton/index.tsx";
import StudentsSVG from "./resources/students.svg?react";
import hotImg from "./resources/hot.jpg";
import driverImg from "./resources/driver.jpeg";
import beImg from "./resources/be.jpg";
import gojekImg from "./resources/gojek.jpg";
import grabImg from "./resources/grab.jpg";
import beltImg from "../../assets/imgs/belt.png";

const Story = () => {
	const navigate = useNavigate();
	const naviToProduct = () => {
		navigate("/product");
	};
	return (
		<div className="py-20 overflow-hidden">
			<div className="max-w-screen-xl px-2 mx-auto">
				<div className="flex flex-col gap-20 min-h-svh">
					<ConceptBlock
						title="Let us tell you a story"
						description="The story that created this product"
					/>
					<motion.div
						className="flex flex-col items-center gap-8 mx-auto text-secondary"
						initial={{ opacity: 0, y: 100 }}
						transition={{ duration: 1, delay: 1 }}
						animate={{ opacity: 1, y: 0 }}
					>
						<FaArrowDownLong className="text-5xl animate-floatVertical" />
						<motion.h4 className="text-xl">Scroll down to explore.</motion.h4>
					</motion.div>
				</div>

				<div className="flex flex-col gap-60">
					<FloatInViewContent
						firstContent={
							<TitleNSub
								title="We are students of Industry University of Ho Chi Minh City, Vietnam."
								sub="Sophomore and junior students from various majors."
							/>
						}
						secondContent={<StudentsSVG className="max-w-[100%] w-[400px]" />}
					/>
					<FloatInViewContent
						firstContent={
							<img src={hotImg} className="max-w-[100%] w-[400px]" />
						}
						secondContent={
							<TitleNSub
								title="We have noticed that,"
								sub="With year-round hot temperatures, the incidence of heat-related illnesses also increases in major cities."
							/>
						}
					/>
					<FloatInViewContent
						firstContent={
							<TitleNSub
								title="But outside that harsh weather..."
								sub="Many people are still doing their jobs despite the scorching heat adversely affecting their health."
							/>
						}
						secondContent={
							<img
								src={driverImg}
								className="max-w-[100%] w-[400px] rounded-md"
							/>
						}
					/>

					<FloatInViewContent
						direction="vertical"
						firstContent={
							<TitleNSub
								title="Technology drivers"
								sub="Every day they work outdoors for 8 - 12 hours, even more."
							/>
						}
						secondContent={
							<>
								<motion.img
									whileInView={{ opacity: 1, x: 32, y: 16 }}
									viewport={{ once: true }}
									src={beImg}
									className="object-cover w-1/3 translate-x-8 translate-y-4 rounded-md drop-shadow-lg"
								/>
								<motion.img
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									src={grabImg}
									width={"33%"}
									className="object-cover w-1/3  z-[1] rounded-md drop-shadow-lg"
								/>
								<motion.img
									whileInView={{ opacity: 1, x: -32, y: 16 }}
									viewport={{ once: true }}
									src={gojekImg}
									width={"33%"}
									className="object-cover w-1/3 -translate-x-8 translate-y-4 rounded-md drop-shadow-lg"
								/>
							</>
						}
					/>

					<FloatInViewContent
						firstContent={
							<div className="py-8">
								<TitleNSub
									title="But what about their health?"
									sub="How can they continue their work in a cool state while still ensuring their health is minimally affected?"
								/>
							</div>
						}
						secondContent={<></>}
						direction="vertical"
					/>

					<FloatInViewContent
						firstContent={
							<div className="md:max-w-[80%] mx-auto">
								<TitleNSub
									title="Resolve this problem"
									sub="To address the above-mentioned issue, we have created a product: Smart Cooling Belt"
								/>
							</div>
						}
						secondContent={
							<div>
								<img src={beltImg} className="mx-auto max-w-[50%]" />
							</div>
						}
						direction="vertical"
					/>

					<div className="flex flex-col gap-4 mx-auto text-center">
						<h3 className="text-2xl">
							Hope you have gained a better understanding of our idea. ❤️
						</h3>
						<p className="text-lg text-secondary">Continue exploring:</p>
						<TCButton label="The Product" onPress={naviToProduct} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Story;
