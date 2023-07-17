"use client";
import BackgroundBlur from "./Backgrounds/BackgroundBlur";
import BackgroundBlur2 from "./Backgrounds/BackgroundBlur2";
import BackgroundBlur4 from "./Backgrounds/BackgroundBlur4";
import Carosel from "./Carosel";
import { motion } from "framer-motion";
import { BackEndCaroselData } from "./Data/BackEndCaroselData";

type Props = {};

export default function BackEnd({}: Props) {
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
          <BackgroundBlur2 />
        </div>

        <div className="flex justify-end items-end w-1/2 ">
          <BackgroundBlur2 />
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
            <h1 className="title w-screen text-left">Back End stuff...</h1>
          </motion.div>
          <div className="h-screen w-screen  flex flex-col md:flex-row-reverse justify-center items-center">
            <div className="flex items-center justify-center flex-col  w-1/2 ">
              <Carosel data={BackEndCaroselData} />
              <p className="italic">(swipe)</p>
            </div>
            <div className="flex items-center justify-center flex-col  w-1/2  ">
              <ul className="list-disc space-y-1 text-[#341948] text-base md:text-xl max-w-md  align-middle z-30 ">
                <li>
                  Leveraged cloud technology for api requests, security &
                  optimisation
                </li>
                <li>
                  Understand CORS and can handle sending & receiving data across
                  the internet
                </li>
                <li>Implemented Firestore and understand noSQL databases</li>
                <li>All ran in a Node runtime environment</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
