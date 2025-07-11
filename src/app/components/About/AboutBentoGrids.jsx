import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import PropTypes from 'prop-types';
import BentoCard from "./BentoCard";
import AnimateLamp from "../Section Lamps/AnimateLamp";
import GridGlobe from "./Grid-Content/GridGlobe";
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

  const sectionEndRef = useRef(null);

  return (
    <div className="Bento-Grids w-full h-auto flex flex-col items-center justify-center z">

      <div className=" w-full h-[30vh] overflow-hidden ">
            {/* Section lamp Header */}
            <AnimateLamp
              className=""
              lightClassName="Bento-Lamp"
              beamClassName="Bento-Lamp-beam"
              // lightScale={100}
              lightOpacity={0.5}
              lightBlur="blur-[48px]"
              enableStickyEffect={true}
              endTarget={sectionEndRef}

            />
      </div>

       <div className="Bento-Grids-Header pointer-events-none w-full flex items-center justify-center z-20 ">
          <div className="w-2/5 flex flex-col text-center h-40 gap-2 pointer-events-none">
              <h2 className="relative pointer-events-none bg-clip-text inline-block font-semibold antialiased tracking-wide font-mono "> Personality </h2>
              <h1 className="relative pointer-events-none  text-[2rem] z-50 bg-clip-text inline-block font-semibold antialiased tracking-tighter font-mono  "> Impress,Engage,and Perform </h1>
              <h3 className="relative pointer-events-none  text-[1.2rem] opacity-70 z-50 bg-clip-text inline-block antialiased "> I am a self Motivated person, Always prepare in advance and focused on my goals while enjoying a balance life </h3>
          </div>
        </div>


      <div className=" w-[90vw] mt-15 mb-10 mx-auto px-3 md:px-10 z-20">
        {/* Main large bento tile */}
        <BentoTilt className="border-gray-500 border-b-1 relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[60vh]">

          <BentoCard>
            {/* customizable content */}
             <div className="h-full w-full pointer-events-none">
                <h3 className="Globe-Text-top text-5xl font-anton p-5">24/7-H Availability</h3>
              <GridGlobe className="w-full" />
                <h3 className="Globe-Text-bottom absolute bottom-2 right-1 text-5xl font-anton p-5 z-10">Flexible working on any Time - Zone</h3>
             </div>
          </BentoCard>
        </BentoTilt>

        {/* Grid layout for smaller tiles */}
        <div className="grid h-[80vh] w-full grid-cols-3 grid-rows-2 gap-7">
          <BentoTilt className="border-gray-500 border-1  bento-tilt_2 row-span-1 md:col-span-1 md:row-span-2">
            <BentoCard>
              {/* customizable content */}
            </BentoCard>
          </BentoTilt>

          <BentoTilt className="border-gray-500 border-1  bento-tilt_3 row-span-1 ms-32 md:col-span-1 md:ms-0">
            <BentoCard>
              <h3>creativity</h3>
            </BentoCard>
          </BentoTilt>

          <BentoTilt className="border-gray-500 border-1  bento-tilt_4 me-14 md:col-span-1 md:me-0">
            <BentoCard>
              <h3>Collaboration</h3>
              <p className="text-sm">I am a team player who values collaboration and communication.</p>
            </BentoCard>
          </BentoTilt>

          <BentoTilt className="border-gray-500 border-1  bento-tilt_5 md:col-span-2">
            <BentoCard>
               <h3>Beyond Code - add soft skills section here</h3>
            </BentoCard>
          </BentoTilt>

        </div>
      </div>

      <div ref={sectionEndRef} > </div>
    </div>
  );
};
