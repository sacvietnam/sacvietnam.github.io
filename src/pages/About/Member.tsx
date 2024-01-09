import { motion } from "framer-motion";
import { MemberInformation } from ".";
import { Popover } from "antd";

type MemberProps = {
	member: MemberInformation;
	index: number;
	popover: boolean;
};

const Member = ({ member, index, popover }: MemberProps) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: -16 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.25 * index }}
			viewport={{ once: true }}
			key={member.name}
			className="w-1/2 p-2 md:w-1/3 lg:w-1/5"
		>
			<Popover
				title={<h4 className="text-xl text-center">{member.name}</h4>}
				trigger="click"
				className="cursor-pointer"
				content={
					popover ? (
						<div className="max-w-[400px]">
							<p>
								<span className="font-semibold text-primary">Interest: </span>
								{member.interest}
							</p>
							<p>
								<span className="font-semibold text-primary">
									Reasons for participation:{" "}
								</span>
								{member.reasons}
							</p>
						</div>
					) : (
						<p>This member doesn't have detail information</p>
					)
				}
			>
				<motion.div
					whileTap={{ scale: 0.9, rotate: 4 }}
					className="relative h-[250px] w-full md:h-[350px] rounded-md overflow-hidden group"
				>
					<img
						src={member.img}
						className="absolute top-0 bottom-0 right-0 block object-cover object-top w-full h-full select-none drop-shadow-2xl"
					/>
					<div
						className="top-[20%] transition-all absolute bottom-0 left-0 right-0 z-[-1] rounded-r-md rounded-l-md"
						style={{ backgroundColor: member.color }}
					></div>
				</motion.div>
			</Popover>
			<div className="mt-2 text-center">
				<h4 className="font-semibold text-md md:text-xl">{member.name}</h4>
				<p>{member.major}</p>
			</div>
		</motion.div>
	);
};

export default Member;
