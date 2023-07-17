"use client";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import BackgroundBlur from "./Backgrounds/BackgroundBlur";
import BackgroundBlur2 from "./Backgrounds/BackgroundBlur2";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useEffect } from "react";

type Props = {};

export default function Hero({}: Props) {
  const [text] = useTypewriter({
    words: [
      "Full-Stack Software Developer",
      "Functionality with a splash of creativity!",
      "Coding-is-a-lifestyle-choice.tsx",
    ],
    loop: true,
    delaySpeed: 1000,
  });
  const getAPIKey = async () => {
    await fetch("api/FirebaseConfig/", {
      method: "GET",
    })
      .then((response) => {
        const data = response.json();
        return data;
      })
      .then((data) => {
        console.log("AfterFetch:", data);
      })
      .catch((error) => {
        console.log("APIError:", error);
      });
  };

  useEffect(() => {
    getAPIKey();
  }, []);
  return (
    <div className="h-screen flex flex-col space-y-8 items-center justify-center text-center overflow-hidden relative  ">
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
            className=" h-1/3  flex items-center justify-end w-full max-w-screen-lg"
          >
            <h1 className="text-4xl  md:text-6xl mr-2 font-bold uppercase">
              Ashley Hylton
            </h1>
          </motion.div>
          <div className=" h-1/3  w-full flex items-center justify-center max-w-screen-sm ">
            <h1 className="text-3xl lg:text-4xl   ">
              <span>{text}</span>
              <Cursor cursorColor="#FEDA15" />
            </h1>
          </div>
          <div className=" h-1/3  flex items-center justify-start w-full max-w-screen-lg">
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
              className="flex flex-col items-center justify-center "
            >
              <h1 className=" mb-2 text-lg md:text-2xl">Take a look!</h1>
              <ArrowDownCircleIcon className="w-10 h-10 m-2 animate-bounce  " />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
