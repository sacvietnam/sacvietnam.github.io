import img1 from "../../assets/imgs/team/thu.png";
import img2 from "../../assets/imgs/team/thien.png";
import img3 from "../../assets/imgs/team/doan.png";
import img4 from "../../assets/imgs/team/canh.png";
import img5 from "../../assets/imgs/team/huyen.png";
import img6 from "../../assets/imgs/team/nguyen.png";
import img7 from "../../assets/imgs/team/thao.png";
import img8 from "../../assets/imgs/team/thKien.png";
import AnimatedText from "../../components/AnimatedText";
import { motion } from "framer-motion";
import { Popover } from "antd";

const About = () => {
	return (
		<div>
			<div className="max-w-screen-xl px-2 py-8 mx-auto">
				<div>
					<h4 className="mb-8 text-4xl text-center text-primary font-display">
						<AnimatedText text="OUR MEMBER" />
					</h4>

					<div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5 place-content-center">
						{informations.map((current, index) => (
							<motion.div
								initial={{ opacity: 0, y: -16 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.25 * index }}
								key={current.name}
							>
								<Popover
									title={
										<h4 className="text-xl text-center">{current.name}</h4>
									}
									trigger="click"
									className="cursor-pointer"
									content={
										<div className="max-w-[400px]">
											<p>
												<span className="font-medium text-primary">
													Interest:
												</span>{" "}
												{current.interest}
											</p>
											<p>
												<span className="font-medium text-primary">
													Reasons for participation:
												</span>{" "}
												{current.reasons}
											</p>
										</div>
									}
								>
									<motion.div
										whileTap={{ scale: 0.9 }}
										className="relative h-[250px] md:h-[350px] rounded-md overflow-hidden group"
									>
										<img
											src={current.img}
											className="absolute top-0 bottom-0 right-0 block object-cover object-top w-full h-full select-none drop-shadow-2xl"
										/>
										<div
											className="top-[20%] transition-all absolute bottom-0 left-0 right-0 z-[-1] rounded-r-md rounded-l-md"
											style={{ backgroundColor: current.color }}
										></div>
									</motion.div>
								</Popover>
								<div className="mt-2 text-center">
									<h4 className="font-semibold text-md md:text-xl">
										{current.name}
									</h4>
									<p>{current.major}</p>
								</div>
							</motion.div>
						))}
					</div>
				</div>
				<div className="mt-20">
					<h4 className="mb-8 text-4xl text-center text-primary font-display">
						<AnimatedText text="MENTOR" />
					</h4>
					<motion.div
						initial={{ opacity: 0, y: -16 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
					>
						<motion.div className="flex flex-col items-center justify-center gap-4">
							<div className="relative w-[300px] lg:w-[25%] h-[350px] overflow-hidden rounded-md">
								<img
									src={mentor.img}
									className="absolute top-0 bottom-0 right-0 block object-cover object-top w-full h-full"
								/>
								<div
									className="top-[20%] absolute bottom-0 left-0 right-0 z-[-1] rounded-r-md rounded-l-md"
									style={{ backgroundColor: mentor.color }}
								></div>
							</div>
							<div className="mt-2 text-center">
								<h4 className="text-xl font-semibold">{mentor.name}</h4>
								<p>Faculty of Electronics Technology</p>
							</div>
						</motion.div>
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default About;

type MemberInformation = {
	name: string;
	major?: string;
	interest?: string;
	reasons?: string;
	img: string;
	color: string;
};
const informations: MemberInformation[] = [
	{
		img: img1,
		color: "#2196F3",
		name: "Trần Thị Minh Thư",
		major: "English Language",
		interest:
			"Smart technology products serving the community and having the potential to serve the market",
		reasons:
			"Want to challenge oneself with a major competition and contribute to creating valuable products for society",
	},
	{
		img: img2,
		color: "#3F51B5",
		name: "Lê Chí Thiện",
		major: "IoT and Applied Artificial Intelligence",
		interest:
			"Smart technology products serving the community and having the potential to serve the market",
		reasons:
			"Want to build products for the community's benefit, creating value for society",
	},
	{
		img: img3,
		color: "#FF9800",
		name: "Trần Xuân Đoan",
		major: "International Business",
		interest:
			"Smart technology products with the desire to serve the community and contribute to societal development",
		reasons:
			"Want to learn practical knowledge, research business fields to develop future enterprises",
	},
	{
		img: img4,
		color: "#607D8B",
		name: "Nguyễn Thanh Cảnh",
		major: "Software Engineering",
		interest: "Building software products, websites serving the community",
		reasons:
			"Help friends turn their ideas into products while learning and improving personal skills",
	},
	{
		img: img5,
		color: "#FFC107",
		name: "Nguyễn Minh Huyền",
		major: "E-commerce",
		interest:
			"Smart products, devices addressing human life needs and maintaining sustainable nature",
		reasons:
			"Want to learn and practice practical knowledge about product development in business, create products that protect people's health while working outdoors",
	},
	{
		img: img6,
		color: "#009688",
		name: "Lê Thị Bình Nguyên",
		major: "Marketing",
		interest: "Products serving human life and health",
		reasons:
			"Want to learn research and innovation experience to create community-serving products, gain hands-on experience to accumulate personal knowledge and experience",
	},
	{
		img: img7,
		color: "#F44336",
		name: "Lê Thị Thu Thảo",
		major: "E-commerce",
		interest: "Technology products serving human life and health",
		reasons:
			"Want to experience projects to closely engage with reality and accumulate more knowledge and experience for the future",
	},
];
const mentor: MemberInformation = {
	img: img8,
	color: "#4CAF50",
	name: "TS. Cao Văn Kiên",
};
