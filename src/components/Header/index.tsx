import { Popover } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import { useContext, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { LangContext, MultilangContent } from "../../contexts/LangContext";
import Each from "../../util/Each";
import AuthBlock from "../AuthBlock";
import LanguageButton from "../LanguageButton";
import Logo from "../Logo";
import useMobile from "./../../hooks/useMobile";

const menuItem: { label: MultilangContent; path: string }[] = [
  {
    label: { en: "Home", vi: "Trang chủ" },
    path: "/",
  },
  {
    label: { en: "Place an order", vi: "Đặt mua" },
    path: "/order",
  },
  {
    label: { en: "Blog", vi: "Bài viết" },
    path: "/blog",
  },
  {
    label: { en: "Team", vi: "Đội ngũ" },
    path: "/about-us",
  },
];
const Header = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const isMobile = useMobile();
  const { trans } = useContext(LangContext);

  const toggleMenu = () => {
    setOpen(!isOpen);
  };

  return (
    <header className="sticky top-0 z-50 p-2 overflow-auto bg-white border-b-2 border-gray-200 shadow-sm md:overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-60">
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
              initial={isMobile && { opacity: 0, height: 0 }}
              animate={isMobile && { opacity: 1, height: "auto" }}
              exit={{ height: 0, opacity: 0 }}
              className="max-h-screen "
            >
              <nav>
                <ul className="flex flex-col items-end justify-center gap-8 pt-4 mx-4 mr-8 font-bold md:h-full lg:items-center md:flex-row md:pt-0">
                  <Each
                    of={menuItem}
                    render={(item) => (
                      <motion.li
                        whileTap={{ scale: 0.9 }}
                        key={item.path}
                        className="md:text-sm hoverable-text text-clip"
                        onClick={toggleMenu}
                      >
                        <NavLink
                          to={item.path}
                          className={({ isActive, isPending }) =>
                            isPending
                              ? "pending text-secondary "
                              : isActive
                                ? "active text-primary font-display font-medium "
                                : ""
                          }
                        >
                          {trans(item.label)}
                        </NavLink>
                      </motion.li>
                    )}
                  />
                  <Popover
                    trigger="hover"
                    content={trans({
                      en: "Chuyển sang Tiếng Việt",
                      vi: "Switch to English",
                    })}
                  >
                    <li>
                      <LanguageButton variant="round" />
                    </li>
                  </Popover>
                  <AuthBlock />
                </ul>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
