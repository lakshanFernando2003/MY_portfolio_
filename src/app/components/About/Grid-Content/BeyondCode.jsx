"use client";

import React, { useState, useEffect, useRef } from 'react';
import { FaGamepad, FaHiking, FaUtensils, FaMusic, FaDumbbell } from 'react-icons/fa';
import { GiPaintBrush, GiCampingTent } from 'react-icons/gi';
import { MdOutlineFlight, MdBusiness } from 'react-icons/md';
import Image from "next/image";
import { motion, useMotionValue, AnimatePresence } from "framer-motion";

// Constants
const AUTO_DELAY = 3000; // 3 seconds
const DRAG_BUFFER = 50;
const SPRING_OPTIONS = {
  type: "spring",
  mass: 3,
  stiffness: 400,
  damping: 50,
};

// Overlay animation variants
const overlayVariants = [
  {
    initial: { background: "radial-gradient(circle at center, rgba(0,0,0,0.7) 100%, rgba(0,0,0,0.7) 100%)" },
    hover: { background: "radial-gradient(circle at center, rgba(0,0,0,0) 100%, rgba(0,0,0,0) 100%)" }
  },
  {
    initial: { background: "radial-gradient(circle at top left, rgba(0,0,0,0.7) 100%, rgba(0,0,0,0.7) 100%)" },
    hover: { background: "radial-gradient(circle at top left, rgba(0,0,0,0) 100%, rgba(0,0,0,0) 100%)" }
  },
  {
    initial: { background: "radial-gradient(circle at bottom right, rgba(0,0,0,0.7) 100%, rgba(0,0,0,0.7) 100%)" },
    hover: { background: "radial-gradient(circle at bottom right, rgba(0,0,0,0) 100%, rgba(0,0,0,0) 100%)" }
  },
];

// Text animation variants
const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.3 } }
};

export default function BeyondCode() {
  // Define all interests with their properties
  const interests = [
    {
      label: "E-Sports",
      icon: FaGamepad,
      bgColor: "bg-[#06b6d4]",
      iconColor: "#06b6d4",
      image: "/images/interests/esport.jpg", // Add your image paths here
    },
    {
      label: "Adventure",
      icon: FaHiking,
      bgColor: "bg-[#8b5cf6]",
      iconColor: "#8b5cf6",
      image: "/images/interests/Adventure.webp",
    },
    {
      label: "Cooking",
      icon: FaUtensils,
      bgColor: "bg-[#ec4899]",
      iconColor: "#ec4899",
      image: "/images/interests/cooking.jpg",
    },
    {
      label: "Music",
      icon: FaMusic,
      bgColor: "bg-[#61dafb]",
      iconColor: "#61dafb",
      image: "/images/interests/Music.jpeg",
    },
    {
      label: "Fitness",
      icon: FaDumbbell,
      bgColor: "bg-[#0070f3]",
      iconColor: "#0070f3",
      image: "/images/interests/Fitness.jpg",
    },
    {
      label: "Painting",
      icon: GiPaintBrush,
      bgColor: "bg-[#43853d]",
      iconColor: "#43853d",
      image: "/images/interests/painting.jpg",
    },
    {
      label: "Camping",
      icon: GiCampingTent,
      bgColor: "bg-[#ffce73]",
      iconColor: "#ffce73",
      image: "/images/interests/Camping.jpeg",
    },
    {
      label: "Traveling",
      icon: MdOutlineFlight,
      bgColor: "bg-[#007acc]",
      iconColor: "#007acc",
      image: "/images/interests/Traveling.jpg",
    },
    {
      label: "Business",
      icon: MdBusiness,
      bgColor: "bg-[#f7df1e]",
      iconColor: "#f7df1e",
      image: "/images/interests/Business.jpg",
    }
  ];

  // State for carousel
  const [itemIndex, setItemIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hoverStates, setHoverStates] = useState(Array(interests.length).fill(false));
  const dragX = useMotionValue(0);
  const containerRef = useRef(null);

  // Auto-advance timer with looping
  useEffect(() => {
    if (isPaused) return;

    const intervalRef = setInterval(() => {
      const x = dragX.get();

      if (x === 0) {
        setItemIndex((prev) => (prev + 1) % interests.length); // Loop back to start
      }
    }, AUTO_DELAY);

    return () => clearInterval(intervalRef);
  }, [isPaused, interests.length, dragX]);

  // Drag end handler with looping
  const onDragEnd = () => {
    const x = dragX.get();

    if (x <= -DRAG_BUFFER) {
      setItemIndex((prev) => (prev + 1) % interests.length); // Loop back to start
    } else if (x >= DRAG_BUFFER) {
      setItemIndex((prev) => (prev - 1 + interests.length) % interests.length); // Loop to end
    }
  };

  // Handle hover for individual items
  const handleItemHover = (idx, isHovered) => {
    setHoverStates(prev => {
      const newState = [...prev];
      newState[idx] = isHovered;
      return newState;
    });
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden backdrop-blur-md bg-white/1 rounded-lg transition-all duration-300"
      ref={containerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Title */}
      <div className="relative z-30 flex flex-col mb-2">
        <div className="relative flex gap-4 mb-1 pl-5 pt-3 pb-2">
          <Image
            src="/icons8-gemini-ai.svg"
            alt="Beyond Code Icon"
            width={42}
            height={42}
            className="animate-pulse"
          />
          <h3 className="text-4xl font-bold">Beyond the Code</h3>
        </div>
        <p className="pl-8 opacity-80 text-[1.1rem]">Explore my interests and hobbies beyond the digital realm</p>
      </div>

      {/* Carousel Container with p-2 */}
      <div className="relative h-[calc(100%-100px)] w-full overflow-hidden rounded-lg p-10">
        <motion.div
          drag="x"
          dragConstraints={{
            left: 0,
            right: 0,
          }}
          style={{
            x: dragX,
          }}
          animate={{
            translateX: `-${itemIndex * 100}%`,
          }}
          transition={SPRING_OPTIONS}
          onDragEnd={onDragEnd}
          className="flex h-full cursor-grab active:cursor-grabbing -rotate-45"
        >
          {interests.map((interest, idx) => {
            // Randomly select overlay animation variant
            const variantIndex = idx % overlayVariants.length;

            return (
              <motion.div
                key={idx}
                className="relative w-full h-full shrink-0 "
                animate={{
                  scale: itemIndex === idx ? 1 : 0.9,
                }}
                transition={SPRING_OPTIONS}
                onMouseEnter={() => handleItemHover(idx, true)}
                onMouseLeave={() => handleItemHover(idx, false)}
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center rounded-full rotate-45"
                  style={{
                    backgroundImage: `url(${interest.image})`,
                  }}
                />

                {/* Colored Overlay with Icon (visible by default) */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center transition-all rounded-full duration-500"
                  initial={overlayVariants[variantIndex].initial}
                  animate={hoverStates[idx] ? overlayVariants[variantIndex].hover : overlayVariants[variantIndex].initial}
                >
                  <interest.icon
                    size="5em"
                    className="drop-shadow-lg rotate-45"
                    style={{
                      color: interest.iconColor,
                      filter: "drop-shadow(0px 0px 8px rgba(0,0,0,0.5))"
                    }}
                  />
                </motion.div>

                {/* Label (only visible when hovered) */}
                <AnimatePresence>
                  {hoverStates[idx] && (
                    <motion.div
                      className="absolute bottom-6 left-0 right-0 flex justify-center "
                      variants={textVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <div className={`${interest.bgColor} text-black font-semibold px-6 py-2 rotate-45 rounded-full text-lg shadow-lg`}>
                        {interest.label}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Dot indicators */}
        {/* <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2 z-30">
          {interests.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setItemIndex(idx)}
              className={`h-3 w-3 rounded-full transition-colors ${
                idx === itemIndex ? "bg-white scale-125" : "bg-gray-500"
              }`}
            />
          ))}
        </div> */}

        {/* Gradient edges for visual effect */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[50px] bg-gradient-to-r from-black/30 to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[50px] bg-gradient-to-l from-black/30 to-transparent z-20" />
      </div>
    </div>
  );
}
