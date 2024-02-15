import Logo from "../Logo";
import logoTheShark from "../../assets/imgs/logo/thesharks.png";
import logoIUH from "../../assets/imgs/logo/iuh.png";
import useLang from "../../hooks/useLang";

import { FaFacebook } from "react-icons/fa";
import { MdLocalPhone } from "react-icons/md";
import { HiMiniHome } from "react-icons/hi2";
import { HiMail } from "react-icons/hi";
import { IconType } from "react-icons";

const ContactInfo = ({
	Icon,
	text,
	type,
}: {
	Icon: IconType;
	text: string;
	type: "tel" | "mail";
}) => {
	const title = type == "tel" ? "Hotline" : "Email";
	return (
		<div className="flex items-center gap-2 text-secondary group">
			<Icon className="transition-transform  min-w-5 -translate-y-0.5 group-hover:-rotate-12 group-hover:text-primary" />
			<h3 className="font-medium group-hover:text-primary">
				{title + ": "}
				<a
					className="transition-opacity text-primary hover:opacity-75 "
					href={`${type == "mail" ? "mailto" : "tel"}:${text}`}
				>
					{text}
				</a>
			</h3>
		</div>
	);
};

const Footer = () => {
	const { getContentCurrentLang } = useLang();

	return (
		<footer className="bg-white border-t text-text">
			<div className="grid max-w-screen-xl grid-cols-1 gap-4 p-2 py-4 mx-auto md:grid-cols-2">
				<div className="flex flex-col items-center gap-2 md:items-start">
					<div className="items-center">
						<Logo />
					</div>
					<h3 className="font-semibold text-primary">THE SHARKS TEAM</h3>
					<p className="text-center">
						{getContentCurrentLang({
							en: "Students of Industrial University of Ho Chi Minh City",
							vi: "Sinh viên Trường Đại học Công nghiệp Thành phố Hồ Chí Minh",
						})}
					</p>
					<div className="self-start">
						<div className="flex items-center gap-2 text-secondary group  max-w-[400px]">
							<HiMiniHome className="transition-transform min-w-5 -translate-y-0.5 group-hover:-rotate-12 group-hover:text-primary" />
							<h3 className="font-medium">
								{getContentCurrentLang({en:"Address: ", vi:"Địa chỉ:"})}
								<a
									target="_blank"
									className="transition-opacity text-primary hover:opacity-75"
									href="https://maps.app.goo.gl/KHdGvGRkz3PPztaU7"
								>
									{getContentCurrentLang({
										en: "X7.02 LAB, 12 Nguyen Van Bao, Ward 4, District Go Vap, Ho Chi Minh City, Viet Nam",
										vi: "X7.02 LAB, Số 12 Nguyễn Văn Bảo, Phường 4, Quận Gò Vấp, Thành phố Hồ Chí Minh",
									})}
								</a>
							</h3>
						</div>
						<ContactInfo Icon={MdLocalPhone} text="0886389890" type="tel" />
						<ContactInfo
							Icon={HiMail}
							text="sac.vietnam219@gmail.com"
							type="mail"
						/>
					</div>
					<div className="flex gap-4">
						<a href="https://iuh.edu.vn/">
							<img
								className="object-contain w-[60px] h-[60px]"
								src={logoIUH}
								alt="logo-iuh"
							/>
						</a>
						<img
							className="object-contain w-[60px] h-[60px]"
							src={logoTheShark}
							alt="logo-the-sharks"
						/>
					</div>
				</div>
				<div className="flex flex-col items-center gap-2 md:items-end">
					<h3 className="font-semibold">
						{getContentCurrentLang({ en: "Social Media", vi: "Mạng xã hội" })}
					</h3>
					<div className="flex gap-4">
						<a href="https://www.facebook.com/profile.php?id=61555656479452">
							<FaFacebook className="w-10 h-10 text-primary" />
						</a>
					</div>
				</div>
			</div>
			<div className="text-center text-white p-1/2 bg-primary">
				<span>2024 The Sharks Team</span>
			</div>
		</footer>
	);
};

export default Footer;
