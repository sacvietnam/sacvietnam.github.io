import Logo from "../Logo";
import logoTheShark from "../../assets/imgs/logo/thesharks.jpg";
import logoIUH from "../../assets/imgs/logo/iuh.jpg";
import { FaFacebook, FaYoutube } from "react-icons/fa";

const Footer = () => {
	return (
		<div className="bg-white border-t text-text">
			<div className="grid max-w-screen-xl grid-cols-1 gap-4 p-2 mx-auto md:grid-cols-2">
				<div className="flex flex-col items-center gap-2 md:items-start">
					<div className="items-center">
						<Logo />
					</div>
					<h3 className="font-semibold text-primary">THE SHARKS TEAM</h3>
					<p className="text-center">
						Sinh viên Trường Đại học Công nghiệp Thành phố Hồ Chí Minh
					</p>
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
					<h3 className="font-semibold">Social Media</h3>
					<div className="flex gap-4">
						<a href="/">
							<FaFacebook className="w-10 h-10 text-primary" />
						</a>
						<a href="/">
							<FaYoutube className="w-12 h-12 text-red-500" />
						</a>
					</div>
				</div>
			</div>
			<div className="text-center text-white p-1/2 bg-primary">
				<span>2024 The Sharks Team</span>
			</div>
		</div>
	);
};

export default Footer;
