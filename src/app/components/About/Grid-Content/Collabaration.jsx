"use client";
import React, { useState } from "react";
import "../../MediaQuery/largeScreen.css";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";

export default function Collabaration() {
  // Define collaborator data
  const collaborators = [
    {
      id: 1,
      name: "Alex",
      designation: "UX Designer",
      image: "https://i.pravatar.cc/100?img=19",
    },
    {
      id: 2,
      name: "Lakshan",
      designation: "Team Lead",
      image: "https://i.pravatar.cc/100?img=12",
    },
    {
      id: 3,
      name: "Jennie",
      designation: "Frontend Dev",
      image: "https://i.pravatar.cc/100?img=25",
    },
    {
      id: 4,
      name: "Michael",
      designation: "Backend Dev",
      image: "https://i.pravatar.cc/100?img=14",
    },
    {
      id: 5,
      name: "Sarah",
      designation: "Project Manager",
      image: "https://i.pravatar.cc/100?img=60",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0.9 }}
      whileHover={{ opacity: 1 }}
      className="h-full flex flex-col gap-4 backdrop-blur-lg bg-gradient-to-br from-white/8 to-white/3 rounded-xl border border-white/10 shadow-xl transition-all duration-300 overflow-hidden "
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"
        animate={{
          x: [0, 10, 0],
          y: [0, -10, 0],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 p-6 flex flex-col h-full">
        {/* Header with animated underline */}
        <div className="collab-heading mb-3">
          <motion.h3
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            Collaboration
          </motion.h3>
          <motion.div
            className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 80, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          />
        </div>

        <motion.p
          className="collab-text text-sm text-gray-300/90 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          I value teamwork and equally respect each member's opinions and advice
          while taking full responsibility for my workload and deliverables.
        </motion.p>

        {/* Team section with improved styling */}
        <motion.div
          className="mt-auto pt-5 collab-team"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="text-xs uppercase tracking-wider text-gray-400 mb-3 font-medium">
            Team Members
          </div>
          <div className="Collab-container flex flex-row items-center justify-center py-3 px-2 rounded-xl bg-white/5 backdrop-blur-sm">
            <AnimatedTooltip items={collaborators} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export const AnimatedTooltip = ({ items }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const springConfig = { stiffness: 150, damping: 15 };
  const x = useMotionValue(0);

  // Enhanced animations
  const rotate = useSpring(useTransform(x, [-100, 100], [-25, 25]), springConfig);
  const translateX = useSpring(useTransform(x, [-100, 100], [-25, 25]), springConfig);
  const scale = useSpring(useTransform(x, [-100, 100], [0.9, 1.1]), springConfig);

  const handleMouseMove = (event) => {
    const halfWidth = event.target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  return (
    <div className="flex items-center justify-center w-full">
      {items.map((item) => (
        <motion.div
          className="group relative -mr-4 first:ml-0"
          key={item.name}
          initial={{ scale: 0.9, opacity: 0.8 }}
          whileHover={{
            scale: 1.05,
            opacity: 1,
            zIndex: 20,
            transition: { duration: 0.2 },
          }}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: -5,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  },
                }}
                exit={{
                  opacity: 0,
                  y: 20,
                  scale: 0.6,
                  transition: { duration: 0.2 },
                }}
                style={{
                  translateX: translateX,
                  rotate: rotate,
                  whiteSpace: "nowrap",
                }}
                className="absolute -top-20 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center justify-center rounded-xl bg-gradient-to-br from-gray-900 to-black border border-white/10 px-4 py-2 shadow-xl"
              >
                {/* Enhanced tooltip design */}
                <div className="absolute inset-x-10 -bottom-px z-30 h-px w-[40%] bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
                <div className="absolute -bottom-px left-10 z-30 h-px w-[60%] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

                <div className="relative z-30 text-lg font-bold text-white mb-0.5">
                  {item.name}
                </div>
                <div className="text-sm text-gray-300">{item.designation}</div>

                {/* Triangle pointer */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 border-t-8 border-l-8 border-r-8 border-t-black border-l-transparent border-r-transparent" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enhanced avatar */}
          <motion.div
            className="relative rounded-full overflow-hidden border-2 border-white/30 group-hover:border-purple-400/70 transition-all duration-300"
            style={{ scale }}
          >
            <img
              onMouseMove={handleMouseMove}
              height={100}
              width={100}
              src={item.image}
              alt={item.name}
              className="h-16 w-16 object-cover transition-all duration-300 group-hover:brightness-110"
            />

            {/* Glow effect on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-purple-500/0 to-blue-500/0 opacity-0 group-hover:opacity-30"
              whileHover={{ opacity: 0.3 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};
