"use client";
import { SocialIcon } from "react-social-icons";
import { motion } from "framer-motion";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { AcademicCapIcon } from "@heroicons/react/24/solid";
import { StarIcon } from "@heroicons/react/24/solid";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { HomeIcon } from "@heroicons/react/24/solid";
import { PaintBrushIcon } from "@heroicons/react/24/solid";
import { AiFillGithub } from "react-icons/ai";
import Link from "next/link";
function Header() {
  const goToGitHub = () => {};

  return (
    <header className="sticky top-0 p-5 flex items-start justify-between max-w-7xl mx-auto z-50 xl:items-center  rounded-b-3xl  ">
      <motion.div
        initial={{
          x: -500,
          opacity: 0,
          scale: 0.5,
        }}
        animate={{
          x: 0,
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1.5,
        }}
        className="flex flex-row items-center"
      >
        <div
          onClick={() => {
            window.open("https://www.linkedin.com/in/ashley-hylton-8b1271142/");
          }}
          className="cursor-pointer bg-gray-50/20 rounded-full backdrop-blur-2xl drop-shadow-2xl m-1"
        >
          <SocialIcon
            fgColor="#341948"
            network="linkedin"
            bgColor="transparent"
          />
        </div>
        <div
          onClick={() => {
            window.open("https://github.com/BublHubb/ashleyhylton.com");
          }}
          className="cursor-pointer bg-gray-50/20 rounded-full backdrop-blur-2xl drop-shadow-2xl m-1"
        >
          <SocialIcon
            fgColor="#341948"
            network="github"
            bgColor="transparent"
          />
        </div>
      </motion.div>
      <motion.div
        initial={{
          x: 500,
          opacity: 0,
          scale: 0.5,
        }}
        animate={{
          x: 0,
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1.5,
        }}
        className="flex flex-row items-center text-[#341948] cursor-pointer"
      >
        <Link href="#hero">
          <div className="cursor-pointer bg-gray-50/20 p-1 rounded-full backdrop-blur-2xl drop-shadow-2xl  m-1">
            <HomeIcon className="cursor-pointer h-5 w-5 m-1  " />
          </div>
        </Link>

        <Link href="#features">
          <div className="cursor-pointer bg-gray-50/20 p-1 rounded-full backdrop-blur-2xl drop-shadow-2xl  m-1">
            <StarIcon className="cursor-pointer h-5 w-5 m-1" />{" "}
          </div>
        </Link>
        <Link href="#frontend">
          <div className="cursor-pointer bg-gray-50/20 p-1 rounded-full backdrop-blur-2xl drop-shadow-2xl  m-1">
            <PaintBrushIcon className="cursor-pointer h-5 w-5 m-1" />{" "}
          </div>
        </Link>
        <Link href="#backend">
          <div className="cursor-pointer bg-gray-50/20 p-1 rounded-full backdrop-blur-2xl drop-shadow-2xl  m-1">
            <Cog6ToothIcon className="cursor-pointer h-5 w-5 m-1" />
          </div>
        </Link>
        <Link href="#whyme">
          <div className="cursor-pointer bg-gray-50/20 p-1 rounded-full backdrop-blur-2xl drop-shadow-2xl  m-1">
            <UserCircleIcon className="cursor-pointer h-5 w-5 m-1 " />
          </div>
        </Link>
        <Link href="#contact">
          <div className="cursor-pointer bg-gray-50/20 p-1 m-1 rounded-full backdrop-blur-2xl drop-shadow-2xl">
            <EnvelopeIcon className="cursor-pointer h-5 w-5 m-1 " />
          </div>
        </Link>
        <Link href="#contact">
          <p className="uppercase hidden md:inline-flex text-sm text-[#341948]">
            Get In Touch
          </p>
        </Link>
      </motion.div>
    </header>
  );
}

export default Header;
