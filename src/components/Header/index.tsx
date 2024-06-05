import { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import useMobile from "./../../hooks/useMobile";
import { FiMenu } from "react-icons/fi";
import Logo from "../Logo";
import Each from "../../util/Each";
import LanguageButton from "../LanguageButton";
import { Button, Popover } from "antd";
import { LangContext, MultilangContent } from "../../contexts/LangContext";
import { GlobalContext } from "../../contexts/GlobalContext";
import { CodeOutlined } from "@ant-design/icons";
import LocalStorageHandler from "../../util/localStorage/LocalStorageHandler";
import type { AdminFunctionIndex } from "../../pages/AdminPage/index";

const HomeAdmin: AdminFunctionIndex = "HOME_PAGE";

const menuItem: { label: MultilangContent; path: string }[] = [
  {
    label: { en: "Home", vi: "Trang chủ" },
    path: "/",
  },
  {
    label: { en: "The Story", vi: "Câu chuyện" },
    path: "/story",
  },
  {
    label: { en: "The Product", vi: "Sản phẩm" },
    path: "/product",
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
    label: { en: "Application", vi: "Phần mềm" },
    path: "/download",
  },
  {
    label: { en: "About us", vi: "Chúng tôi" },
    path: "/about-us",
  },
];

const Header = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const isMobile = useMobile();
  const { user } = useContext(GlobalContext);

  const toggleMenu = () => {
    setOpen(!isOpen);
  };

  const { trans } = useContext(LangContext);

  const isAdmin = user?.role === "admin";

  return (
    <header className="sticky top-0 z-50 p-2 bg-white border-b-2 border-gray-200 shadow-sm bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-60">
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
              className="max-h-screen overflow-auto md:overflow-hidden"
            >
              <nav>
                <ul
                  className="flex flex-col items-end justify-center gap-8 pt-4 mx-4 mr-8 font-bold md:h-full lg:items-center md:flex-row md:pt-0"
                  onClick={toggleMenu}
                >
                  <Each
                    of={menuItem}
                    render={(item) => (
                      <motion.li
                        whileTap={{ scale: 0.9 }}
                        key={item.path}
                        className="md:text-sm hoverable-text text-clip"
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
                  {isAdmin && (
                    <Link to="/admin">
                      <Button
                        onClick={() =>
                          LocalStorageHandler.setItem(
                            "ADMIN_INDEX_PAGE",
                            HomeAdmin,
                          )
                        }
                        icon={<CodeOutlined />}
                      ></Button>
                    </Link>
                  )}
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
