import { MdKeyboardArrowUp } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const ToTopButton = () => {
  const [show, setShow] = useState<boolean>(false);

  const scrollToTop = () => {
    window.scrollTo({ behavior: "smooth", left: 0, top: 0 });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setShow(true);
      }

      if (window.scrollY <= 0) {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          whileTap={{ scale: 0.8 }}
          className="fixed z-50 p-2 border border-b-2 border-gray-200 rounded-full shadow-md bottom-4 right-4 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-60"
          onClick={scrollToTop}
        >
          <MdKeyboardArrowUp className="text-3xl" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ToTopButton;
