"use client";
import BackgroundBlur from "./Backgrounds/BackgroundBlur";
import BackgroundBlur2 from "./Backgrounds/BackgroundBlur2";
import BackgroundBlur4 from "./Backgrounds/BackgroundBlur4";
import FrontEndCarosel from "./Carosel";
import { motion } from "framer-motion";

type Props = {};

export default function WhyMe({}: Props) {
  const backgroundInfo =
    "I am a self-taught software developer within the react/react native frameworks. What started as a skill required to launch my start up years ago has developed into a full passion for development and a complete change in career path for me. I hope in future to further develop in this career and I am particularly keen in helping start-ups with web and mobile applications. As a self-taught developer, I have acquired a diverse set of skills and expertise in various programming languages and software - I am also a huge Arsenal fan! Please don't judge me to harshly for this!";
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
          <BackgroundBlur4 />
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
            <h1 className="title w-screen text-center">Why Me...</h1>
          </motion.div>
          <div className="h-screen w-screen  flex flex-col  justify-center items-center">
            <motion.img
              initial={{
                x: -200,
                opacity: 0,
              }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 1.2,
              }}
              src="https://media.licdn.com/dms/image/C5603AQHlEnK-xf9J9Q/profile-displayphoto-shrink_800_800/0/1520279014220?e=1694044800&v=beta&t=AEeElZOTfrxWjH4qfniaRL-GL8Cpn3dlpS2hPFQ14NU"
              className="mb-2  flex-shrink-0 w-36 h-36  drop-shadow-lg rounded-full object-cover  md:w-56 md:h-56  bg-white z-0"
            />
            <div className="flex items-center justify-center flex-col  w-1/2  ">
              <ul className="list-disc space-y-1 text-[#341948] text-base md:text-xl max-w-md  align-middle z-30 ">
                <li>
                  I understand the business, design and development of an
                  application from start to finish giving me multiple
                  perspectives
                </li>
                <li>I am able to develop cross-platform</li>
                <li>
                  I develop on the cutting edge of app development making the
                  most optimised and secure apps available
                </li>
                <li>
                  I am a self driven man with a clear passion for software
                  development!
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
