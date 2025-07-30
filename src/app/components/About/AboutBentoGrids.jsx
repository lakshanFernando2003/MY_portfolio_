import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { twMerge } from "tailwind-merge";
import PropTypes from 'prop-types';
import BentoCard from "./BentoCard";
import Image from "next/image";
import AnimateLamp from "../Section Lamps/AnimateLamp";
import GridGlobe from "./Grid-Content/GridGlobe";
import Collabaration from "./Grid-Content/Collabaration";
import BeyondCode from "./Grid-Content/BeyondCode";
import CommingSoon from "./Grid-Content/CommingSoon";
import "../MediaQuery/largeScreen.css"


// BentoTilt component implementation
export const BentoTilt = ({ className, children, ...rest }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <motion.div
      ref={itemRef}
      className={twMerge("relative overflow-hidden rounded-md", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle, transition: "transform 0.2s ease-out" }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

// Add prop validation using PropTypes
BentoTilt.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export const AboutBentoGrids = () => {
  const [lightOn, setLightOn] = useState(false);
  const sectionEndRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const toggleLight = () => {
    setLightOn(!lightOn);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemFromLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    }
  };

  const itemFromRight = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  return (
    <motion.div
      ref={sectionRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="Bento-Grids w-full h-auto flex flex-col items-center justify-center z relative"
    >
      <motion.div variants={fadeIn} className="w-full h-[30vh] overflow-hidden">
        {/* Section lamp Header */}
        <AnimateLamp
          className=""
          lightClassName="Bento-Lamp"
          beamClassName="Bento-Lamp-beam"
          lightOpacity={0.5}
          lightBlur="blur-[48px]"
          enableStickyEffect={true}
          endTarget={sectionEndRef}
        />
      </motion.div>

      <motion.div
        variants={fadeIn}
        className="Bento-Grids-Header pointer-events-none w-full flex items-center justify-center z-20"
      >
        <div className="w-2/5 flex flex-col text-center h-40 gap-2 pointer-events-none">
          <h2 className="relative pointer-events-none bg-clip-text inline-block font-semibold antialiased tracking-wide font-mono"> Personality </h2>
          <h1 className="relative pointer-events-none text-[2rem] z-50 bg-clip-text inline-block font-semibold antialiased tracking-tighter font-mono"> Impress,Engage,and Perform </h1>
          <h3 className="relative pointer-events-none text-[1.2rem] opacity-70 z-50 bg-clip-text inline-block antialiased"> I am a self Motivated person, Always prepare in advance and focused on my goals while enjoying a balance life </h3>
        </div>

      {/* <div className={`Bento-Light absolute inset-auto z-10 h-[55rem] w-[55rem]
        rounded-[90%] bg-[#8000FF] radial-gradient(circle,rgba(128, 0, 255, 1) 0%, rgba(128, 0, 255, 0.17) 100%)
        transition-all duration-700 ease-in-out
        ${lightOn ? 'opacity-10 blur-3xl scale-100' : 'opacity-0 blur-xl scale-50'}`}></div> */}
      </motion.div>

      <div className="w-[85vw] mt-15 mb-5 mx-auto px-3 md:px-5 z-40">
        {/* Main large bento tile */}
        <div className="relative h-96 w-full mb-7 grid grid-cols-2 grid-rows-1 gap-3">
          {/* animate from left to Initial original position */}
          <BentoTilt className="border-gray-500 border-1 me-14 md:col-span-1 md:me-0">
            <motion.div
              className="h-full"
              variants={itemFromLeft}
              style={{
                y: useTransform(scrollYProgress, [0, 1], [0, -30])
              }}
            >
              <BentoCard>
                <CommingSoon />
              </BentoCard>
            </motion.div>
          </BentoTilt>

          {/* animate from right to Initial original position */}
          <BentoTilt className="border-gray-500 border-1 me-14 md:col-span-1 md:me-0">
            <motion.div
              className="h-full"
              variants={itemFromRight}
              style={{
                y: useTransform(scrollYProgress, [0, 1], [0, -50])
              }}
            >
              <BentoCard>
                <CommingSoon />
              </BentoCard>
            </motion.div>
          </BentoTilt>
        </div>

        {/* Grid layout for smaller tiles */}
        <div className="grid h-[80vh] w-full grid-cols-5 grid-rows-2 gap-3">
          {/* animate from left to Initial original position */}
          <div className="row-span-1 md:col-span-1 md:row-span-2 overflow-visible">
            <motion.div
              className="h-full w-full"
              variants={itemFromLeft}
              style={{
                y: useTransform(scrollYProgress, [0, 1], [0, -40])
              }}
            >
              {/* customizable content */}
              <div className="flex flex-col items-center justify-center h-full w-full p-1 relative overflow-visible">
                {/* Background image with overlay */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={`/images/My-Selfcoloredit.png`}
                    alt={`Profile Background`}
                    fill
                    className="-translate-y-15 object-cover object-center overflow-visible opacity-30"
                    priority
                  />
                </div>

                {/* Content that would go on top of the background image */}
                <div className="relative z-20 text-white p-4 w-full h-full flex flex-col justify-end">
                  <p className="text-sm opacity-50 font-semibold -ml-5">Software Developer & Designer</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* animate from left to Initial original position */}
          <BentoTilt className="border-gray-500 border-1 bento-tilt_3 row-span-1 ms-32 md:col-span-2 md:ms-0">
            <motion.div
              className="h-full"
              variants={itemFromLeft}
              style={{
                y: useTransform(scrollYProgress, [0, 1], [0, -25])
              }}
            >
              <BentoCard>
                <div className="h-full w-full pointer-events-none">
                  <h3 className="Globe-Text-top text-5xl font-anton p-5">24/7-H Availability</h3>
                  <GridGlobe className="w-full" />
                  <h3 className="Globe-Text-bottom absolute text-left bottom-1 text-5xl font-anton p-5 z-10">Flexible working on any Time - Zone</h3>
                </div>
              </BentoCard>
            </motion.div>
          </BentoTilt>

          {/* animate from right to Initial original position */}
          <div
            className="border-gray-500 border-0 bento-tilt_4 me-14 md:col-span-2 md:me-0"
            variants={itemFromRight}
            style={{
              y: useTransform(scrollYProgress, [0, 1], [0, -35])
            }}
          >
            <BentoCard>
              <Collabaration /> {/* content component */}
            </BentoCard>
          </div>

          {/* animate from left to Initial original position */}
          <BentoTilt className="border-gray-500 border-1 bento-tilt_5 md:col-span-1">
            <motion.div
              className="h-full"
              variants={itemFromLeft}
              style={{
                y: useTransform(scrollYProgress, [0, 1], [0, -20])
              }}
            >
              <BentoCard>
                <CommingSoon />
              </BentoCard>
            </motion.div>
          </BentoTilt>

          {/* animate from right to Initial original position */}
          <BentoTilt className="border-gray-500 border-1 bento-tilt_5 md:col-span-3">
            <motion.div
              className="h-full"
              variants={itemFromRight}
              style={{
                y: useTransform(scrollYProgress, [0, 1], [0, -30])
              }}
            >
              <BentoCard>
                <CommingSoon />
              </BentoCard>
            </motion.div>
          </BentoTilt>
        </div>
      </div>

      <div ref={sectionEndRef}></div>
    </motion.div>
  );
};
