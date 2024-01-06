import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import useMobile from "./../../hooks/useMobile";
import { FiMenu } from "react-icons/fi";
import Logo from "../Logo";

const menuItem: { label: string; path: string }[] = [
	{ label: "The story", path: "/story" },
	{ label: "The product ", path: "/product" },
	{ label: "Download ", path: "/download" },
	{ label: "Meet the team", path: "/about-us" },
	// { label: "Contact", path: "/contact" },
];

const Header = () => {
	const [isOpen, setOpen] = useState<boolean>(false);
	const isMobile = useMobile();

	const toggleMenu = () => {
		setOpen(!isOpen);
	};

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
									{menuItem.map((item) => (
										<li key={item.path} className="hoverable-text">
											<Link to={item.path}>{item.label}</Link>
										</li>
									))}
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
