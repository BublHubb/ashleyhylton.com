"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

type Props = {};

function Carosel({ data }: any) {
  const [width, setWidth] = useState<number>(0);
  const carosel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (carosel.current) {
      setWidth(carosel.current.scrollWidth - carosel.current.offsetWidth);
    }
  }, []);

  return (
    <div className="flex items-center justify-center">
      <motion.div
        ref={carosel}
        className="frontEndCarosel"
        whileTap={{ cursor: "grabbing" }}
      >
        <motion.div
          ref={carosel}
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          className="frontEndInnerCarosel"
        >
          {data?.map((image: string, i: number) => {
            return (
              <motion.div className="frontEndItem" key={i}>
                <img className="frontEndImage" src={image} alt="" />
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Carosel;
