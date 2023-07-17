import { motion } from "framer-motion";
type Props = {};

function BackgroundBlur3({}: Props) {
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
          className=" absolute  w-60 h-60  left-10 top-40 bg-[#F52EC0]/70 rounded-full mix-blend-multiply filter blur-xl opacity-70 flex justify-center items-center animate-blob3 "
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
          className=" absolute   w-80 h-80 -left-20  bg-[#FBEE0F]/70 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob2"
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
          className=" absolute   w-60 h-60  -left-40 -bottom-10 bg-[#FFFF00]/70 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
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
          className=" absolute   w-80 h-80  left-20 -top-40 bg-[#FEDA15]/70 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob3"
        ></motion.div>
      </div>
    </div>
  );
}

export default BackgroundBlur3;
