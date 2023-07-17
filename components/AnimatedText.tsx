"use client";
import { motion } from "framer-motion";
type Props = {
  text: string;
};

function AnimatedText({ text }: Props) {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };
  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        ease: "easeIn",
      },
    },
    hidden: {
      opacity: 0,
      y: -20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className="flex overflow-hidden  md:flex-row p-2"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words?.map((word, i) => (
        <motion.span
          variants={child}
          className="text-6xl mr-2 font-bold uppercase"
          key={i}
        >
          {word}{" "}
        </motion.span>
      ))}
    </motion.div>
  );
}

export default AnimatedText;
