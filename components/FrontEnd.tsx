"use client";
import BackgroundBlur from "./Backgrounds/BackgroundBlur";
import BackgroundBlur2 from "./Backgrounds/BackgroundBlur2";
import BackgroundBlur3 from "./Backgrounds/BackgroundBlur3";
import { FrontEndCaroselData } from "./Data/FrontEndCaroselData";
import Carosel from "./Carosel";
import { motion } from "framer-motion";

type Props = {};

export default function FrontEnd({}: Props) {
  return (
    <div className="h-screen flex flex-col space-y-8 items-center justify-center text-center overflow-y-visible relative  ">
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
          <BackgroundBlur3 />
        </div>

        <div className="flex justify-end items-end w-1/2 ">
          <BackgroundBlur />
        </div>
      </motion.div>
      <div className="z-20">
        <div className=" w-screen h-screen flex justify-center items-center flex-col container p-10">
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 5.5,
            }}
            className=" flex items-center justify-center w-full max-w-screen-lg"
          >
            <h1 className="title w-screen text-right">Front End stuff...</h1>
          </motion.div>
          <div className="h-screen w-screen  flex flex-col md:flex-row justify-center items-center">
            <div className="flex items-center justify-center flex-col  w-1/2 ">
              <Carosel data={FrontEndCaroselData} />
              <p className="italic">(swipe)</p>
            </div>
            <div className="flex items-center justify-center flex-col  w-1/2  ">
              <ul className="list-disc space-y-1 text-[#341948] text-base md:text-xl max-w-md  align-middle z-30 ">
                <li>
                  Able to create functional and aesthetically pleasing user
                  interfaces
                </li>
                <li>
                  Use of Tailwind CSS, Redux, Next JS (13.4), Stripe to improve
                  efficiancy and optimisation.
                </li>
                <li>
                  I understand power of React & React Native (Hooks, etc..) to
                  sycronise cross platform
                </li>
                <li>
                  I use my experience in graphic design & business to make
                  aesthetically pleasing and performant applications.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
