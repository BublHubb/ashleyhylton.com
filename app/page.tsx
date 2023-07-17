"use client";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutMe from "@/components/AboutMe";
import Features from "@/components/Features";
import FrontEnd from "@/components/FrontEnd";
import BackEnd from "@/components/BackEnd";
import WhyMe from "@/components/WhyMe";
import Contact from "@/components/Contact";
import { motion } from "framer-motion";
import BackgroundBlur from "@/components/Backgrounds/BackgroundBlur";
import BackgroundBlur2 from "@/components/Backgrounds/BackgroundBlur2";

export default function Home() {
  return (
    <main>
      <div className="absolute  w-screen">
        <Header />
      </div>
      <div className=" text-[#341948] h-screen  overflow-y-scroll overflow-x-hidden z-0 scrollbar scrollbar-track-slate-400/10 scrollbar-thumb-[#9388A2]/80 scroll-smooth bg-gray-50 relative">
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
            <BackgroundBlur />
          </div>
        </motion.div>
        <div className="absolute h-screen w-screen">
          <section id="hero" className="snap-start">
            <Hero />
          </section>
          <section id="aboutme" className="snap-center">
            <AboutMe />
          </section>
          <section id="features" className="snap-center">
            <Features />
          </section>
          <section id="frontend" className="snap-center">
            <FrontEnd />
          </section>
          <section id="backend" className="snap-center">
            <BackEnd />
          </section>
          <section id="whyme" className="snap-center">
            <WhyMe />
          </section>
          <section id="contact" className="snap-center">
            <Contact />
          </section>
        </div>
      </div>
    </main>
  );
}
