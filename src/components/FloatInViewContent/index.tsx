import React from "react";
import { motion } from "framer-motion";

type FloatInViewContentProps = {
  firstContent: React.ReactElement;
  secondContent: React.ReactElement;
  direction?: "vertical" | "horizontal";
};
const FloatInViewContent = ({
  firstContent,
  secondContent,
  direction = "horizontal",
}: FloatInViewContentProps) => {
  if (direction === "horizontal")
    return (
      <motion.div className="grid gap-2 w-fullgrid-cols-1 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: "-100%" }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className={
            "text-center md:text-left md:self-center md:place-self-start"
          }
        >
          {firstContent}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="order-1 text-center md:text-right md:self-center md:place-self-end"
        >
          {secondContent}
        </motion.div>
      </motion.div>
    );

  if (direction === "vertical")
    return (
      <motion.div className="grid w-full grid-cols-1 gap-16 place-items-center">
        <motion.div
          initial={{ opacity: 0, y: "-50%" }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className={"text-center"}
        >
          {firstContent}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: "50%" }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative flex justify-center gap-2"
        >
          {secondContent}
        </motion.div>
      </motion.div>
    );
};

export default FloatInViewContent;
