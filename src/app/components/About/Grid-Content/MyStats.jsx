import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function MyStats() {
  // Generate random grid cells for background
  const [gridCells, setGridCells] = useState([]);

  useEffect(() => {
    const cells = [];
    const totalCells = 50; // Number of cells to create

    for (let i = 0; i < totalCells; i++) {
      cells.push({
        id: i,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 7,
        opacity: 0.1 + Math.random() * 0.2,
        size: 20 + Math.random() * 40
      });
    }

    setGridCells(cells);
  }, []);

  // Enhanced personal stats with custom grid spans
  const personalStats = [
    {
      label: "Age",
      value: "22",
      colSpan: "col-span-1",
      rowSpan: "row-span-1",
      bgColor: "from-blue-500/20 to-cyan-400/20"
    },
    {
      label: "Country",
      value: "Sri Lanka",
      colSpan: "col-span-2",
      rowSpan: "row-span-1",
      bgColor: "from-purple-500/20 to-pink-400/20"
    },
    {
      label: "Degrees",
      value: "B.Sc. in Computer Science",
      colSpan: "col-span-3",
      rowSpan: "row-span-2",
      bgColor: "from-indigo-500/20 to-violet-400/20"
    },

    {
      label: "University",
      value: "Informatics Institute of Technology (IIT)",
      colSpan: "col-span-2",
      rowSpan: "row-span-1",
      bgColor: "from-amber-500/20 to-orange-400/20"
    },
    {
      label: "Residence",
      value: "Mount-Lavinia",
      colSpan: "col-span-1",
      rowSpan: "row-span-1",
      bgColor: "from-emerald-500/20 to-teal-400/20"
    },
    {
      label: "Current Status",
      value: "Searching for Internships",
      colSpan: "col-span-6",
      rowSpan: "row-span-1",
      bgColor: "from-rose-500/20 to-red-400/20"
    }
  ];

  return (
    <div className="h-full w-full relative flex flex-col rounded-xl overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 overflow-hidden">
        {gridCells.map((cell) => (
          <motion.div
            key={cell.id}
            className="absolute bg-white/10 rounded-md"
            style={{
              width: cell.size,
              height: cell.size,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [cell.opacity, cell.opacity * 2, cell.opacity],
              scale: [1, 1.2, 1],
              x: Math.random() > 0.5 ? [0, 10, 0] : [0, -10, 0],
              y: Math.random() > 0.5 ? [0, 10, 0] : [0, -10, 0],
            }}
            transition={{
              duration: cell.duration,
              delay: cell.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70" />
      </div>

      {/* Content Container with scrolling */}
      <div className="relative h-full p-2 z-10 flex flex-col">
        <motion.div
          className="mb-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >

        </motion.div>

        {/* Scrollable content area */}
        <div className="flex-grow pr-2">
          {/* Grid with custom layout */}
          <div className="grid grid-cols-6 auto-rows-min gap-3 pb-4">
            {personalStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className={`${stat.colSpan} ${stat.rowSpan} backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg p-3 overflow-hidden relative group`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 15px rgba(59, 130, 246, 0.3)"
                }}
              >
                {/* Enhanced hover effect */}
                <div
                  className={`absolute -inset-1 bg-gradient-to-r ${stat.bgColor} rounded-lg blur opacity-0 group-hover:opacity-100 transition-all duration-500`}
                  style={{
                    transformOrigin: 'center',
                    filter: 'blur(10px)'
                  }}
                />

                {/* Content with hover animation */}
                <motion.div
                  className="relative h-full flex flex-col justify-between"
                  whileHover={{ y: -2 }}
                >
                  <div>
                    <motion.p
                      className="text-gray-400 text-sm font-medium"
                      whileHover={{ color: "#ffffff" }}
                    >
                      {stat.label}
                    </motion.p>
                    <motion.p
                      className="text-white text-lg font-bold mt-1"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {stat.value}
                    </motion.p>
                  </div>

                  {/* Show icon on hover */}
                  <motion.div
                    className="text-white/0 group-hover:text-white/80 self-end mt-2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                  >
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
