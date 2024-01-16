import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import useMobile from "./../../hooks/useMobile";
import { FiMenu } from "react-icons/fi";
import Logo from "../Logo";
import Each from "../../util/Each";
import useLang, { ContentMultiLang } from "../../hooks/useLang";

const menuItem: { label: ContentMultiLang; path: string }[] = [
	{
		label: { en: "Home", vi: "Trang chủ" },
		path: "/",
	},
	{
		label: { en: "The story", vi: "Câu chuyện" },
		path: "/story",
	},
	{
		label: { en: "The product", vi: "Sản phẩm" },
		path: "/product",
	},
	{
		label: { en: "Download", vi: "Tải xuống" },
		path: "/download",
	},
	{
		label: { en: "Meet the team", vi: "Gặp gỡ đội" },
		path: "/about-us",
	},
];

const Header = () => {
	const [isOpen, setOpen] = useState<boolean>(false);
	const isMobile = useMobile();

	const toggleMenu = () => {
		setOpen(!isOpen);
	};

	const { getContentCurrentLang } = useLang();

	return (
		<div className="container sticky top-0 z-50 p-2 bg-white border-b-2 border-gray-200 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-60 ">
			<div className="flex flex-col justify-between max-w-screen-xl mx-auto md:flex-row md:items-center ">
				<div className="flex items-center justify-between">
					<Logo />
					{isMobile && (
						<div className="p-4" onClick={toggleMenu}>
							<FiMenu />
						</div>
					)}
				</div>

				<AnimatePresence>
					{(!isMobile || isOpen) && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ height: 0, opacity: 0 }}
						>
							<div>
								<ul
									className="flex flex-col items-center justify-center gap-8 pt-4 font-bold md:flex-row md:pt-0"
									onClick={toggleMenu}
								>
									<Each
										of={menuItem}
										render={(item) => (
											<li key={item.path} className="p-2 hoverable-text">
												<Link to={item.path}>
													{getContentCurrentLang(item.label)}
												</Link>
											</li>
										)}
									/>
								</ul>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
};

export default Header;
