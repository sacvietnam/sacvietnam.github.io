import { motion } from "framer-motion";
import useLang from "../../hooks/useLang";
import viSrc from "./VI.png";
import enSrc from "./EN.png";

type LanguageButtonProps = {
	variant: "normal" | "round";
};

const LanguageButton = ({ variant }: LanguageButtonProps) => {
	const { getContentCurrentLang, control } = useLang();
	const [currentLang, setLang] = control;

	const onPress = () => {
		const nextLang = currentLang == "en" ? "vi" : "en";
		setLang(nextLang);

		window.location.reload();
	};

	return (
		<motion.div className="inline-block drop-shadow-md">
			<motion.button
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.9 }}
				onClick={onPress}
			>
				<div
					className={
						variant === "normal"
							? "px-4 py-2 text-white rounded-md drop-shadow-md bg-primary min-w-[120px] flex gap-2 items-center"
							: "translate-y-1"
					}
				>
					{variant === "normal" &&
						getContentCurrentLang({
							vi: "Switch to English",
							en: "Chuyển sang Tiếng Việt",
						})}
					<img
						src={getContentCurrentLang({ vi: enSrc, en: viSrc })}
						alt="flag"
						className="block object-cover w-10 h-5 -translate-y-0.5 rounded-md"
					/>
				</div>
			</motion.button>
		</motion.div>
	);
};

export default LanguageButton;
