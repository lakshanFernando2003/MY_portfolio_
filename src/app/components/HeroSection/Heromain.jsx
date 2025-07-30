import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import Lamp from './Herolamp'
import AnimateLamp from '../Section Lamps/AnimateLamp';
import Midlapm from './lamp'
import ReactiveOrb from './ReactiveOrb';
import ImageBox from './imageBox';
import HeroText from './HeroTextAnimation';
import '../MediaQuery/largeScreen.css';


export default function Heromain() {
  const sectionEndRef = useRef(null);

  // Animation variants for fade-in effects
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <style jsx>{`
        .scroll-down {
          height: 50px;
          width: 30px;
          border: 2px solid lightgray;
          position: absolute;
          left: 49%;
          bottom: 8%;
          border-radius: 50px;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.626);
        }

        .scroll-down::before,
        .scroll-down::after {
          content: "";
          position: absolute;
          top: 20%;
          left: 50%;
          height: 10px;
          width: 10px;
          transform: translate(-50%, -100%) rotate(45deg);
          border: 2px solid lightgray;
          border-top: transparent;
          border-left: transparent;
          animation: scroll-down 2s ease-in-out infinite;
        }

        .scroll-down::before {
          top: 30%;
          animation-delay: 0.5s;
        }

        @keyframes scroll-down {
          0% {
            opacity: 0;
          }
          30% {
            opacity: 1;
          }
          60% {
            opacity: 1;
          }
          100% {
            top: 90%;
            opacity: 0;
          }
        }

        /* Text styling to match scroll indicator */
        .scroll-text {
          color: lightgray;
          text-align: center;
          position: absolute;
          width: 100%;
          left: 50%;
          transform: translateX(-50%);
          bottom: -2rem;
          font-size: 0.8rem;
          font-weight: 400;
          letter-spacing: 0.1rem;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.626);
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0% {
            opacity: 0.7;
            text-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
          }
          50% {
            opacity: 1;
            text-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
          }
          100% {
            opacity: 0.7;
            text-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
          }
        }
      `}</style>

      <motion.div variants={fadeIn}>
        <Lamp/>
          <AnimateLamp
              enableStickyEffect={false}
              lightOpacity={1}
              lightColor="#0099FF"
              lightHeight='5rem'
              lightGradient='radial-gradient(circle, rgba(0, 153, 255, 1) 0%, rgba(0, 153, 255, 0.17) 100%)'
              beamGradient='linear-gradient(90deg, rgba(0, 153, 255, 0) 0%, rgba(0, 153, 255, 0.4) 15%, rgba(0, 153, 255, 0.65) 30%, rgba(0, 153, 255, 0.8) 40%, rgba(0, 153, 255, 1) 50%, rgba(0, 153, 255, 0.8) 60%, rgba(0, 153, 255, 0.65) 70%, rgba(0, 153, 255, 0.4) 85%, rgba(0, 153, 255, 0) 100%)'
              containerPosition='Animate-Hero-Lamp'
            />
      </motion.div>

      <motion.div
        variants={fadeIn}
        className='relative flex flex-col items-center justify-center pointer-events-none'
      >
        <h3 className='Hero-text z-50 text-white bg-clip-text inline-block font-semibold antialiased tracking-widest font-mono text-[1.2rem]'>
          Software Developer
        </h3>
      </motion.div>

      <div className='Hero-text-container relative items-center justify-center w-full pointer-events-none z-10 '>
        <HeroText/>
      </div>

        <div className='reactive-Orb-container relative w-full h-screen z-[1]'>
          {/* <ReactiveOrb/> */}
        </div>

      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.8,
              ease: "easeOut",
              delay: 1.2 // Delay the scroll indicator to appear last
            }
          }
        }}
        className='relative flex items-center justify-center z-10 -mt-4 gap-4'
      >
        <div className="scroll-down"></div>
        <h3 className='scroll-text'>Scroll Down to be Amazed !</h3>
      </motion.div>

      <motion.div
        variants={fadeIn}
        className='Lamp-container'
      >
        <div className='Mid-Lamp relative flex items-center justify-center z-[2]'>
          <Midlapm/>
        </div>
        <AnimateLamp
          enableStickyEffect={true}
          endTarget={sectionEndRef}
          lightOpacity={0.4}
          lightColor="#0099FF"
          lightHeight='8rem'
          beamHeight='0px'
          lightGradient='radial-gradient(circle, rgba(0, 153, 255, 1) 0%, rgba(0, 153, 255, 0.17) 100%)'
          beamGradient='linear-gradient(90deg, rgba(0, 153, 255, 0) 0%, rgba(0, 153, 255, 0.4) 15%, rgba(0, 153, 255, 0.65) 30%, rgba(0, 153, 255, 0.8) 40%, rgba(0, 153, 255, 1) 50%, rgba(0, 153, 255, 0.8) 60%, rgba(0, 153, 255, 0.65) 70%, rgba(0, 153, 255, 0.4) 85%, rgba(0, 153, 255, 0) 100%)'
          containerPosition='Animate-Mid-Lamp'
        />
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: {
                duration: 1.2,
                ease: "easeOut",
                delay: 0.3
              }
            }
          }}
          className='Image-Box z-[-2] relative flex items-center justify-center'
        >
          <ImageBox/>
        </motion.div>
      </motion.div>

      <div ref={sectionEndRef}></div>
    </motion.div>
  )
}
