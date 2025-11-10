import HeroGlobe from "./HeroGlobe";
import { HeroHighlight, Highlight } from "../ui/hero-highlight";
import { motion } from "framer-motion";
import { IconMouse, IconStar } from "@tabler/icons-react";

const Hero = () => {
  return (
    <div className="min-h-screen" id="hero">
      <HeroHighlight>
        <div className="flex flex-1 items-center justify-between max-lg:flex-col lg:h-[80vh]">
          <div>
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
              className="mx-auto max-w-4xl flex-1 select-none px-4 text-2xl font-bold leading-relaxed text-neutral-700 dark:text-white md:text-4xl lg:text-5xl lg:leading-snug"
            >
              In the realm of collective paranoia
              <br />
              unite and create with{" "}
              <Highlight className="text-black dark:text-white">
                DevUnity
              </Highlight>
            </motion.h1>
            <a
              href="https://github.com/m4dd0c/DevUnity"
              target="_blank"
              className="group ml-4 flex w-fit items-center justify-center gap-2 border border-gray-500 px-4 py-1 font-mono text-sm text-gray-400 duration-200 hover:border-gray-300 hover:text-gray-50"
            >
              <IconStar
                size={15}
                className="transition-colors duration-200 group-hover:text-yellow-500"
              />
              Star on Github <span>(5)</span>
            </a>
          </div>
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
