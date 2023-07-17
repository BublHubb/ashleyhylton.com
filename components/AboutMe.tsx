"use client";
import { useState } from "react";
import BackgroundBlur2 from "./Backgrounds/BackgroundBlur2";
import BackgroundBlur3 from "./Backgrounds/BackgroundBlur3";
import { motion } from "framer-motion";
import { SkillsExport } from "./Skills/SkillsExport";
import { GlobeEuropeAfricaIcon } from "@heroicons/react/24/solid";
import { PlayCircleIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {};

export default function AboutMe({}: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const goToBublHubb = () => {
    window.open("https://bublhubb.com/");
  };
  const goToDemo = () => {
    setLoading(true);
    router.push(`/demoPage/`);
  };
  return (
    <div className="h-screen flex flex-col space-y-8 items-center justify-center text-center  relative overflow-y-visible  ">
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
        <div className="flex justify-end w-1/2  items-end">
          <BackgroundBlur2 />
        </div>
        <div className="flex justify-start items-start w-1/2 ">
          <BackgroundBlur3 />
          <p></p>
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
            className=" h-1/3  flex items-left justify-start text-left w-full max-w-screen-md"
          >
            <div>
              <h1 className="text-4xl  md:text-6xl text-left font-bold uppercase p-2">
                A bit to start...
              </h1>

              <p className=" md:text-xl p-2 max-w-sm ">
                This is the BublHubb app! I am the sole developer (and founder)
                of this live project and will be using this as a case study to
                show why I am good for your company. Similar to services like
                Eventbrite & TicketMaster it is a platform for both finding &
                creating events!
              </p>
            </div>
          </motion.div>

          <div className=" h-1/3  w-full flex items-center justify-center max-w-screen-sm flex-col ">
            <img
              src={
                "https://firebasestorage.googleapis.com/v0/b/bubl-hubb-2-0.appspot.com/o/Compressed_Web_Images%2FCorporate%20site%20laptop%20iphone%20mockup-min.png?alt=media&token=866dcaba-90f6-4766-9ca9-e0dec55057de"
              }
              alt=""
              className=" w-80 md:w-96 "
            />
          </div>

          <div className=" h-1/3  flex items-center justify-between w-full  max-w-screen-lg">
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
              className="flex flex-col items-center justify-center  rounded-lg p-2 drop-shadow-lg w-1/2"
            >
              {" "}
              <SkillsExport />
            </motion.div>
            <div>
              <p className="text-center  md:text-xl">
                Check out my demo or the landing site!
              </p>
              {!loading ? (
                <div
                  onClick={goToDemo}
                  className="w-1/2  flex items-center flex-col justify-center text-left mx-auto  "
                >
                  <button className="heroButton  bg-[#341948] text-gray-50 flex justify-center items-center align-middle m-2">
                    Demo
                    <PlayCircleIcon className="w-5 h-5 ml-2 animate-bounce" />
                  </button>
                </div>
              ) : (
                <div className="w-1/2  flex items-center flex-col justify-center text-left mx-auto  ">
                  <button className="heroButton  bg-[#341948]/20 text-gray-50 flex justify-center items-center align-middle m-2">
                    Loading
                    <CircularProgress
                      size={18}
                      sx={{ color: "inherit", marginLeft: 2 }}
                    />
                  </button>
                </div>
              )}
              <div
                onClick={goToBublHubb}
                className="w-1/2  flex items-center flex-col justify-center text-left mx-auto  "
              >
                <button className="heroButton  bg-[#341948] text-gray-50 flex justify-center items-center align-middle m-2">
                  BublHubb
                  <GlobeEuropeAfricaIcon className="w-5 h-5 ml-2 animate-bounce" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
