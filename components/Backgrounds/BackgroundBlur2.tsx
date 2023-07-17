import { motion, useScroll, useTransform } from "framer-motion";
type Props = {};

function BackgroundBlur2({}: Props) {
  return (
    <div className="  w-screen h-1/2 flex justify-center">
      <div className="relative  justify-center items-center flex">
        <motion.div
          initial={{
            y: 0,
            x: 1,
          }}
          animate={{
            y: [-200, 200, -200, 200, -200, 200],
            x: [-200, 200, -200, 200, -200, 200],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
          className=" absolute  w-60 h-60  -left-80 bg-[#398FC7]/70 rounded-full mix-blend-multiply filter blur-xl opacity-70 flex justify-center items-center animate-blob "
        ></motion.div>
        <motion.div
          initial={{
            y: 0,
            x: 1,
          }}
          animate={{
            y: [-200, 200, -200, 200, -200, 200],
            x: [-200, 200, -200, 200, -200, 200],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
          className=" absolute  w-60 h-60 -bottom-20  -left-80 bg-[#4A0D4A]/70 rounded-full mix-blend-multiply filter blur-xl opacity-70 flex justify-center items-center animate-blob3 "
        ></motion.div>
        <motion.div
          initial={{
            y: 0,
            x: 1,
          }}
          animate={{
            y: [-200, 200, -200, 200, -200, 200],
            x: [-200, 200, -200, 200, -200, 200],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
          className=" absolute   w-60 h-60 -left-40 bg-[#8A6FDF]/70 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob2"
        ></motion.div>
        <motion.div
          initial={{
            y: 0,
            x: 1,
          }}
          animate={{
            y: [-200, 200, -200, 200, -200, 200],
            x: [-200, 200, -200, 200, -200, 200],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
          className=" absolute   w-60 h-60 -left-60 -bottom-20  bg-[#C55FFC]/70 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob3"
        ></motion.div>
      </div>
    </div>
  );
}

export default BackgroundBlur2;
