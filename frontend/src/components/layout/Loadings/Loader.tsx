import { motion } from "framer-motion";

const Loader = () => (
  <div className="h-[20vh] w-[20vh] grid place-items-center">
    <motion.div
      className="bg-slate-300 h-1/4 w-1/4"
      animate={{
        scale: [1, 2, 2, 1, 1],
        rotate: [0, 0, 270, 270, 0],
        borderRadius: ["20%", "20%", "50%", "50%", "20%"],
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
      }}
    />
  </div>
);

export default Loader;
