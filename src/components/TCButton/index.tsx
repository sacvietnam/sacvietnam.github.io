import { motion } from "framer-motion";

type ButtonProps = {
  label: string;
  onPress?: VoidFunction;
};

const TCButton = ({ label, onPress }: ButtonProps) => {
  return (
    <motion.div className="inline-block drop-shadow-md">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        onClick={onPress}
        className="px-4 py-2 text-white rounded-md drop-shadow-md bg-primary min-w-[120px]"
      >
        {label}
      </motion.button>
    </motion.div>
  );
};

export default TCButton;
