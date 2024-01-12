import AnimatedText from "../../components/AnimatedText";
import Member from "./Member";

import img1 from "../../assets/imgs/team/thu.png";
import img2 from "../../assets/imgs/team/thien.png";
import img3 from "../../assets/imgs/team/doan.png";
import img4 from "../../assets/imgs/team/canh.png";
import img5 from "../../assets/imgs/team/huyen.png";
import img6 from "../../assets/imgs/team/nguyen.png";
import img7 from "../../assets/imgs/team/thao.png";
import img8 from "../../assets/imgs/team/thKien.png";
import Each from "../../util/Each";

const About = () => {
	return (
		<div>
			<div className="max-w-screen-xl px-2 py-8 mx-auto">
				<div>
					<h2 className="mb-8 text-4xl text-center text-primary font-display">
						<AnimatedText text="OUR MEMBERS" />
					</h2>

					<div className="flex flex-wrap justify-center">
						<Each
							of={informations}
							render={(current, index) => (
								<Member index={index} member={current} popover key={index} />
							)}
						/>
					</div>
				</div>
				<div className="flex flex-col items-center justify-center mt-20">
					<h2 className="mb-8 text-4xl text-center text-primary font-display">
						<AnimatedText text="MENTOR" />
					</h2>
					<Member index={0} member={mentor} popover={false} />
				</div>
			</div>
		</div>
	);
};

export default About;

export type MemberInformation = {
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
		color: "#ecbdc7",
		name: "Trần Thị Minh Thư",
		major: "English Language",
		interest:
			"Smart technology products serving the community and having the potential to serve the market",
		reasons:
			"Want to challenge oneself with a major competition and contribute to creating valuable products for society",
	},
	{
		img: img2,
		color: "#2196F3",
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
	major: "Faculty of Electronics Technology",
};
