"use client";

import BackgroundBlur from "./Backgrounds/BackgroundBlur";
import BackgroundBlur2 from "./Backgrounds/BackgroundBlur2";
import BackgroundBlur4 from "./Backgrounds/BackgroundBlur4";
import { motion } from "framer-motion";
import FeaturesGrid from "./FeaturesGrid";

type Props = {};

export default function Features({}: Props) {
  return (
    <div className="h-screen flex flex-col space-y-8 items-center justify-center text-center overflow-y-visible  relative  ">
      <motion.div
        initial={{
          opacity: 0,
        }}
        whileInView={{ opacity: 1 }}
        transition={{
          duration: 4,
        }}
        viewport={{ once: true }}
        className=" flex flex-row w-screen h-screen absolute justify-center"
      >
        <div className="flex justify-start w-1/2  items-start">
          <BackgroundBlur4 />
        </div>

        <div className="flex justify-end items-end w-1/2 ">
          <BackgroundBlur />
        </div>
      </motion.div>
      <div className="z-20">
        <div className=" w-screen h-screen flex justify-center items-center flex-col container p-10">
          <div className=" h-1/3  w-full flex items-center justify-center flex-col max-w-screen-sm ">
            <h1 className="text-4xl  md:text-6xl pb-2 font-bold uppercase">
              Features
            </h1>
            <h1 className="text-xl lg:text-2xl pb-4   ">
              <span>
                Have a look at some of the features I implemented in the
                BublHubb App!
              </span>
            </h1>
            <div className="flex justify-center items-center">
              <FeaturesGrid />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
