import Logo from "../Logo";
import logoTheShark from "../../assets/imgs/logo/thesharks.png";
import logoIUH from "../../assets/imgs/logo/iuh.png";
import useLang from "../../hooks/useLang";

import { FaFacebook } from "react-icons/fa";
import { FaPhoneVolume } from "react-icons/fa6";

const Footer = () => {
	const { getContentCurrentLang } = useLang();

	return (
		<footer className="bg-white border-t text-text">
			<div className="grid max-w-screen-xl grid-cols-1 gap-4 p-2 mx-auto md:grid-cols-2">
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
					<div className="flex items-center gap-1 text-secondary group">
						<FaPhoneVolume className="transition-transform group-hover:-rotate-12 group-hover:text-primary" />
						<h3 className="font-semibold ">
							Hotline:{" "}
							<a
								className="transition-opacity text-primary hover:opacity-75"
								href="tel:0886389890"
							>
								0886389890
							</a>
						</h3>
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
