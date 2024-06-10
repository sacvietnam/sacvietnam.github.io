import { motion } from "framer-motion";
import viSrc from "./VI.png";
import enSrc from "./EN.png";
import { useContext } from "react";
import { LangContext } from "../../contexts/LangContext";

type LanguageButtonProps = {
  variant: "normal" | "round";
};

const LanguageButton = ({ variant }: LanguageButtonProps) => {
  const { trans, language, setLanguage } = useContext(LangContext);
  const onPress = () => {
    const nextLang = language == "en" ? "vi" : "en";
    setLanguage(nextLang);

    window.location.reload();
  };

  return (
    <motion.div className="inline-block">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        onClick={onPress}
      >
        <div
          className={
            variant === "normal"
              ? "px-4 py-2 text-secondary border-dashed border-2 rounded-md drop-shadow-sm bg-white min-w-[120px] flex gap-2 items-center"
              : "translate-y-1"
          }
        >
          {variant === "normal" &&
            trans({
              vi: "Switch to English",
              en: "Chuyển sang Tiếng Việt",
            })}
          <img
            src={trans(
              variant == "normal"
                ? { vi: enSrc, en: viSrc }
                : { vi: viSrc, en: enSrc },
            )}
            alt="flag"
            className="block object-cover w-10 h-5 -translate-y-0.5 rounded-md"
          />
        </div>
      </motion.button>
    </motion.div>
  );
};

export default LanguageButton;
