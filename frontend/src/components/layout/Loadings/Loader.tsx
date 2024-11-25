import { motion } from "framer-motion";

const Loader = () => (
  <div className="grid size-[20vh] place-items-center">
    <motion.div
      className="size-1/4 bg-slate-300"
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
