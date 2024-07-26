import HeroGlobe from "./HeroGlobe";
import { HeroHighlight, Highlight } from "../ui/hero-highlight";
import { motion } from "framer-motion";
import { IconMouse } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="min-h-screen" id="hero">
      <HeroHighlight>
        <div className="flex flex-1 justify-between items-center max-lg:flex-col lg:h-[80vh]">
          <motion.h1
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: [20, -5, 0],
            }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug mx-auto flex-1"
          >
            In the realm of collective paranoia
            <br />
            unite and create with{" "}
            <Highlight className="text-black dark:text-white">
              Collaborite
            </Highlight>
            <br />
            <Link
              className="text-lg bg-indigo-500 py-2 px-4 font-normal"
              to="/room/id"
            >
              Playground
            </Link>
          </motion.h1>
          <HeroGlobe />
        </div>
        <div className="w-full">
          <IconMouse
            className="z-10 mx-auto text-center"
            size={20}
            color={"gray"}
          />
        </div>
      </HeroHighlight>
    </div>
  );
};

export default Hero;
