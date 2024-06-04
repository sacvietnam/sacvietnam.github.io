import { motion, useScroll } from "framer-motion";

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      className="fixed bottom-0 left-0 right-0 h-2 opacity-80 bg-primary "
    />
  );
};

export default ScrollProgressBar;
